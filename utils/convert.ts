import * as FileSystem from "expo-file-system";

const convertImageToUint8List = async (uri: string): Promise<Uint8Array> => {
  try {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert Base64 to binary (Uint8Array)
    const binaryData = Uint8Array.from(atob(base64String), (char) =>
      char.charCodeAt(0)
    );
    return binaryData;
  } catch (error) {
    console.error("Error converting file to Uint8List:", error);
    throw error;
  }
};

const uriToBlob = async (uri: string): Promise<Blob> => {
  const fileContent = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const byteCharacters = atob(fileContent);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/jpeg" }); // Adjust the MIME type as needed
};

export { convertImageToUint8List, uriToBlob };
