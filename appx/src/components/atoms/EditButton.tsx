import React from "react";
import { Button } from "@mui/material";
import { getLocalizedStrings } from "../../layouts/strings";
import { Height } from "@mui/icons-material";


interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  const messages = getLocalizedStrings();

  return (
    <Button variant="outlined" onClick={onClick} sx={{height: '36px', alignSelf:"center"}}>
      {messages.edit}
    </Button>
  );
};

export default EditButton;