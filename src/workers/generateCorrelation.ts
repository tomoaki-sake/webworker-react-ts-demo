import { jStat } from "jstat";

// eslint-disable-next-line no-restricted-globals
self.onmessage = (e: MessageEvent<number[]>) => {
  const result = generateCorrelation(e.data[0], e.data[1]);
  // eslint-disable-next-line no-restricted-globals
  self.postMessage(result);
};

export const generateCorrelation = (
  rows: number,
  columns: number
): number[] => {
  const matrix = [...Array(rows)].map(() =>
    [...Array(columns)].map(() => Math.random() * 100)
  );
  const pairRows = repeatedCombination(matrix, 2);
  const results: number[] = [];
  for (let i = 0; i < pairRows.length; i++) {
    const pair = pairRows[i];
    results.push(jStat.corrcoeff(pair[0], pair[1]));
  }
  return results;
};

const repeatedCombination = (array: number[][], n: number): number[][][] => {
  return n === 1
    ? array.map((x) => [x])
    : array.flatMap((x, i) => {
        return repeatedCombination(array.slice(i), n - 1).map((y) =>
          [x].concat(y)
        );
      });
};
