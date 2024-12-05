const colorSets = {
  set1: {
    accent: '#627962',        // アクセントカラー (強調)
    accentLight: '#88a088',   // 明るいアクセント (ホバーなどに使用)
    accentDark: '#455145',    // 暗いアクセント (強調された状態)
    base: '#F1ECEB',          // ベースカラー (背景など)
    text: '#363427',          // テキストカラー (標準文字色)
    textSecondary: '#565247', // セカンダリテキスト (補足情報)
  },
  set2: {
    accent: '#DC9F95',        // アクセントカラー (強調)
    accentLight: '#F2C2BA',   // 明るいアクセント (ホバーなどに使用, #DC9F95を少し明るく調整)
    accentDark: '#B57A70',    // 暗いアクセント (強調された状態, #DC9F95を少し暗く調整)
    base: '#FFF6EE',          // ベースカラー (背景など)
    text: '#664B4F',          // テキストカラー (標準文字色)
    textSecondary: '#856568', // セカンダリテキスト (補足情報, #664B4Fを少し明るく調整)
  },
  set3: {
    accent: '#9EC2C2',        // アクセントカラー (強調)
    accentLight: '#C2DFDF',   // 明るいアクセント (ホバーなどに使用, #9EC2C2を少し明るく調整)
    accentDark: '#7FA1A1',    // 暗いアクセント (強調された状態, #9EC2C2を少し暗く調整)
    base: '#F8F4F2',          // ベースカラー (背景など)
    text: '#5D4E72',          // テキストカラー (標準文字色)
    textSecondary: '#78688A', // セカンダリテキスト (補足情報, #5D4E72を少し明るく調整)
 },
 set4: {
  accent: '#135389',        // アクセントカラー (強調)
  accentLight: '#3775AD',   // 明るいアクセント (ホバーなどに使用, #135389を少し明るく調整)
  accentDark: '#0F426E',    // 暗いアクセント (強調された状態, #135389を少し暗く調整)
  base: '#FBFEFF',          // ベースカラー (背景など)
  text: '#30343A',          // テキストカラー (標準文字色)
  textSecondary: '#4A4E54', // セカンダリテキスト (補足情報, #30343Aを少し明るく調整)
 },
 set5: {
  accent: '#365C3B',        // アクセントカラー (強調)
  accentLight: '#5C845E',   // 明るいアクセント (ホバーなどに使用, #365C3Bを少し明るく調整)
  accentDark: '#2A472F',    // 暗いアクセント (強調された状態, #365C3Bを少し暗く調整)
  base: '#FFF3E7',          // ベースカラー (背景など)
  text: '#43311F',          // テキストカラー (標準文字色)
  textSecondary: '#64523E', // セカンダリテキスト (補足情報, #43311Fを少し明るく調整)
},
}

type ColorSetKeys = keyof typeof colorSets;

const getColorSet = (setNumber: number): Record<string, string> => {
  const setKey = `set${setNumber}` as ColorSetKeys;
  return colorSets[setKey] || colorSets.set1; // デフォルトで set1 を返す
};

export { colorSets, getColorSet };
