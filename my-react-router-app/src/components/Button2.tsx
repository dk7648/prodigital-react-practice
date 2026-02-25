import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

interface Button2Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  //   disabled?: boolean;
  //   children: ReactNode;
  //   onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button2({
  label,
  disabled = false,
  children,
  onClick,
  ...props
}: Button2Props) {
  return (
    <button onClick={onClick} disabled={disabled} {...props}>
      {label} {children}
    </button>
  );
}
