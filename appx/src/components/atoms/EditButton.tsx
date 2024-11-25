import React from "react";
import { Button } from "@mui/material";
import CustomButton from "./CustomButton";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <CustomButton variant="outlined" onClick={onClick}>
      編集
    </CustomButton>
  );
};

export default EditButton;