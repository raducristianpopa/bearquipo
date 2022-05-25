import React, { ComponentProps, forwardRef } from "react";
import ButtonOrLink, { ButtonOrLinkProps } from "./ButtonOrLink";

interface ButtonProps extends ButtonOrLinkProps {
  ["aria-label"]: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonOrLink ref={ref} {...props}>
        {children}
      </ButtonOrLink>
    );
  }
);

export default Button;
