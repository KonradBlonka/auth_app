// style for header in login-form

import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Roboto({
    subsets: ["latin"],
    weight: ["700"]
  });

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center">
            <h1 className={cn("text-3xl font-semibold", font.className)}>
                Nazwa Firmy
            </h1>
            <p className="text-sm">
                {label}
            </p>
        </div>
    )

}

