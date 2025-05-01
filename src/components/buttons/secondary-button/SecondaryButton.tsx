import React from "react";
import "./SecondaryButton.css";

interface IProps {
  className?: string;
  placeholder: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  iconSrc?: string;
  iconAlt?: string;
}

function SecondaryButton({
  className,
  placeholder,
  disabled = false,
  type = "button", 
  onClick,
  iconSrc,
  iconAlt = "",
}: IProps) {
  return (
    <div className={`secondary-button-wrapper ${className}`}>
      <button 
        type={type}
        disabled={disabled} 
        onClick={onClick}
      >
        {placeholder}
        {iconSrc && (
          <img 
            src={iconSrc} 
            alt={iconAlt} 
            className="button-icon" 
          />
        )}
      </button>
    </div>
  );
}

export default SecondaryButton;