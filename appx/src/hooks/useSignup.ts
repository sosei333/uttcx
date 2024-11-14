import { useState } from 'react';
import { signupWithFirebase } from '../services/authService';
import { registerUserToBackend } from './register';

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSignup = async (email: string, name: string, password: string, confirmPassword: string) => {
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('パスワードが一致しません。');
            return;
        }

        try {
            // Firebaseでユーザーを登録し、ユーザーIDを取得
            const user = await signupWithFirebase(email, password);
            const userId = user?.uid; // Firebaseから取得したユーザーID

            if (!userId) {
                throw new Error("ユーザーIDの取得に失敗しました。");
            }

            // バックエンドにユーザー情報を送信（user_nameとuser_idを送信）
            await registerUserToBackend(name, userId);
            
            setSuccess("新規登録が成功しました。ログインしてください。");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return { handleSignup, error, success };
};
