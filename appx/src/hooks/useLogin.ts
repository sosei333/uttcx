import { useState } from 'react';
import { signinWithFirebase} from '../services/authService';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setSuccess(null);

        try {
            await signinWithFirebase(email, password);
            {/*await registerUserToBackend({ id: user.uid, email: user.email! });*/}
            setSuccess("ログインに成功しました");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return { handleLogin, error, success };
};