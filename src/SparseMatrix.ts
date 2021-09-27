export default class SparseMatrix {
  private rows: number;
  private cols: number;
  /**
   * this implementation uses a map of maps to store:
   * row to columns & colum to rows relations.
   * It saves space by not storing cells with value 0.
   * Acces time is always O(1)
   */
  private rowEntries: Map<number, Map<number, number>>;
  private colEntries: Map<number, Map<number, number>>;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.rowEntries = new Map<number, Map<number, number>>();
    this.cols = cols;
    this.colEntries = new Map<number, Map<number, number>>();
  }

  addCell(row: number, col: number, value: number): void {
    if (value === 0) {
      return;
    }

    this.rowEntries.set(
      row,
      this.rowEntries.get(row) || new Map<number, number>()
    );
    this.rowEntries.get(row)?.set(col, value);

    this.colEntries.set(
      col,
      this.colEntries.get(col) || new Map<number, number>()
    );
    this.colEntries.get(col)?.set(row, value);
  }

  multiply(matrix: SparseMatrix): SparseMatrix {
    const solution = new SparseMatrix(this.rows, matrix.cols);
    for (const [row, cols] of this.rowEntries) {
      for (const [col, rows] of matrix.colEntries) {
        let sum = 0;
        for (const [index, value] of cols) {
          sum += value * (rows.get(index) || 0);
        }
        solution.addCell(row, col, sum);
      }
    }
    return solution;
  }

  transpose(): SparseMatrix {
    // with this implementation, transpose is just a swap away in O(1)
    let temp: Map<number, Map<number, number>> | number = this.colEntries;
    this.colEntries = this.rowEntries;
    this.rowEntries = temp as Map<number, Map<number, number>>;
    temp = this.cols;
    this.cols = this.rows;
    this.rows = temp as number;
    return this;
  }

  get(): number[][] {
    const data: Array<Array<number>> = [];
    for (const [row, cols] of this.rowEntries) {
      for (const [col, value] of cols) {
        data.push(Array.of(row, col, value));
      }
    }
    return data;
  }
}
