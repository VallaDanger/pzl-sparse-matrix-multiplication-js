export default class SparseMatrix {
  private rows: number;
  private cols: number;

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
