// hooks/useSignup.ts
import { useState } from 'react';
import { signupWithFirebase, registerUserToBackend } from '../services/authService';

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignup = async (email: string, password: string, confirmPassword: string) => {
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('パスワードが一致しません。');
            return;
        }

        try {
            const user = await signupWithFirebase(email, password);
            await registerUserToBackend({ id: user.uid, email: user.email! });
            setSuccess("新規登録が成功しました。ログインしてください。");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return { handleSignup, error, success };
};
