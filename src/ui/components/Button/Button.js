import React from "react";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  className,
  variant = "primary", // or 'secondary'
}) => {
  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      className={ [$.button, className].join(" ")}
      type={type}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
