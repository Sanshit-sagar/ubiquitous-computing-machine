

const Badge = ({ value }) => {
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
            {value}
        </span>
    );
}

export default Badge