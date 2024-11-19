import { Box, IconButton, Typography, Button } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface PostProps {
    content: string;
    author: string;
    date: string;
    onViewDetails?: () => void; // 詳細を表示するためのコールバック関数
}

const PostBox: React.FC<PostProps> = ({ content, author, date, onViewDetails }) => {
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
            bgcolor="#f9f9f9"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
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
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                {/* 詳細を表示ボタン */}
                {onViewDetails && (
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={onViewDetails}
                    >
                        詳細を表示
                    </Button>
                )}
                {/* アクションボタン（いいね、ブックマーク） */}
                <Box>
                    <IconButton aria-label="like">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton aria-label="bookmark">
                        <BookmarkBorderIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default PostBox;
