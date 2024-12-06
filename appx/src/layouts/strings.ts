// localization.ts
export type LocalizationStrings = {
  following: string;
  followers: string;
  follow: string;
  unfollow: string;
  save: string;
  allTweet: string;
  detail: string;
  setting: string;
  profile: string;
  user: string;
  name: string;
  introduction: string;
  edit: string;
  saving: string;
  cancel: string;
  content: string;
  receivingAnswer: string;
  question: string;
  post: string;
  selectQuestion: string;
  logout: string;
  noFollowing: string;
  noFollowed: string;
  login: string;
  signup: string;
  editProfile: string;
  home: string;
  follow2:string;
  light: string;
  green: string;
  blue: string;
  small: string;
  medium: string;
  large: string;
  email: string;
  topPage: string;
  password: string;
  confirmPassword: string;
  language: string;
  theme: string;
  fontSize: string;
};

const localizationData: Record<string, LocalizationStrings> = {
  en: {
    following: "Following",
    followers: "Followers",
    follow: "Follow",
    unfollow: "Unfollow",
    save: "Save",
    allTweet: "All Tweets",
    detail: "Details",
    setting: "User Settings",
    profile: "Profile",
    user: "User",
    name: "Name",
    introduction: "Self-Introduction",
    edit: "Edit",
    saving: "Saving",
    cancel: "Cancel",
    content: "Content",
    receivingAnswer: "Receiving answer ...",
    question: "Ask AI",
    post: "Post",
    selectQuestion: "Select a question",
    logout: "Sign Out",
    noFollowed: "No one is following you yet.",
    noFollowing: "You are not following anyone yet.",
    login: "Login",
    signup: "Sign Up",
    editProfile: "Edit Profile",
    home: "Home",
    follow2: "Follow",
    light: "Light",
    green: "Green",
    blue: "Blue",
    small: "Small",
    medium: "Medium",
    large: "Large",
    email: "Email",
    topPage: "Top Page",
    password: "Password",
    confirmPassword: "Confirm Password",
    language: "Language",
    theme: "Theme",
    fontSize: "Font Size",
  },
  ja: {
    following: "フォロー中",
    followers: "フォロワー",
    follow: "フォローする",
    unfollow: "フォローを解除",
    save: "保存する",
    allTweet: "すべての投稿",
    detail: "詳細",
    setting: "ユーザー設定",
    profile: "プロフィール",
    user: "ユーザー",
    name: "ユーザーネーム",
    introduction: "自己紹介",
    edit: "編集",
    saving: "保存中",
    cancel: "キャンセル",
    content: "投稿内容",
    receivingAnswer: "AIの回答を取得中",
    question: "AIに尋ねる",
    post: "投稿",
    selectQuestion: "質問を選択してください",
    logout: "ログアウト",
    noFollowed: "まだ誰もあなたをフォローしていません。他の人とつながってフォロワーを増やしましょう！",
    noFollowing: "現在フォロワーはいません。興味深いコンテンツを共有してフォロワーを増やしましょう！",
    login: "ログイン",
    signup: "新規登録",
    editProfile: "プロフィールを編集",
    home: "ホーム",
    follow2: "フォロー",
    light: "明るい",
    green: "緑",
    blue: "青",
    small: "小さめ",
    medium: "普通",
    large: "大きめ",
    email: "メールアドレス",
    topPage: "タイトル",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    language: "言語",
    theme: "テーマ",
    fontSize: "フォントサイズ",
  },
};

const getLanguageFromLocalStorage = (): string => {
  return localStorage.getItem("settings.language") || "en";
};

/**
 * ローカルストレージの言語設定を反映した文字列セットを取得
 */
export const getLocalizedStrings = (): LocalizationStrings => {
  const language = getLanguageFromLocalStorage();
  return localizationData[language] || localizationData["en"];
};
