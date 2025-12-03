
import React, { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes } from 'react';

// --- CARD ---
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-xl border border-stone-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 border-b border-stone-100 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-bold text-stone-800 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

// --- BUTTON ---
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200",
    outline: "border border-stone-300 bg-white hover:bg-stone-50 text-stone-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "hover:bg-stone-100 text-stone-600",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- INPUT ---
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ className = '', icon, ...props }) => (
  <div className="relative w-full">
    {icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
        {icon}
      </div>
    )}
    <input 
      className={`
        w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white 
        file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50
        ${icon ? 'pl-10' : ''} ${className}
      `} 
      {...props} 
    />
  </div>
);

// --- BADGE ---
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const styles = {
    default: "bg-stone-100 text-stone-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};
