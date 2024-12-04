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

  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  useEffect(() => {
    if (!firebaseUser) {
      console.error("User is not authenticated");
      setLoading(false);
      return;
    }

    const userId = firebaseUser.uid;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userName = await getUserNameByID(userId);
        const userIntro = await getUserIntroductionByID(userId);
        if (userName) {
          setCurrentUser({ user_id: userId, user_name: userName });
          setUserIntroduction(userIntro);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error occurred:", error);
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
      const nameUpdateSuccess = await updateUserName(updatedUser.user_id, updatedUser.user_name);
      const bioUpdateSuccess = await updateUserIntroduction(updatedUser.user_id, updatedIntroduction);

      if (nameUpdateSuccess && bioUpdateSuccess) {
        setCurrentUser(updatedUser);
        setUserIntroduction(updatedIntroduction);
        setIsEditing(false);
      } else {
        alert("Failed to update user information");
      }
    } catch (error) {
      console.error("Error while updating user information:", error);
      alert("An unexpected error occurred");
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
