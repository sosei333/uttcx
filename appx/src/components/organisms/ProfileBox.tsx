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

const ProfileBox: React.FC = () => {
  const theme = useTheme();
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
      setError(null);
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
      const isNameChanged = updatedUser.user_name !== currentUser?.user_name;
      const isBioChanged = updatedIntroduction !== userIntroduction;

      if (!isNameChanged && !isBioChanged) {
        alert("No changes detected");
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
          bgcolor: theme.palette.background.paper,
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
        <Card sx={{ maxWidth: 400, padding: 2, boxShadow: "none" }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>User ID:</strong> {currentUser.user_id}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>User Name:</strong> {currentUser.user_name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Introduction:</strong> {userIntroduction || "No bio available"}
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
