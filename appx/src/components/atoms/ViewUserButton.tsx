import NavigationButton from "./NavigationButton";
import { getLocalizedStrings } from "../../layouts/strings";

interface ViewUserDetailsButtonProps {
    userID?: string,
    onClick?: ()=>void;
}

const ViewUserDetailsButton: React.FC<ViewUserDetailsButtonProps> = ({ userID, onClick }) => {
    const messages = getLocalizedStrings();
    return (
        <NavigationButton label={messages.detail} to={`/user/${userID}`} onClick={onClick}></NavigationButton>
    );
};

export default ViewUserDetailsButton;