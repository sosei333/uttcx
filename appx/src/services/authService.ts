// services/authService.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';


export const signupWithFirebase = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const signinWithFirebase = async (email:string, password:string)=>{
    signInWithEmailAndPassword(auth, email, password);
}

export const signoutWithFirebase = async () =>{
    signOut(auth)
}