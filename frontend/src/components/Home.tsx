import { auth } from "../firebase";
import { Box } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            height="100vh"               // 画面の高さ全体を使う
            padding={2}                  // 内側の余白
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                height="100%"
                width="100%"
                overflow="auto"           // スクロールを可能にする
                padding={2}               // 内側の余白
            >
                {/* サンプルコンテンツを追加 */}
                {[...Array(20)].map((_, i) => (
                    <Box key={i} p={2} my={1} border="1px solid #ccc" borderRadius={2} width="100%">
                        コンテンツ {i + 1}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Home;
