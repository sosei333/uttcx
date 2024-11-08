import { Box } from '@mui/material';
import PostBox from './organisms/PostBox';

const Home: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            height="100vh"
            width="60vw"
            padding={2}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                height="100%"
                width="100%"
                overflow="auto"
                padding={2}
            >
                {/* 投稿を表示するためのサンプルデータ */}
                {[...Array(20)].map((_, i) => (
                    <PostBox
                        key={i}
                        content={`コンテンツ${i + 1}`}
                        author={`ユーザー${i + 1}`}
                        date={`2024-11-08`}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Home;
