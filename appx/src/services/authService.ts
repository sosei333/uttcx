// services/authService.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

interface User {
    id: string;
    email: string;
}

export const signupWithFirebase = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const registerUserToBackend = async (user: User): Promise<void> => {
    const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to register user to backend");
};