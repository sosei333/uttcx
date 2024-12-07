import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Firebase 初期化ファイル

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // ファイル選択
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // URL をバックエンドに保存
  const saveImageUrl = async (downloadURL: string, fileName: string) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const userId = "user1"; // ユーザーIDを動的に変更する場合は修正
      const response = await axios.post(`${backendUrl}/user/update/image`, {
        userId: userId,
        profileImageUrl: downloadURL,
      });
      console.log('Image saved successfully:', response.data);
      alert('画像が正常に保存されました！');
    } catch (error) {
      console.error('Error saving image URL:', error);
      alert('画像の保存中にエラーが発生しました。再試行してください。');
    }
  };

  // 画像アップロード
  const handleUpload = async () => {
    if (!file) {
      alert('ファイルを選択してください！');
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        alert('アップロード中にエラーが発生しました。');
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Image URL:', downloadURL);
          await saveImageUrl(downloadURL, file.name); // URLを保存
        } catch (error) {
          console.error('Error getting download URL:', error);
          alert('画像URLの取得中にエラーが発生しました。');
        }
      }
    );
  };

  return (
    <div>
      <h1>画像アップローダー</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロード</button>
      {progress > 0 && <p>進行状況: {progress.toFixed(2)}%</p>}
    </div>
  );
};

export default ImageUploader;
