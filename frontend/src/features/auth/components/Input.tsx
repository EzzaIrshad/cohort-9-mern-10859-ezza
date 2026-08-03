import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { MdError } from "react-icons/md";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: ReactNode;
    iconBg: string;
    error?: string;
    trailing?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, iconBg, error, trailing, className, ...props }, ref) => {
        return (
            <div>
                <div
                    className="group relative flex items-center gap-3 rounded-xl bg-secondary px-3 py-3 transition input-shadow">
                    <span
                        className="absolute -left-2 -top-1 grid size-11 2xl:size-12 place-items-center rounded-full icon-container-shadow"
                        style={{ background: iconBg }}
                        aria-hidden
                    >
                        {icon}
                    </span>
                    <input
                        ref={ref}
                        {...props}
                        className={`ml-9 min-w-0 flex-1 bg-transparent text-xs 2xl:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none ${className ?? ""}`}
                    />
                    {trailing}
                </div>
                {error && (
                    <div className="flex items-center gap-2 mt-1.5 text-destructive">
                        <MdError size={16}/>
                        <p className="text-xs">
                            {error}
                        </p>
                    </div>
                )}
            </div>
        );
    });

Input.displayName = "Input";

export default Input