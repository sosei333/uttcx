type LocalizationStrings = {
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
    saving:string;
    cancel:string;
    content: string;
    receivingAnswer: string;
    question: string;
    post: string;
    selectQuestion: string;
    logout: string;
    noFollowing:string;
    noFollowed: string;
  };
  
  const localizationData: Record<string, LocalizationStrings> = {
    en: {
      following: "Following",
      followers: "Followers",
      follow: "Follow",
      unfollow: "Unfollow",
      save: "Save",
      allTweet: "All Tweets",
      detail: "details",
      setting: "User Settings",
      profile: "Profile",
      user: "User",
      name: "Name",
      introduction: "Self-Introduction",
      edit: "edit",
      saving: "saving",
      cancel: "Cancel",
      content: "Content",
      receivingAnswer: "Receiving answer ...",
      question: "Ask AI",
      post : "Post",
      selectQuestion: "Select a question",
      logout: "Sign Out",
      noFollowed: "No one is following you yet.",
      noFollowing: "You are not following anyone yet."
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
      cancel:"キャンセル",
      content: "投稿内容",
      receivingAnswer: "AIの回答を取得中",
      question: "AIに尋ねる",
      post: "投稿",
      selectQuestion: "質問を選択してください",
      logout: "ログアウト",
      noFollowed: "まだ誰もあなたをフォローしていません。他の人とつながってフォロワーを増やしましょう！",
      noFollowing: "現在フォロワーはいません。興味深いコンテンツを共有してフォロワーを増やしましょう！"
    },
  };
  
  /**
   * Returns the localized strings for the given language.
   * If the language is not available, it falls back to English.
   * 
   * @param language The language code (e.g., "en", "ja", "es").
   * @returns An object containing the localized strings.
   */
  export const getLocalizedStrings = (language: string): LocalizationStrings => {
    return localizationData[language] || localizationData["en"];
  };
  