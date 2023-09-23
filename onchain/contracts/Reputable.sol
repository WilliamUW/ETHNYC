//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "solady/src/tokens/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {AncillaryData} from "./uma/AncillaryData.sol";
import {OptimisticOracleV3Interface} from "./uma/OptimisticOracleV3Interface.sol";
import {OptimisticOracleV3CallbackRecipientInterface} from "./uma/OptimisticOracleV3CallbackRecipientInterface.sol";

contract Reputable is ERC721, Ownable {
    using Strings for uint;

    string highRep;
    string medRep;
    string lowRep;

    struct Investment {
        address investor;
        uint256 amount;
        uint256 sharePercentage;
    }

    struct Fund {
        uint256 reputation;
        uint256 totalRaised;
        uint16 id;
        bool isOpen;
        address eoa;
        bytes32 assertionId;
    }

    mapping(address => Fund[]) public investors;
    mapping(uint16 => Fund) public funds;
    mapping(uint16 => Investment[]) public investorsInFund;

    string private _name;
    string private _symbol;
    string private _baseURI;

    uint256 public constant MAX_REPUTATION = 100;
    uint16 public fundCount;

    OptimisticOracleV3Interface private _disputeOracle;

    modifier onlyFunds(uint16 _id) {
        require(funds[_id].eoa == msg.sender);
        _;
    }

    function invest(
        address _token,
        uint256 _amount,
        uint16 _id
    ) public payable {
        if (_ownerOf(_id) == address(0)) revert();

        Fund memory fund = funds[_id];
        require(fund.isOpen, "not accepting investment");
        if (address(_token) != address(0)) {
            IERC20(_token).transferFrom(msg.sender, fund.eoa, _amount);
        } else {
            require(fund.reputation > 0, "reputation too low");
            require(msg.value == _amount, "send the correct amount");
            fund.eoa.call{value: _amount}("");
        }

        Fund[] memory investedFunds = investors[msg.sender];
        fund.totalRaised += _amount;

        for (uint16 i; i < investedFunds.length; ) {
            if (investedFunds[i].id == _id) {
                for (uint j = 0; j < investorsInFund[_id].length; j++) {
                    if (investorsInFund[_id][j].investor == msg.sender) {
                        investorsInFund[_id][j].amount += _amount;
                    }
                }
                return;
            }
            unchecked {
                i++;
            }
        }

        investorsInFund[_id].push(Investment(msg.sender, _amount, 0));
        investors[msg.sender].push(fund);
    }

    function returnYield(uint16 _id) external payable onlyFunds(_id) {
        Fund memory fund = funds[_id];
        for (uint i = 0; i < investorsInFund[_id].length; ) {
            investorsInFund[_id][i].investor.call{
                value: msg.value * investorsInFund[_id][i].sharePercentage
            }("");
            unchecked {
                i++;
            }
        }
    }

    function assertBadReputation(uint16 _id) public {
        require(address(_disputeOracle) != address(0));
        require(funds[_id].assertionId == bytes32(0));
        bytes memory claim = abi.encodePacked(
            "Fund 0x",
            AncillaryData.toUtf8BytesUint(_id),
            "did something suspicious with the funds"
        );

        funds[_id].assertionId = _disputeOracle.assertTruthWithDefaults(
            claim,
            address(this)
        );
    }

    function settleAndGetAssertionResult(uint16 _id) public returns (bool) {
        return
            _disputeOracle.settleAndGetAssertionResult(funds[_id].assertionId);
    }

    function getAssertionResult(uint16 _id) public view returns (bool) {
        return _disputeOracle.getAssertionResult(funds[_id].assertionId);
    }

    function getAssertion(
        uint16 _id
    ) public view returns (OptimisticOracleV3Interface.Assertion memory) {
        return _disputeOracle.getAssertion(funds[_id].assertionId);
    }

    function disputeBadRepAssurtion(uint16 _id) public {
        if (address(_disputeOracle) != address(0)) {
            _disputeOracle.disputeAssertion(funds[_id].assertionId, msg.sender);
        }
    }

    function assertionResolvedCallback(
        bytes32 assertionId,
        bool assertedTruthfully
    ) external {
        require(msg.sender == address(_disputeOracle));
        uint16 id;
        for (uint16 i = 0; i < fundCount; ) {
            if (funds[i].assertionId == assertionId) {
                id = i;
            }

            unchecked {
                i++;
            }
        }
        if (assertedTruthfully) {
            funds[id].reputation -= 10;
        }
        funds[id].assertionId = bytes32(0);
    }

    function addFund(address _eoa) public onlyOwner {
        Fund memory newFund = Fund(
            MAX_REPUTATION,
            0,
            fundCount,
            false,
            _eoa,
            bytes32(0)
        );
        funds[++fundCount] = newFund;
        _mint(_eoa, fundCount);
        // mintAllChains(_eoa);
    }

    function removeFund(uint16 _id) public onlyOwner {
        require(_ownerOf(_id) != address(0));
        funds[_id] = Fund(0, 0, 0, false, address(0), bytes32(0));
        _burn(_id);
    }

    function endInvestmentRound(uint16 _id) public onlyOwner {
        Fund storage fund = funds[_id];
        require(fund.isOpen, "already ended");

        for (uint16 i = 0; i < investorsInFund[_id].length; ) {
            investorsInFund[_id][i].sharePercentage =
                fund.totalRaised /
                investorsInFund[_id][i].amount;
            unchecked {
                i++;
            }
        }
        fund.isOpen = false;
    }

    function assertionDisputedCallback(bytes32 assertionId) external {
        require(msg.sender == address(_disputeOracle));
        uint16 id;
        for (uint16 i = 0; i < fundCount; ) {
            if (funds[i].assertionId == assertionId) {
                id = i;
            }

            unchecked {
                i++;
            }
        }

        funds[id].assertionId = bytes32(0);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 id
    ) internal override {
        require(from == address(0), "it's soulbound silly");
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(
        uint256 _id
    ) public view override returns (string memory) {
        Fund memory rep = funds[uint16(_id)];
        if (rep.reputation < 90) {
            return medRep;
        } else if (rep.reputation < 50) {
            return lowRep;
        }
        return highRep;
    }
}
