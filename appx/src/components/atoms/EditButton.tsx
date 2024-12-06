import React from "react";
import { Button } from "@mui/material";
import { getLocalizedStrings } from "../../layouts/strings";


interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  const messages = getLocalizedStrings();

  return (
    <Button variant="outlined" onClick={onClick}>
      {messages.edit}
    </Button>
  );
};

export default EditButton;