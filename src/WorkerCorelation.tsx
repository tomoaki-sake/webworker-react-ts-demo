import { useMemo, useState } from "react";

export type Props = {
  rows: number;
  columns: number;
};
export const WorkerCorelation: React.FC<Props> = ({ rows, columns }) => {
  const [correlation, setCorrelation] = useState<number[]>([]);
  const [workerStatus, setWorkerStatus] = useState<string>();

  const worker = useMemo(
    () =>
      new Worker(new URL("./workers/generateCorrelation.ts", import.meta.url)),
    []
  );

  const startWorker = () => {
    worker.postMessage([rows, columns]);
    setWorkerStatus("calculate: Start");
  };

  const clear = () => {
    setCorrelation([]);
    setWorkerStatus("");
  };

  if (worker) {
    worker.onmessage = (e: MessageEvent<number[]>) => {
      setCorrelation(e.data);
      setWorkerStatus("calculate: Done");
    };
  }

  return (
    <div style={{ marginTop: "30px", width: "50%" }}>
      <h2>Worker Calculator</h2>
      {workerStatus && <h2>{workerStatus}</h2>}
      {!!correlation.length ? (
        <>
          <button onClick={clear}>clear</button>
          <h2>Correlation Result {correlation.length}</h2>
          {correlation.slice(0, 10).map((corr) => (
            <h4>{corr.toPrecision(3)}</h4>
          ))}
        </>
      ) : (
        <button onClick={startWorker}>start</button>
      )}
    </div>
  );
};
