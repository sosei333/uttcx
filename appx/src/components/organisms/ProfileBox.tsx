import React, { useState, useEffect } from "react";
import { UserProfile } from "../../models/user_models";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  Button,
} from "@mui/material";
import EditButton from "../atoms/EditButton";
import EditProfile from "./EditProfile";
import { updateUserName, updateUserIntroduction } from "../../services/user";
import { getUserNameByID, getUserIntroductionByID } from "../../services/user";
import { getAuth } from "firebase/auth";
import ViewUserDetailsButton from "../atoms/ViewUserButton";
import { getLocalizedStrings } from "../../layouts/strings";
import ImageUploader from "./ImageUploader";
import { getUserImageByID } from "../../services/image";

const ProfileBox: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userIntroduction, setUserIntroduction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  const messages= getLocalizedStrings();


  useEffect(() => {
    if (!firebaseUser) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const userId = firebaseUser.uid;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const userName = await getUserNameByID(userId);
        const userIntro = await getUserIntroductionByID(userId);
        const url = await getUserImageByID(userId)
        if (userName) {
          setCurrentUser({ user_id: userId, user_name: userName });
          setUserIntroduction(userIntro || messages.noBio);
          setUrl(url)
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (fetchError: any) {
        console.error("Error fetching user data:", fetchError);
        setError(fetchError.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [firebaseUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUser: UserProfile, updatedIntroduction: string) => {
    try {
      const isNameChanged = updatedUser.user_name !== currentUser?.user_name;
      const isBioChanged = updatedIntroduction !== userIntroduction;

      if (!isNameChanged && !isBioChanged) {
        // alert("No changes detected");
        setIsEditing(false);
        return;
      }

      const nameUpdateSuccess = isNameChanged
        ? await updateUserName(updatedUser.user_id, updatedUser.user_name)
        : true;

      const bioUpdateSuccess = isBioChanged
        ? await updateUserIntroduction(updatedUser.user_id, updatedIntroduction)
        : true;

      if (nameUpdateSuccess && bioUpdateSuccess) {
        setCurrentUser(updatedUser);
        setUserIntroduction(updatedIntroduction);
        setIsEditing(false);
        alert("Profile updated successfully");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error while updating user information:", error);
      alert("An unexpected error occurred while updating your profile");
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
          bgcolor: theme.palette.background.default,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: theme.palette.error.light,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (isEditing && currentUser) {
    return (
      <EditProfile
        user={currentUser}
        introduction={userIntroduction || ""}
        onSave={handleSave}
        onCancel={handleCancel}
        imgurl={url}
      />
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
          bgcolor: theme.palette.warning.light,
        }}
      >
        <Typography color="error">User information not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        bgcolor: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          maxWidth: 500,
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          border: `2px solid ${theme.palette.primary.light}`, // 枠線を追加
        }}
      >
      <Card sx={{ 
        display: "flex",
        maxWidth: 400, 
        padding: 2, 
        boxShadow: "none" , 
        alignItems: "center",
        alignContent: "center", 
        justifyContent: "center"}}>
        <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
            {messages.profile}
          </Typography>
          <Box
          component="img"
            src={url || `${process.env.PUBLIC_URL}/logo.png`}
            sx={{
              width: '100px', // 横幅を親要素にフィット
              // 最大幅を指定
              height: "100px", // 高さを自動調整
              borderRadius: "50%", // 角丸にする
              boxShadow: 2, // 軽い影を追加
              alignSelf: "center",
              border: `3px solid ${theme.palette.primary.light}`
            }}
            alt="Uploaded Preview"
          />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{messages.user} ID:</strong>
            <br />
            {currentUser.user_id}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{messages.name}:</strong>
            <br />
            {currentUser.user_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <strong>{messages.introduction}:</strong>
            <br />
            {userIntroduction || messages.noBio}
          </Typography>
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              justifyContent: "space-around", // ボタン間のスペースを確保
            }}
          >
            <EditButton onClick={handleEditClick} />
            <ViewUserDetailsButton userID={currentUser.user_id} />
          </Box>
        </CardContent>
      </Card>
      </Paper>
    </Box>
  );
};

export default ProfileBox;
