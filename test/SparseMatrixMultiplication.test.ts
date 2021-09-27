import {expect} from 'chai';
import PuzzleSolution from '../src/PuzzleSolution';
import SparseMatrixMultiplication from '../src/SparseMatrixMultiplication';

describe('SparseMatrixMultiplication', () => {
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

  const solution = [
    [1, 2],
    [12, 16],
  ];

  const optimalSolution = [
    [0, 0, 1],
    [0, 1, 2],
    [1, 0, 12],
    [1, 1, 16],
  ];

  it('brute-force solution', () => {
    expect(spm.bruteForceSolution()).to.eql(solution);
  });
  it('better solution', () => {
    expect(spm.betterSolution()).to.eql(solution);
  });
  it('bute-force & better solutions are equal', () => {
    expect(spm.betterSolution()).to.eql(spm.betterSolution());
  });
  it('optimal solution', () => {
    expect(spm.optimalSolution()).to.eql(optimalSolution);
  });
  it('optimal solution yields correct values', () => {
    const optimalSolution = spm.optimalSolution();
    const values = [];
    for (const items of optimalSolution) {
      values.push(items.pop());
    }
    expect(values).to.have.all.members(solution.flat());
  });
});
