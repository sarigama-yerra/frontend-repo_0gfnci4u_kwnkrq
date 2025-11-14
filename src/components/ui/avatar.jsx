import * as React from "react";
import { cn } from "../../lib/utils";

export function Avatar({ className, src, alt, fallback, ...props }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div
      className={cn(
        "relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-neutral-800 bg-neutral-800",
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn("h-full w-full object-cover", loaded ? "opacity-100" : "opacity-0", "transition-opacity")}
          onLoad={() => setLoaded(true)}
        />
      ) : null}
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center text-neutral-400 text-xs">
          {fallback || "?"}
        </div>
      )}
    </div>
  );
}
