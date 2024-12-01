import React, { useState, useEffect } from "react";
import { UserProfile } from "../../models/user_models";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import EditButton from "../atoms/EditButton";
import EditProfile from "./EditProfile";
import { updateUserName } from "../../services/user";
import { getUserNameByID } from "../../services/user";
import { getAuth } from "firebase/auth";
import ViewUserDetailsButton from "../atoms/ViewUserButton";

const ProfileBox: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null); // 初期値は null
  const [loading, setLoading] = useState(true);

  // Firebaseから認証されたユーザーを取得
  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  useEffect(() => {
    if (!firebaseUser) {
      console.error("User is not authenticated");
      setLoading(false); // ローディングを終了
      return;
    }

    const userId = firebaseUser.uid; // FirebaseのユーザーID

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userName = await getUserNameByID(userId); // ユーザー名をバックエンドから取得
        if (userName) {
          setCurrentUser({ user_id: userId, user_name: userName });
        } else {
          console.error("ユーザー情報の取得に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        setLoading(false); // ローディングを終了
      }
    };

    fetchUser();
  }, [firebaseUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: UserProfile) => {
    if (!updatedUser.user_name.trim()) {
      alert("ユーザーネームを入力してください");
      return;
    }
  
    try {
      // バックエンドに更新を送信
      const success = await updateUserName(updatedUser.user_id, updatedUser.user_name);
  
      if (success) {
        // 成功した場合、状態を更新
        setCurrentUser(updatedUser);
        setIsEditing(false);
      } else {
        alert("ユーザーネームの更新に失敗しました");
      }
    } catch (error) {
      console.error("ユーザーネームの更新中にエラーが発生しました:", error);
      alert("予期しないエラーが発生しました");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isEditing && currentUser) {
    return (
      <EditProfile user={currentUser} onSave={handleSave} onCancel={handleCancel} />
    );
  }

  if (!firebaseUser || !currentUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography color="error">ユーザー情報が見つかりません</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            プロフィール
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>ユーザーID:</strong> {currentUser.user_id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>ユーザー名:</strong> {currentUser.user_name}
          </Typography>
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <EditButton onClick={handleEditClick} />
            <ViewUserDetailsButton userID={currentUser.user_id}></ViewUserDetailsButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileBox;