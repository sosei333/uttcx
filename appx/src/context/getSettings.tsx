type Settings = {
    theme: 'light' | 'dark';
    language: 'en' | 'ja';
    fontSize: 'small' | 'medium' | 'large';
  };
  
// context/getSettings.ts
export const getSettingsFromLocalStorage = () => {
    return {
      language: localStorage.getItem("settings.language") || "en",
      theme: localStorage.getItem("settings.theme") || "light",
      fontSize: localStorage.getItem("settings.fontSize") || "medium",
    };
  };
  
  