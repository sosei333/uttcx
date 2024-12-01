import NavigationButton from "./NavigationButton";

interface ViewUserDetailsButtonProps {
    userID?: string,
    onClick?: ()=>void;
}

const ViewUserDetailsButton: React.FC<ViewUserDetailsButtonProps> = ({ userID, onClick }) => {
    return (
        <NavigationButton label="details" to={`/user/${userID}`} onClick={onClick}></NavigationButton>
    );
};

export default ViewUserDetailsButton;