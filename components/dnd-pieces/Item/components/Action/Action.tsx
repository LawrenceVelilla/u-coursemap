import React, { CSSProperties, forwardRef } from "react";
import classNames from "classnames";

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  function Action({ active, className, cursor, style, ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(
          "flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors",
          className
        )}
        tabIndex={0}
        style={{
          ...style,
          cursor: cursor || "pointer",
          color: active?.fill,
          backgroundColor: active?.background,
        } as CSSProperties}
      />
    );
  }
);
