import './Shiny_text.css';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    gamakeicon?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className ? className : "text-lime-300"}`}
            style={{ animationDuration }}
        > <i className={`${className ? className : "fa-brands fa-uncharted"}`}> </i>
            {" " + text}
        </div>
    );
};

export default ShinyText;