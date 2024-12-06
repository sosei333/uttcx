import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserSettings } from "../services/user"; // サーバーAPI関数
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>("default"); // デフォルト言語
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user); // ユーザー情報を確認
        const userId = user.uid;
  
        try {
          const settings = await getUserSettings(userId);
          console.log("Fetched Settings:", settings); // 設定を確認
          if (settings?.language) {
            setLanguage(settings.language);
          }
        } catch (error) {
          console.error("Failed to fetch language setting:", error);
        }
      } else {
        console.log("No user authenticated");
      }
    });
  
    return () => unsubscribe(); // クリーンアップ
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
