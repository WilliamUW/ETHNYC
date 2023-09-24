import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import { Button, Modal } from 'antd';

const AssistantModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Text>If you have any questions, ask our ReputAI Assistant for help!</Text>
      <Button type="primary" onClick={showModal}>
        ReputAI Assistant
      </Button>
      <Modal title="AI Assistant" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <iframe
          title="Embedded Website"
          src="https://creator.voiceflow.com/prototype/650f3cda275e88510bea289d" // Replace with the URL of the website you want to embed
          width="450" // Set the width of the iframe
          height="500" // Set the height of the iframe
          frameBorder="0" // Remove the iframe border
          allowFullScreen // Enable fullscreen mode
        ></iframe>
      </Modal>
    </>
  );
};

const jobTypes = ["Mutual Funds", "Secondaries", "Crypto", "Stocks", "NFTs", "Charities"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  const [verified, setVerified] = useState(false);

  const onSuccess = (result) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    setVerified(true);
  };

  const handleProof = async (result) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
      signal: "",
    };
    fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then(async (res) => {
      if (res.status == 200) {
        console.log("Successfully verified credential.");
      } else {
        throw (
          new Error("Error: " + (await res.json()).code) ?? "Unknown error."
        );
      }
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>{verified ? "Hello William" : "Hello! Please log in to continue."}</Text>
        <p></p>
        <div>
          <IDKitWidget
            action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME || ""}
            onSuccess={onSuccess}
            handleVerify={handleProof}
            app_id={"app_4020275d788fc6f5664d986dd931e5e6" || ""}
            credential_types={[CredentialType.Orb, CredentialType.Phone]}
          >
            {({ open }) => (
              <button
                onClick={open}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  color: "#fff",
                  backgroundColor: "black",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s",
                }}
              >
                Verify with World ID
              </button>
            )}
          </IDKitWidget>
          <p></p>
          <AssistantModal /></div>
        <p></p>

        <Text style={styles.welcomeMessage}>Find your perfect investment</Text>
      </View>



      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
