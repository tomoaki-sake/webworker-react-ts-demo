import { useEffect, useMemo, useState } from "react";
import { Props } from "WorkerCorelation";
import { generateCorrelation } from "workers/generateCorrelation";

export const NormalCorelation: React.FC<Props> = ({ rows, columns }) => {
  const [correlation, setCorrelation] = useState<number[]>([]);
  const [status, setStatus] = useState<string>();
  const [start, setStart] = useState<boolean>(false);

  const startCalcutate = () => {
    setStatus("calculate: Start");
    setStart(true);
  };

  const clear = () => {
    setCorrelation([]);
    setStatus("");
  };

  useEffect(() => {
    if (!start) return;
    const corr = generateCorrelation(rows, columns);
    setCorrelation(corr);
    setStatus("calculate: Done");
  }, [start]);

  return (
    <div style={{ marginTop: "30px", width: "50%" }}>
      <h2>Normal Calculator</h2>
      {status && <h2>{status}</h2>}
      {!!correlation.length ? (
        <>
          <button onClick={clear}>clear</button>
          <h2>Correlation Result {correlation.length}</h2>
          {correlation.slice(0, 10).map((corr) => (
            <h4>{corr.toPrecision(3)}</h4>
          ))}
        </>
      ) : (
        <button onClick={startCalcutate}>start</button>
      )}
    </div>
  );
};
