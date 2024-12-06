import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserSettings } from "../services/user"; // サーバーAPI関数
import { getAuth, onAuthStateChanged } from "firebase/auth";

type ColorThemeContextType = {
  themeId: number;
  setThemeId: (id: number) => void;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<number>(3); // デフォルトテーマ ID
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        try {
          const settings = await getUserSettings(userId);
          if (settings?.theme) {
            setThemeId(parseInt(settings.theme, 10)); // テーマ ID を設定
          }
        } catch (error) {
          console.error("Failed to fetch color theme setting:", error);
        }
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  return (
    <ColorThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = (): ColorThemeContextType => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};