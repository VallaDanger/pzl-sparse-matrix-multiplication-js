import PuzzleSolution from './PuzzleSolution';
import SparseMatrix from './SparseMatrix';
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

console.log('matrices', matrixLeft, matrixRight);

console.log('brute-force solution', spm.bruteForceSolution());
console.log('better solution', spm.betterSolution());
console.log('optimal solution', spm.optimalSolution());

const sparseMatrix = new SparseMatrix(2, 2);

sparseMatrix.addCell(0, 0, 1);
sparseMatrix.addCell(0, 1, 2);
sparseMatrix.addCell(1, 0, 3);
sparseMatrix.addCell(1, 1, 4);

console.log('SparseMatrix', sparseMatrix.get());
console.log('SparseMatrix transposed', sparseMatrix.transpose().get());

export default {spm};
