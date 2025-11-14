import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm shadow-lg shadow-black/20",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("p-4 border-b border-neutral-800", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold text-neutral-100", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-neutral-400", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("p-4 border-t border-neutral-800", className)} {...props} />;
}
