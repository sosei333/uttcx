import { useState } from 'react';

const usePostToBackend = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postToBackend = async (userId: string, content: string) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        if (!backendUrl) {
            console.error('Backend URL is not defined in the environment variables');
            setError('Backend URL is missing');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${backendUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, content }),
            });

            if (!response.ok) {
                throw new Error(`Failed to post: ${response.status}`);
            }

            console.log('Post successful!');
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return { postToBackend, loading, error };
};

export default usePostToBackend;