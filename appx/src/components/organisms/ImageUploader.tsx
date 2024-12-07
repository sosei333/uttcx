import React, { useState } from "react";
import { uploadImageToFirebase } from "../../services/image"; // 関数をインポート

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoURL, setVideoURL] = useState<string>("");

  // ファイル選択の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("video/")) {
        alert("Please select a valid video file");
        return;
      }
      setFile(selectedFile);
    }
  };

  // アップロード処理
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video file to upload!");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadImageToFirebase(file, "videos/");
      setVideoURL(url);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload video:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Video Uploader</h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          padding: "10px 20px",
          backgroundColor: uploading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {videoURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Video:</h3>
          <video
            src={videoURL}
            controls
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;