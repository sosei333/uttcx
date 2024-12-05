import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, Button, Alert, CircularProgress } from "@mui/material";
import { updateUserSettings, getUserSettings } from "../../services/user"; // サーバーAPI関数
import { getAuth } from "firebase/auth";
import { getLocalizedStrings } from "../../layouts/strings";
import { useLanguage } from "../../layouts/LanguageContext";

const SettingsComponent: React.FC = () => {
  const [language, setLanguage] = useState<string>("en");
  const [theme, setTheme] = useState<string>("light");
  const [fontSize, setFontSize] = useState<string>("medium");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ローディング状態
  

  // Firebase Authentication のユーザー情報を取得
  const auth = getAuth();
  const firebaseUser = auth.currentUser;


  // 初期設定の取得
  useEffect(() => {
    const fetchSettings = async () => {
      if (!firebaseUser) {
        setAlertMessage("You are not logged in.");
        setLoading(false);
        return;
      }

      const userId = firebaseUser.uid;

      try {
        const settings = await getUserSettings(userId);
        if (settings) {
          setLanguage(settings.language || "en");
          setTheme(settings.theme || "light");
          setFontSize(settings.fontSize || "medium");
        }
      } catch (error) {
        setAlertMessage("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [firebaseUser]);

  // 設定を保存
  const handleSave = async () => {
    if (!firebaseUser) {
      setAlertMessage("You are not logged in.");
      return;
    }

    const userId = firebaseUser.uid;

    try {
      const success = await updateUserSettings(userId, { language, theme, fontSize });
      if (success) {
        setAlertMessage("Settings updated successfully!");
      } else {
        setAlertMessage("Failed to update settings.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while updating settings.");
    }
  };

  // ローディング中の表示
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
        <Typography ml={2}>Loading settings...</Typography>
      </Box>
    );
  }

  const strings = getLocalizedStrings(language); // 言語に基づく文字列を取得

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}>
      <Typography variant="h6">{strings.setting}</Typography>

      {/* Language Selector */}
      <Select value={language} onChange={(e) => setLanguage(e.target.value)} fullWidth>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ja">日本語</MenuItem>
      </Select>

      {/* Theme Selector */}
      <Select value={theme} onChange={(e) => setTheme(e.target.value)} fullWidth>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>

      {/* Font Size Selector */}
      <Select value={fontSize} onChange={(e) => setFontSize(e.target.value)} fullWidth>
        <MenuItem value="small">Small</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="large">Large</MenuItem>
      </Select>

      {/* Save Button */}
      <Button variant="contained" onClick={handleSave}>
      {strings.save}
      </Button>

      {/* Alert Message */}
      {alertMessage && <Alert severity={alertMessage.includes("success") ? "success" : "error"}>{alertMessage}</Alert>}
    </Box>
  );
};

export default SettingsComponent;
