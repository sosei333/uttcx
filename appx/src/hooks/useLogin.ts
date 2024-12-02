import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setSuccess(null);

        const auth = getAuth(); // Firebase Auth インスタンスを取得

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ログイン成功
            console.log("ログインに成功しました:", user);
            setSuccess("ログインに成功しました");
        } catch (error: any) {
            // エラーコードに基づいてユーザー向けメッセージを設定
            let userMessage = "ログインに失敗しました。再度お試しください。";
            switch (error.code) {
                case "auth/invalid-credential":
                    userMessage = "認証情報が無効です。再ログインしてください。";
                    break;
                case "auth/wrong-password":
                    userMessage = "パスワードが間違っています。";
                    break;
                case "auth/user-not-found":
                    userMessage = "メールアドレスが登録されていません。";
                    break;
                case "auth/too-many-requests":
                    userMessage = "リクエストが多すぎます。一旦待ってから再度お試しください。";
                    break;
                case "auth/network-request-failed":
                    userMessage = "ネットワーク接続に問題があります。";
                    break;
                case "auth/invalid-email":
                    userMessage = "メールアドレスの形式が正しくありません。";
                    break;
                default:
                    userMessage = "予期しないエラーが発生しました。";
                    break;
            }

            console.error("エラーコード:", error.code, "メッセージ:", error.message);
            setError(userMessage);
        }
    };

    console.log("成功状態:", success, "エラー状態:", error);
    return { handleLogin, error, success };
};
