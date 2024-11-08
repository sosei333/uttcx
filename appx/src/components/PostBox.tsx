import { Box, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface PostProps {
    content: string;
    author: string;
    date: string;
}

const PostBox: React.FC<PostProps> = ({ content, author, date }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
            my={1}
            border="1px solid #ccc"
            borderRadius={2}
            width="100%"
            position="relative"
        >
            {/* 投稿者と投稿日を右上に表示 */}
            <Box position="absolute" top={8} left={8}>
                <Typography variant="caption" color="textSecondary">
                    {author} ・ {date}
                </Typography>
            </Box>

            {/* コンテンツ */}
            <Typography variant="body1" mt={2} mb={4}>
                {content}
            </Typography>

            {/* いいねとブックマークボタンを右下に配置 */}
            <Box display="flex" justifyContent="flex-end" mt="auto">
                <IconButton aria-label="like">
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="bookmark">
                    <BookmarkBorderIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default PostBox;
