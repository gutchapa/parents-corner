
import React, { ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

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

// --- LABEL ---
export const Label: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`block text-sm font-medium text-stone-700 mb-1 ${className}`} {...props}>
    {children}
  </div>
);

// --- INPUT & SELECT ---
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', icon, label, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
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
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ className = '', label, children, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
    <select 
      className={`
        w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ className = '', label, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
    <textarea 
      className={`
        w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white 
        placeholder:text-stone-400 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50
        min-h-[80px] ${className}
      `} 
      {...props} 
    />
  </div>
);

// --- BADGE ---
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const styles = {
    default: "bg-stone-100 text-stone-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-orange-100 text-orange-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// --- MODAL ---
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
         <div className="flex items-center justify-between p-4 border-b border-stone-100">
            <h3 className="font-bold text-lg text-stone-800">{title}</h3>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600">✕</button>
         </div>
         <div className="p-4">
           {children}
         </div>
      </div>
    </div>
  );
};

// --- TABS ---
export const Tabs: React.FC<{ value: string; onValueChange: (val: string) => void; children: ReactNode }> = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

export const TabsList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex gap-2 border-b border-stone-200 mb-6">{children}</div>;
};

export const TabsTrigger: React.FC<{ value: string; activeValue?: string; onClick?: () => void; children: ReactNode }> = ({ value, activeValue, onClick, children }) => {
  const isActive = value === activeValue;
  return (
    <button 
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium border-b-2 transition-colors
        ${isActive ? 'border-brand-600 text-brand-600' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300'}
      `}
    >
      {children}
    </button>
  );
};

// --- SWITCH ---
export const Switch: React.FC<{ checked: boolean; onCheckedChange: (checked: boolean) => void; label?: string }> = ({ checked, onCheckedChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-brand-600' : 'bg-stone-300'}`}></div>
        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
      {label && <span className="text-sm text-stone-700 font-medium">{label}</span>}
    </label>
  );
};
