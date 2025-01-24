import Button from "@/components/button";
import BaseLayout from "@/components/layouts/base";
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { convertImageToUint8List, uriToBlob } from "@/utils/convert";
import { postImageToLocket } from "@/services/api";
import secureStorage from "@/utils/secure-store";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [imageUri, setImageUri] = useState<string>();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<Blob>();
  const navigation = useNavigation();
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (result.assets && result.assets.length > 0) {
        console.log(result.assets[0])
        setImageUri(result.assets[0].uri);

        // Read file as a Blob
        const fileUri = result.assets[0].uri;
        const fileBlob = await uriToBlob(fileUri);
        setFile(fileBlob);
      }
    } catch (error) {
      console.log("Error picking image:", error);
    }
  };

  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };


  const onPost = async () => {
    if (!file) {
      Alert.alert("Please pick an image");
      return;
    }
    try {
      const token = await secureStorage.getValue("USER");
      console.log(token, "TOKEN");
      const response = await postImageToLocket(token?.localId, token?.idToken, file, caption);
      console.log(response, 2424);
    } catch (error) {
      console.log("Error posting image:", error);
    }
  };

  const onLogout = async () => {
    await secureStorage.deleteValue("USER");
    navigation.navigate("Login" as never);
  }
  return (
    <BaseLayout>
      <Button onPress={onLogout}>Logout</Button>
      <View style={styles.container}>
        {imageUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <TextInput
              style={styles.captionInput}
              placeholder="Enter a caption"
              value={caption}
              onChangeText={setCaption}
            />
          </View>

        )}
        {file && (
          <TouchableOpacity onPress={onPost} style={styles.playButton}>
            <AntDesign name="playcircleo" size={50} color="white" />
          </TouchableOpacity>
        )}
        <Button onPress={pickImage} >
          Pick a Image
        </Button>
      </View></BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  pickButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  pickButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 20,
    alignItems: "center",
    position: 'relative',
    width: '100%'
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  captionInput: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontWeight: '900',
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  playButton: {
    padding: 10,
    borderRadius: "100%",
    backgroundColor: "#8b8585",
  }
});

export default Home;
