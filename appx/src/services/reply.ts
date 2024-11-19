export const getReplies = async (parentId: number) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
        console.error("Backend URL is not defined in the environment variables");
        return [];
    }

    try {
        const response = await fetch(`${backendUrl}/reply?tweet_id=${parentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Failed to fetch replies", response.status);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        return [];
    }
};
