import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { storage } from "../firebase"; // Firebase 初期化ファイル

export const uploadImage = async (
  file: File,
  userId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `profile_images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        reject("画像のアップロード中にエラーが発生しました。");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // バックエンドに画像URLを保存
          const backendUrl = process.env.REACT_APP_BACKEND_URL;
          await axios.post(`${backendUrl}/user/update/image`, {
            userId: userId,
            profileImageUrl: downloadURL,
          });

          console.log("画像が正常にアップロードされました:", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error saving image URL:", error);
          reject("画像の保存中にエラーが発生しました。");
        }
      }
    );
  });
};

interface UserProfileImageResponse {
  profileImageUrl: string; // レスポンスのプロパティ名に合わせる
}

export const fetchUserProfileImage = async (userId: string): Promise<string> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // axios のレスポンス型を指定
  const response = await axios.get<UserProfileImageResponse>(`${backendUrl}/user/get/image`, {
    params: { userId },
  });

  // レスポンスの型が安全に扱えるようになる
  return response.data.profileImageUrl;
};