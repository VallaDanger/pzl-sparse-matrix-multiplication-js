import PuzzleSolution from './PuzzleSolution';
import SparseMatrix from './SparseMatrix';

export default class SparseMatrixMultiplication
  implements PuzzleSolution<number[][]>
{
  private matrixLeft: Array<Array<number>>;
  private matrixRight: Array<Array<number>>;

  private sizeOfRows: number;
  private sizeOfCols: number;

  constructor(matrixLeft: number[][], matrixRight: number[][]) {
    // left matrix must be the sparse one
    this.matrixLeft = matrixLeft;
    this.matrixRight = matrixRight;

    this.sizeOfCols = this.matrixLeft[0].length;
    this.sizeOfRows = this.matrixRight.length;

    if (this.sizeOfCols !== this.sizeOfRows) {
      throw new Error('invalid matrix dimensions');
    }
  }

  bruteForceSolution(): number[][] {
    const solution: number[][] = [];
    for (let row = 0; row < this.sizeOfRows; row++) {
      for (let col = 0; col < this.sizeOfCols; col++) {
        let value = 0;
        for (let index = 0; index < this.sizeOfRows; index++) {
          value += this.matrixLeft[row][index] * this.matrixRight[index][col];
        }
        solution[row] = solution[row] || [];
        solution[row].push(value);
      }
    }
    return solution;
  }

  betterSolution(): number[][] {
    // time complexity: avg O(n^2) | worst case: O(n^3)
    const solution: number[][] = [];
    solution.length = this.sizeOfRows;
    for (let row = 0; row < this.sizeOfRows; row++) {
      solution[row] = [];
      solution[row].length = this.sizeOfCols;
      solution[row].fill(0);
      for (let index = 0; index < this.sizeOfRows; index++) {
        // if position [row][index] is 0, then
        // every multiplciatio will yield 0.
        // Therefore, inner loop can be avoided,
        // effectively reducing the complexity to O(n^2)
        if (this.matrixLeft[row][index] > 0) {
          // multiply matrixLeft[row][index]
          // into every column in matrixRight
          const multiplier = this.matrixLeft[row][index];
          this.multiply(solution, row, index, multiplier);
        }
      }
    }
    return solution;
  }

  optimalSolution(): number[][] {
    // time complexity: avg O(n^2) | worst case: O(n^3)
    // saves space by not using space for 0's
    // this is the only way to process huge matrices
    const matrixLeft = this.toSparseMatrix(this.matrixLeft);
    const matrixRight = this.toSparseMatrix(this.matrixRight);
    return matrixLeft.multiply(matrixRight).get();
  }

  private toSparseMatrix(matrix: number[][]): SparseMatrix {
    const sparseMatrix = new SparseMatrix(matrix.length, matrix[0].length);
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        sparseMatrix.addCell(row, col, matrix[row][col]);
      }
    }
    return sparseMatrix;
  }

  private multiply(
    solution: number[][],
    row: number,
    index: number,
    multiplier: number
  ): void {
    for (let col = 0; col < this.sizeOfCols; col++) {
      solution[row][col] += multiplier * this.matrixRight[index][col];
    }
  }
}
