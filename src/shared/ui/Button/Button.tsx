import React from "react";

import styles from "./Button.module.scss";

interface IButtonProps {
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  text: string;
}

const Button: React.FC<IButtonProps> = ({
  type = "button",
  onClick,
  className,
  disabled,
  text,
}) => (
  <button
    className={`${styles.button}  ${disabled ? styles.disabled : styles.active} ${className || ""}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
