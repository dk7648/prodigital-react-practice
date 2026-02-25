import { useState } from 'react';

type CounterProps = {
  initialCount: number;
};

export default function Counter({ initialCount }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const onClick = () => {
    setCount(v => v + 1);
  };
  return (
    <div>
      <h1>카운터</h1>
      <button onClick={onClick}>{count}</button>
    </div>
  );
}
