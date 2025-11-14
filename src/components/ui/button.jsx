import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-800 text-white hover:bg-neutral-700 shadow-sm",
        secondary:
          "bg-neutral-700 text-white hover:bg-neutral-600 shadow-sm",
        outline:
          "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-white",
        ghost: "hover:bg-neutral-800 text-neutral-200",
        link: "underline-offset-4 hover:underline text-blue-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, asChild, ...props }) {
  const Component = asChild ? "span" : "button";
  return (
    <Component className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
