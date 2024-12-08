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
  aiQuestion1: string;
  aiQuestion2: string;
  aiQuestion3: string;
  aiQuestion4: string;
  aiPrompt1: string;
  aiPrompt2: string;
  aiPrompt3: string;
  aiPrompt4: string;
  upload: string; 
  uploading: string;
  selectFile: string;
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
    aiQuestion1: 'What is inappropriate?',
    aiQuestion2: 'Translate into Japanese!',
    aiQuestion3: 'Is it easy to read?',
    aiQuestion4: 'Is the content interesting?',
    aiPrompt1: 'If the following content contains inappropriate expressions, please point them out.',
    aiPrompt2: 'Please translate the following post into Japanese.',
    aiPrompt3: 'Please tell me if the following post is easy to read and suggest improvements if necessary.',
    aiPrompt4: 'Please evaluate whether the following post is considered interesting.',
    upload: 'Upload',
    uploading: 'Uploading...',
    selectFile: 'Select a file',
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
    aiQuestion1: '不適切な内容は？',
    aiQuestion2: '英語に翻訳して！',
    aiQuestion3: '読みやすい？',
    aiQuestion4: '面白い内容か？',
    aiPrompt1: '以下の内容に不適切な表現が含まれている場合、指摘してください。',
    aiPrompt2: '以下の投稿内容を英語に翻訳してください。',
    aiPrompt3: '以下の投稿内容が読みやすいかどうか、改善点を教えてください。',
    aiPrompt4: '以下の投稿が面白いと思われるかどうか評価してください。',
    upload: "アップロード",
    uploading: "アップロード中",
    selectFile: "画像を選択してください"
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
