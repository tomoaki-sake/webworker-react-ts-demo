import { WorkerCorelation } from "WorkerCorelation";
import { Counter } from "Counter";
import "./App.css";
import { NormalCorelation } from "NormalCorrelation";

const ROWS = 1000;
const COLUMNS = 1000;

// const runPython = async (code: string) => {
//   const pyodide = await (window as any).loadPyodide({
//     indexURL: "https://cdn.jsdelivr.net/pyodide/v0.22.1/full/",
//   });
//   return await pyodide.runPythonAsync(code);
// };

function App() {
  // useEffect(() => {
  //   const run = async () => {
  //     const scriptText = await (
  //       await fetch(new URL("./python/correlation.py", import.meta.url))
  //     ).text();
  //     const arr = [...Array(10)].map(() => Math.random() * 10);
  //     console.log(arr);
  //     console.log(`
  //     ${scriptText}func([${arr}])
  //     `);
  //     return await runPython(`
  //     ${scriptText}func([${arr}])
  //     `);
  //   };
  //   run().then((res) => console.log(res));
  // }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebWorker Demo</h1>
        <Counter />
      </header>
      <body className="App-body">
        <NormalCorelation rows={ROWS} columns={COLUMNS} />
        <div style={{ border: "sold 1px" }}></div>
        <WorkerCorelation rows={ROWS} columns={COLUMNS} />
      </body>
    </div>
  );
}

export default App;
