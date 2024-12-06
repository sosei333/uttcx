import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TweetList from '../components/organisms/TweetsList';
import { useAppContext } from '../context/AppContext';

type Tweet = {
    id: number;
    user_id: string;
    content: string;
    created_at: string;
    user_name: string;
};

const Tweets: React.FC = () => {
    const { theme, setTheme, language, setLanguage} = useAppContext();
    
    const navigate = useNavigate();

    const handleViewDetails = (tweetId: number) => {
        navigate(`/tweet/${tweetId}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={2}
            height="90vh"
            width="80vh"
        >
            <TweetList onViewDetails={handleViewDetails}></TweetList>
        </Box>
    );
};

export default Tweets;
