"use client";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "text" | "danger";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}

    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
