import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Button, Alert, Paper } from "@mui/material";
import { getSettingsFromLocalStorage } from "../../context/getSettings"; // 設定取得関数をインポート
import { getLocalizedStrings } from "../../layouts/strings";

const SettingsComponent: React.FC = () => {
  // 初期値としてローカルストレージの値を取得
  const initialSettings = getSettingsFromLocalStorage();
  const messages = getLocalizedStrings();

  const [language, setLanguage] = useState<string>(initialSettings.language);
  const [theme, setTheme] = useState<string>(initialSettings.theme);
  const [fontSize, setFontSize] = useState<string>(initialSettings.fontSize);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 設定を保存
  const handleSave = () => {
    try {
      // ローカルストレージに設定を保存
      localStorage.setItem("settings.language", language);
      localStorage.setItem("settings.theme", theme);
      localStorage.setItem("settings.fontSize", fontSize);
  
      setAlertMessage("Settings updated successfully!");
  
      // ページをリロード
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 成功メッセージを表示してからリロード
    } catch (error) {
      setAlertMessage("An error occurred while saving settings.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",height:'80vh',width:'40vw', padding: 2 }}>
      <Paper 
        elevation={3} 
        sx={{
          width: "100%",
          maxWidth: "500px",
          padding: 4,
          backgroundColor: "background.paper", // テーマに基づく背景色
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {messages.setting}
        </Typography>

        {/* Language Selector */}
        <Typography variant="subtitle1" gutterBottom>
          {messages.language}:
        </Typography>
        <Select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          fullWidth 
          sx={{ mb: 2 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ja">日本語</MenuItem>
        </Select>

        {/* Theme Selector */}
        <Typography variant="subtitle1" gutterBottom>
          {messages.theme}:
        </Typography>
        <Select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)} 
          fullWidth 
          sx={{ mb: 2 }}
        >
          <MenuItem value="light">{messages.light}</MenuItem>
          <MenuItem value="green">{messages.green}</MenuItem>
          <MenuItem value="blue">{messages.blue}</MenuItem>
        </Select>

        {/* Font Size Selector */}
        <Typography variant="subtitle1" gutterBottom>
          {messages.fontSize}:
        </Typography>
        <Select 
          value={fontSize} 
          onChange={(e) => setFontSize(e.target.value)} 
          fullWidth 
          sx={{ mb: 2 }}
        >
          <MenuItem value="small">{messages.small}</MenuItem>
          <MenuItem value="medium">{messages.medium}</MenuItem>
          <MenuItem value="large">{messages.large}</MenuItem>
        </Select>

        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleSave} fullWidth sx={{mt:2}}>
          {messages.save}
        </Button>

        {/* Alert Message */}
        {alertMessage && (
          <Alert sx={{ mt: 2 }} severity={alertMessage.includes("success") ? "success" : "error"}>
            {alertMessage}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default SettingsComponent;
