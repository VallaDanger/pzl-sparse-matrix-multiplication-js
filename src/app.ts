import PuzzleSolution from './PuzzleSolution';
import SparseMatrixMultiplication from './SparseMatrixMultiplication';

const matrixLeft: number[][] = [
  [1, 0],
  [0, 4],
];

const matrixRight: number[][] = [
  [1, 2],
  [3, 4],
];

const spm: PuzzleSolution<number[][]> = new SparseMatrixMultiplication(
  matrixLeft,
  matrixRight
);

console.log(matrixLeft, matrixRight);

console.log(spm.bruteForceSolution());
console.log(spm.optimalSolution());

export default {spm};
