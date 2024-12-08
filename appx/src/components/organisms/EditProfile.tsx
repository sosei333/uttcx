import React, { useState, useEffect } from "react";
import { UserProfile } from "../../models/user_models";
import { Box, Button, TextField, Typography, Card, CardContent, Input } from "@mui/material";
import { getLocalizedStrings } from "../../layouts/strings";
import { uploadImageToFirebase } from "../../services/image";
import { PutURL } from "../../services/image";
import { getUserImageByID } from "../../services/image";

interface EditProfileProps {
  user: UserProfile;
  introduction: string;
  onSave: (updatedUser: UserProfile, updatedIntroduction: string) => void;
  onCancel: () => void;
  imgurl:string | null;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, introduction, onSave, onCancel, imgurl=null }) => {
  const [userName, setUserName] = useState(user.user_name);
  const [bio, setBio] = useState(introduction); // 親から受け取った introduction を初期値に設定
  const [loading, setLoading] = useState(false);
  const messages = getLocalizedStrings();

//=============

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoURL, setVideoURL] = useState<string>("");
  const [url, setUrl] = useState<string | null>(null);
    // ファイル選択の処理
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setFile(selectedFile);
      }
    };

    useEffect(() => {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const url = await getUserImageByID(user.user_id);
          if (url) {
            setUrl(url);
          } else {
            setUrl(imgurl)
            throw new Error("Failed to fetch user information");
          }
        } catch (fetchError: any) {
          console.error("Error fetching user data:", fetchError);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser(); // コンポーネントマウント時に実行
    }, [user.user_id]); // user.user_id が変更されたときのみ再実行

    // アップロード処理
    const handleUpload = async () => {
      if (!file) {
        alert("Please select a video file to upload!");
        return;
      }
  
      setUploading(true);
      try {
        const url = await uploadImageToFirebase(file, "image/");
        setVideoURL(url);
        setUrl(url);
        alert("Video uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload video:", error);
        alert("Failed to upload video. Please try again.");
      } finally {
        setUploading(false);
      }
    };


  const handleSave = async () => { 
    if (uploading){
      alert("アップロード中です")
    } else {
      setLoading(true);
      try {
        // 親コンポーネントに新しいユーザー情報と自己紹介を渡す
        onSave({ ...user, user_name: userName }, bio);
        console.log("video=", videoURL)
        PutURL(user.user_id, videoURL);
      } catch (error) {
        console.error("Error occurred:", error);
        alert("An error occurred.");
      } finally {
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 成功メッセージを表示してからリロード
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {messages.editProfile}
          </Typography>

          <Box sx={{ padding: 2 }}>
          <Box>
      <label htmlFor="file-input">
        <Input
          id="file-input"
          type="file"
          inputProps={{
            accept: ".png", // PNGファイルのみ許可
          }}
          onChange={handleFileChange}
          sx={{ display: "none" }} // Inputを非表示
        />
        <Button variant="contained" component="span">
          {messages.selectFile}
        </Button>
      </label>
    </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading}
        sx={{
          marginBottom: 2,
          backgroundColor: uploading ? "#ccc" : "primary.main",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? messages.uploading : messages.upload}
      </Button>
      
        <Box
          component="img"
          src={url || `${process.env.PUBLIC_URL}/logo.png`}
          sx={{
            width: "100px", // 固定幅
            height: "100px", // 高さを自動調整
            borderRadius: "50%", // 角丸にする
            boxShadow: 2, // 軽い影を追加
            mt: 2, // マージン（上側）
            ml:3
          }}
          alt="Uploaded Preview"
        />

    </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label={messages.name}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label={messages.introduction}
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
              {loading ? messages.saving : messages.save}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel} disabled={loading}>
              {messages.cancel}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;