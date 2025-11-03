import React, { forwardRef } from "react";
import classNames from "classnames";

import { Handle } from "../Item/components/Handle";
import { Remove } from "../Item/components/Remove";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  function Container(
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        ref={ref}
        style={style}
        className={classNames(
          "flex flex-col gap-2 p-4 rounded-lg",
          !unstyled && "bg-gray-50 border border-gray-200",
          hover && "ring-2 ring-blue-400",
          placeholder && "border-2 border-dashed border-gray-300 bg-transparent items-center justify-center min-h-[200px]",
          scrollable && "overflow-y-auto max-h-[600px]",
          shadow && "shadow-lg",
          onClick && "cursor-pointer hover:bg-gray-100"
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">{label}</span>
            <div className="flex items-center gap-1">
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul className="flex flex-col gap-2">{children}</ul>}
      </Component>
    );
  }
);
