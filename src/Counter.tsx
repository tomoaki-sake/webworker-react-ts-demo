import { useState } from "react";

export const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount((count) => count + 1)}>count up!</button>
    </div>
  );
};
