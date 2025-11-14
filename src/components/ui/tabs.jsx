import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

export function Tabs({ className, ...props }) {
  return <TabsPrimitive.Root className={cn("w-full", className)} {...props} />;
}

export const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 p-1 text-neutral-400 border border-neutral-800",
      className
    )}
    {...props}
  />
);

export const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-800 data-[state=active]:text-white data-[state=active]:shadow",
      className
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-4 ring-offset-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      className
    )}
    {...props}
  />
);
