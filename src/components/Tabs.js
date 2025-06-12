
// components/Tabs.js
import * as TabsPrimitive from "@radix-ui/react-tabs";
import clsx from "clsx";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }) => (
    <TabsPrimitive.List
        className={clsx(
            "relative inline-flex items-center justify-center rounded-xl bg-gray-100 p-1",
            className
        )}
        {...props}
    />
);
export const TabsTrigger = ({ className, ...props }) => (
    <TabsPrimitive.Trigger
        className={clsx(
            "relative px-4 py-2 text-sm font-medium text-gray-600 rounded-xl transition-colors",
            "data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200",
            className
        )}
        {...props}
    />
);
export const TabsContent = ({ className, ...props }) => (
    <TabsPrimitive.Content
        className={clsx("mt-4 animate-fade-in data-[state=inactive]:hidden", className)}
        {...props}
    />
);