import React from "react";
import { Button } from "@mui/material";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button variant="outlined" onClick={onClick}>
      編集
    </Button>
  );
};

export default EditButton;