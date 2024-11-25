// src/components/EditProfile.tsx
import React, { useState } from "react";
import { UserProfile } from "../../models/user_models";
import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";

interface EditProfileProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onSave, onCancel }) => {
  const [userName, setUserName] = useState(user.user_name);

  const handleSave = () => {
    const updatedUser = { ...user, user_name: userName };
    onSave(updatedUser);
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
            プロフィール編集
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="ユーザー名"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              保存
            </Button>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              キャンセル
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
