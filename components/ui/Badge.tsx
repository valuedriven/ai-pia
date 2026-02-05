import React from 'react';

interface BadgeProps {
  label: string;
  type: 'status' | 'payment';
}

export const Badge: React.FC<BadgeProps> = ({ label, type }) => {
  let colorClass = "bg-gray-100 text-gray-800";

  if (type === 'status') {
    switch (label) {
      case 'Novo': colorClass = "bg-blue-100 text-blue-800"; break;
      case 'Pago': colorClass = "bg-green-100 text-green-800"; break;
      case 'Preparação': colorClass = "bg-yellow-100 text-yellow-800"; break;
      case 'Faturado': colorClass = "bg-purple-100 text-purple-800"; break;
      case 'Despachado': colorClass = "bg-indigo-100 text-indigo-800"; break;
      case 'Entregue': colorClass = "bg-green-100 text-green-800"; break;
      case 'Cancelado': colorClass = "bg-red-100 text-red-800"; break;
    }
  } else if (type === 'payment') {
    switch (label) {
      case 'Pendente': colorClass = "bg-yellow-100 text-yellow-800"; break;
      case 'Pago': colorClass = "bg-green-100 text-green-800"; break;
      case 'Reembolsado': colorClass = "bg-gray-100 text-gray-600"; break;
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
};
