"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

type userType = {
    email: string | null,
    uid: string,
    emailVerified: boolean,
}

// type todoType = {
//     id:string
//     todo: string;
//     isComplete: boolean;
// }

type ExpenseTracker = {
    id: string;
    title: string;
    amount: number;
    catogery: string;
    date: Date;
    note: string;
}

type AuthContextProviderType = {
    children: ReactNode
}

type authContexType = {
    user: userType | null
    userName: string
    // todoData: todoType[];

}

const AuthContext = createContext<null | authContexType>(null)

export default function AuthContextProvider({ children }: AuthContextProviderType) {
    const [user, setUser] = useState<null | userType>(null);
    const [userName, setUserName] = useState<string>("");
    const router = useRouter();

    // useEffect(() => console.log(expenseTracker), [expenseTracker])
    useEffect(() => {
        const auth = getAuth(app);
        const db = getFirestore(app);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, uid, emailVerified } = user;
                setUser({ email, uid, emailVerified });
                // console.log(user, "inside on auth change");

                if (emailVerified) {
                    // console.log("start");
                    (async () => {
                        try {
                            console.log("Fetching user data for UID:", auth.currentUser?.uid);
                            const userDoc = doc(db, "users", uid);
                            const docSnap = await getDoc(userDoc);
                            console.log(docSnap.exists());

                            // console.log((await getDoc(userDoc)).data());

                            if (docSnap?.exists()) {
                                const fetchedUserName = docSnap.data().user_name;
                                setUserName(fetchedUserName);
                                console.log(userName);

                                // console.log(fetchedUserName);
                            } else {
                                // console.log("No such document!");
                            }
                        } catch (error) {
                            console.error("Error fetching user name:", error);
                        }
                    })();
                    router.push('/');

                } else {
                    router.push('/verifyEmail');
                }
            } else {
                setUser(null);
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, userName}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);
