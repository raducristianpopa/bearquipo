import React, { ComponentProps, forwardRef } from "react";
import { Link } from "react-router-dom";

export type ButtonOrLinkProps = Omit<ComponentProps<"a"> & ComponentProps<"button">, "ref">;

export default forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonOrLinkProps>((props, ref: any) => {
  if (props.href) {
    return <Link to={props.href} ref={ref} {...props} />;
  }

  return <button {...props} type={props.type || "button"} ref={ref} />;
});
