import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "border border-gray-300 dark:border-zinc-700 rounded-md px-3 py-2 bg-white dark:bg-zinc-800 text-sm text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500",
        props.className
      )}
    />
  );
}
