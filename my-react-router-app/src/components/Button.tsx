import React from 'react';

interface ButtonProps {
  link: string;
  title: string;
  color: string;
}
export default function Button({ link, title, color }: ButtonProps) {
  return (
    <>
      <a
        href={link}
        style={{ padding: 10, backgroundColor: color, color: 'white' }}
      >
        {title}
      </a>
    </>
  );
}
