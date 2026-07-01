import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
   variant?: Variant
} & ComponentProps<"button">

type Variant = "primary" | "secondary" | "delete"

function getVariantStyle (variant: Variant){
   switch (variant){
      case "primary":
         return "bg-violet-600 hover:bg-purple-600 text-green-500"
      case "secondary":
         return "bg-zinc-700 hover:bg-zinc-500 text-gray-400"
      case "delete":
         return "bg-red-600 hover:bg-red-500 text-orange-200"
      default:
         return "bg-violet-600 px-2 py-1 hover:bg-purple-600 text-green-500";
   }
}

export default function Button({variant = "primary", className, ...props} : ButtonProps){
    return(
        <button
            {...props}
            className={twMerge(
                "transition-colors rounded px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
                getVariantStyle(variant),
                className,
            )} 
        >
        </button>
    )
}