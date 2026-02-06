import React from "react";
import { OrderStatus } from "@/types";

interface StatusBadgeProps {
    status: OrderStatus | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let colorClass = "bg-muted text-muted-foreground";

    switch (status) {
        case OrderStatus.PENDING:
            colorClass = "bg-feedback-warning text-feedback-warning-text border-feedback-warning";
            break;
        case OrderStatus.PAID:
            colorClass = "bg-feedback-success text-feedback-success-text border-feedback-success";
            break;
        case OrderStatus.SHIPPED:
            colorClass = "bg-feedback-info text-feedback-info-text border-feedback-info";
            break;
        case OrderStatus.DELIVERED:
            colorClass = "bg-feedback-success text-feedback-success-text border-feedback-success"; // Teal mapped to success or I could make 'feedback-teal'
            break;
        case OrderStatus.CANCELLED:
            colorClass = "bg-feedback-error text-feedback-error-text border-feedback-error";
            break;
        case "Ativo":
            colorClass = "bg-feedback-success text-feedback-success-text";
            break;
        case "Inativo":
            colorClass = "bg-feedback-error text-feedback-error-text";
            break;
    }

    return (
        <span
            className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${colorClass}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
