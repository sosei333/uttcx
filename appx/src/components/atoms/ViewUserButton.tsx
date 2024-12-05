import NavigationButton from "./NavigationButton";
import { getLocalizedStrings } from "../../layouts/strings";
import { useLanguage } from "../../layouts/LanguageContext";

interface ViewUserDetailsButtonProps {
    userID?: string,
    onClick?: ()=>void;
}

const ViewUserDetailsButton: React.FC<ViewUserDetailsButtonProps> = ({ userID, onClick }) => {
    const { language } = useLanguage(); // 言語設定を取得
    const strings = getLocalizedStrings(language); // 言語に基づく文字列を取得
    return (
        <NavigationButton label={strings.detail} to={`/user/${userID}`} onClick={onClick}></NavigationButton>
    );
};

export default ViewUserDetailsButton;