
type EmptyStateProps {
    name: string;
    cause: string;
    icon: string;
    action: React.Component; 
}

const NoSearchResults:React.FC<EmptyStateProps> = ({ })