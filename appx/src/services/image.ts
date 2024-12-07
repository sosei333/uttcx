import { storage } from "../firebase"; // Firebase 初期化ファイルからインポート
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * 画像をFirebase Storageにアップロードする関数
 * @param {File} file - アップロードする画像ファイル
 * @param {string} path - 保存先のパス（例: "images/"）
 * @returns {Promise<string>} - アップロード後のダウンロードURL
 */
export const uploadImageToFirebase = async (file:any, path = "images/") => {
    console.log("type=",typeof(file))
  if (!file) {
    throw new Error("No file provided for upload");
  }

  const fileName = `${Date.now()}_${file.name}`; // 一意なファイル名を生成
  const storageRef = ref(storage, `${path}${fileName}`);

  try {
    // Firebase Storageにアップロード
    await uploadBytes(storageRef, file);

    // ダウンロードURLを取得
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw error;
  }
};

export const getUserImageByID = async (userId: string): Promise<string | null> => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    if (!backendUrl) {
      console.error("Backend URL is not defined in the environment variables");
      return null;
    }
  
    try {
      // FetchでGETリクエスト送信
      const response = await fetch(`${backendUrl}/user/get/img?userId=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // レスポンスの確認
      if (response.ok) {
        const data = await response.json(); // JSONレスポンスをパース
        if (data && data.img_url) {
          return data.img_url; // ユーザーネームを返す
        } else {
          console.error("Response did not contain a valid URL");
          return null;
        }
      } else {
        console.error(`Failed to fetch user img, status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("An error occurred while fetching the user img:", error);
      return null;
    }
  };

  export const PutURL = async (userId: string, ImgURL: string) => {
    // 環境変数からバックエンドURLを取得
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    if (!backendUrl) {
      console.error("Backend URL is not defined in the environment variables");
      return;
    }
  
    // Fetchでリクエスト送信
    const response = await fetch(`${backendUrl}/user/put/img?userId=${encodeURIComponent(userId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img_url: ImgURL,
      }),
    });
  
    // レスポンスの確認
    if (response.ok) {
      console.log("User registered successfully");
    } else {
      console.error("Failed to register user", response.status);
    }
  };