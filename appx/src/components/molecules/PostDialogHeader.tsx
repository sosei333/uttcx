import { DialogTitle } from '@mui/material';

interface PostDialogHeaderProps {
  title: string;
}

const PostDialogHeader: React.FC<PostDialogHeaderProps> = ({ title }) => {
  return <DialogTitle>{title}</DialogTitle>;
};

export default PostDialogHeader;
