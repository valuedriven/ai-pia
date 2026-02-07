import React from "react";
import { OrderStatus } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border transition-colors",
    {
        variants: {
            variant: {
                pending: "bg-feedback-warning text-feedback-warning-text border-feedback-warning",
                success: "bg-feedback-success text-feedback-success-text border-feedback-success",
                info: "bg-feedback-info text-feedback-info-text border-feedback-info",
                error: "bg-feedback-error text-feedback-error-text border-feedback-error",
                muted: "bg-muted text-muted-foreground border-border",
            },
        },
        defaultVariants: {
            variant: "muted",
        },
    }
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
    status: OrderStatus | string;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    let variant: VariantProps<typeof badgeVariants>["variant"] = "muted";

    switch (status) {
        case OrderStatus.PENDING:
            variant = "pending";
            break;
        case OrderStatus.PAID:
        case OrderStatus.DELIVERED:
        case "Ativo":
            variant = "success";
            break;
        case OrderStatus.SHIPPED:
            variant = "info";
            break;
        case OrderStatus.CANCELLED:
        case "Inativo":
            variant = "error";
            break;
    }

    return (
        <span className={cn(badgeVariants({ variant }), className)}>
            {status}
        </span>
    );
};

export default StatusBadge;
