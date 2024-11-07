import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const useSignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                alert('ログアウトしました');
                navigate('/');
            })
            .catch((error) => {
                alert('ログアウトに失敗しました: ' + error.message);
            });
    };

    return handleSignOut;
};

export default useSignOut;
