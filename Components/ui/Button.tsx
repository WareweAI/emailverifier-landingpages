import {
    cloneElement,
    forwardRef,
    isValidElement,
    type ReactElement,
} from "react";


const cn = (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(" ");


export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "default" | "ghost" | "outline";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

const baseButtonClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

const sizeClasses: Record<ButtonSize, string> = {
    xs: "text-sm px-3 py-1.5",
    sm: "text-sm px-2.5 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-6 lg:px-16 py-3",
};

const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
};


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            asChild = false,
            size = "sm",
            variant = "default",
            children,
            ...props
        },
        ref
    ) => {
        const classes = cn(
            baseButtonClasses,
            sizeClasses[size],
            variantClasses[variant],
            className
        );

    
        if (asChild && isValidElement(children)) {
            const childElement = children as ReactElement<{ className?: string }>;
            return cloneElement(childElement, {
                className: cn(classes, childElement.props.className),
                ...props,
            });
        }

        return (
            <button ref={ref} className={classes} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
