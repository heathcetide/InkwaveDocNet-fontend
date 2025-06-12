import * as React from "react";
import clsx from "clsx";

const variantMap = {
  cyan: "border-cyan-200 bg-cyan-50",
  green: "border-green-200 bg-green-50",
  purple: "border-purple-200 bg-purple-50",
  default: "border-gray-200 bg-white",
};

export const Card = ({ title, description, className, children, footer, variant = "default", ...props }) => {
  return (
      <div
          className={clsx(
              "rounded-2xl border p-4 shadow-sm",
              variantMap[variant] || variantMap.default,
              className
          )}
          {...props}
      >
        {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
        {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
        <div>{children}</div>
        {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
      </div>
  );
};
