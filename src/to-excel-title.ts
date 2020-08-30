import { A_CODE, Z_CODE } from "./constants";

const letters: string[] = [];
const cache = new Map();
let aLen = 0;

const toLet = (num: number): string => letters[num - 1];

const setupLetters = () => {
  for (let i = A_CODE; i <= Z_CODE; i++) {
    letters.push(String.fromCharCode(i));
  }

  letters[-1] = "";

  aLen = letters.length;
};

setupLetters();

export const convertToTitle = (n: number): string => {
  if (cache.has(n)) return cache.get(n);

  const finalRes = [];
  let curr = n;

  for (;;) {
    let localRes = "";
    let counter = 0;

    while (curr > 0) {
      if (aLen >= curr) {
        localRes += toLet(curr);
        break;
      } else {
        counter++;
        curr -= aLen;
      }
    }

    finalRes.push(localRes);

    if (counter === 0) break;

    curr = counter;
  }

  const res = finalRes.reverse().join("");

  cache.set(n, res);

  return res;
};
