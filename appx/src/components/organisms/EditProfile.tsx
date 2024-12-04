import React, { useState } from "react";
import { UserProfile } from "../../models/user_models";
import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";

interface EditProfileProps {
  user: UserProfile;
  introduction: string;
  onSave: (updatedUser: UserProfile, updatedIntroduction: string) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, introduction, onSave, onCancel }) => {
  const [userName, setUserName] = useState(user.user_name);
  const [bio, setBio] = useState(introduction); // 親から受け取った introduction を初期値に設定
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // 親コンポーネントに新しいユーザー情報と自己紹介を渡す
      onSave({ ...user, user_name: userName }, bio);
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
            Edit Profile
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Introduction"
              multiline
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
