test("adds two numbers correctly", () => {
  expect(sum(2, 3)).toBe(5);
});

function sum(a: number, b: number): number {
  return a + b;
}
