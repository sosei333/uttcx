import React, { useState, useEffect } from "react";
import { UserProfile } from "../../models/user_models";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import EditButton from "../atoms/EditButton";
import EditProfile from "./EditProfile";
import { updateUserName, updateUserIntroduction } from "../../services/user";
import { getUserNameByID, getUserIntroductionByID } from "../../services/user";
import { getAuth } from "firebase/auth";
import ViewUserDetailsButton from "../atoms/ViewUserButton";

const ProfileBox: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userIntroduction, setUserIntroduction] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  useEffect(() => {
    if (!firebaseUser) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    const userId = firebaseUser.uid;

    const fetchUser = async () => {
      setLoading(true);
      setError(null); // エラーをリセット
      try {
        const userName = await getUserNameByID(userId);
        const userIntro = await getUserIntroductionByID(userId);

        if (userName) {
          setCurrentUser({ user_id: userId, user_name: userName });
          setUserIntroduction(userIntro || "No bio available");
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
      // 変更がない場合はリクエストを送信しない
      const isNameChanged = updatedUser.user_name !== currentUser?.user_name;
      const isBioChanged = updatedIntroduction !== userIntroduction;

      if (!isNameChanged && !isBioChanged) {
        alert("No changes detected");
        setIsEditing(false);
        return;
      }

      const nameUpdateSuccess = isNameChanged
        ? await updateUserName(updatedUser.user_id, updatedUser.user_name)
        : true; // 変更がない場合は成功とみなす

      const bioUpdateSuccess = isBioChanged
        ? await updateUserIntroduction(updatedUser.user_id, updatedIntroduction)
        : true; // 変更がない場合は成功とみなす

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
          bgcolor: "#f5f5f5",
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
          bgcolor: "#f5f5f5",
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
          bgcolor: "#f5f5f5",
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
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>User ID:</strong> {currentUser.user_id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>User Name:</strong> {currentUser.user_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Introduction:</strong> {userIntroduction || "No bio available"}
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
