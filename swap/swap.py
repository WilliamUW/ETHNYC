from web3 import Web3
import requests

class Swap:

    api_url = 'https://api.1inch.dev/swap'

    
    def _get(self, url, params=None, headers=None):
        """ Implements a get request """
        try:
            if headers == None:
                headers = {"accept": "application/json", "Authorization": f"Bearer {self.api_key}"}
            else:
                headers["accept"] = "application/json"
                headers["Authorization"] = f"Bearer {self.api_key}"
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()
            payload = response.json()
        except requests.exceptions.ConnectionError as e:
            # error_content = json.loads(e.response._content.decode("utf-8"))
            print(f"ConnectionError with code {e.response.status_code} when doing a GET request from {format(url)}")
            # print(f"{error_content['error']} {error_content['description']}")
            payload = None
        except requests.exceptions.HTTPError as e:
            # error_content = json.loads(e.response._content.decode("utf-8"))
            print(f"HTTPError with code {e.response.status_code} for a request {format(url)}")
            # print(f"{error_content['error']} {error_content['description']}")
            payload = None
        return payload


    def get_quote(self, from_token, to_token, amount):
        from_address = Web3.to_checksum_address(from_token)
        to_address = Web3.to_checksum_address(to_token)

        amount_in_wei = int(amount * 10 ** 18)
        url = f'{self.api_url}/5.2/1/swap'
        url = url + f'?src={from_address}&dst={to_address}&amount={amount_in_wei}'
        #url = url + f'&from={send_address}&slippage={slippage}'

        result = self._get(url)
        return result
    def get_swap(self, from_token_symbol: str, to_token_symbol: str,
                    amount: float, slippage: float, decimal=None, send_address=None):
            if send_address is None:
                send_address = self.address
            else:
                pass
            from_address = self._token_to_address(from_token_symbol)
            to_address = self._token_to_address(to_token_symbol)
            if decimal is None:
                try:
                    self.tokens[from_token_symbol]['decimals']
                except KeyError:
                    decimal = 18
                else:
                    decimal = self.tokens[from_token_symbol]['decimals']
            else:
                pass
            if decimal == 0:
                amount_in_wei = int(amount)
            else:
                amount_in_wei = int(amount * 10 ** decimal)
            url = f'{self.base_url}/{self.version}/{self.chain_id}/swap'
            url = url + f'?src={from_address}&dst={to_address}&amount={amount_in_wei}'
            url = url + f'&from={send_address}&slippage={slippage}'
            result = self._get(url)
            return result