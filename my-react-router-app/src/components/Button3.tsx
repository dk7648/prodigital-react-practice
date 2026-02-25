import Button2 from './Button2';

interface Button3Props {
  title: string;
}

export default function Button3({ title }: Button3Props) {
  return (
    <div>
      {title}
      <Button2 />
    </div>
  );
}
