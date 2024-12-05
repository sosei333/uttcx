import React from "react";
import { Button } from "@mui/material";
import { getLocalizedStrings } from "../../layouts/strings";
import { useLanguage } from "../../layouts/LanguageContext";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  const { language } = useLanguage(); // 言語設定を取得
  const strings = getLocalizedStrings(language); // 言語に基づく文字列を取得
  return (
    <Button variant="outlined" onClick={onClick}>
      {strings.edit}
    </Button>
  );
};

export default EditButton;