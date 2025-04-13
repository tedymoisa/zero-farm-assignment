describe("areAnagrams", () => {
  // true
  test("dovrebbe ritornare true per anagrammi validi (lowercase)", () => {
    expect(areAnagrams("aabb", "baba")).toBe(true);
  });

  test("dovrebbe ritornare true per anagrammi validi (mixed case)", () => {
    expect(areAnagrams("Aabb", "Baba")).toBe(true);
  });

  // false
  test("dovrebbe ritornare false per stringhe di lunghezza diversa", () => {
    expect(areAnagrams("aabb", "aab")).toBe(false);
  });

  test("dovrebbe ritornare false per stringhe con caratteri diversi", () => {
    expect(areAnagrams("aabb", "ccdd")).toBe(false);
  });

  test("dovrebbe ritornare false per stringhe lunghezze diverse", () => {
    expect(areAnagrams("aabb", "aabbb")).toBe(false);
  });

  test("dovrebbe ritornare false per parole identiche (lowercase)", () => {
    expect(areAnagrams("aabb", "aabb")).toBe(false);
  });

  test("dovrebbe ritornare false per parole identiche (mixed case)", () => {
    expect(areAnagrams("Aabb", "aabb")).toBe(false);
  });

  test("dovrebbe ritornare false per parole identiche (uppercase)", () => {
    expect(areAnagrams("AABB", "AABB")).toBe(false);
  });

  test("dovrebbe ritornare false per stringhe vuote (sono identiche)", () => {
    expect(areAnagrams("", "")).toBe(false);
  });
});

function areAnagrams(str1: string, str2: string): boolean {
  const lowerStr1 = str1.trim().toLowerCase();
  const lowerStr2 = str2.trim().toLowerCase();

  if (lowerStr1 === lowerStr2) {
    return false;
  }

  if (lowerStr1.length !== lowerStr2.length) {
    return false;
  }

  const sortedStr1 = lowerStr1.split("").sort().join("");
  const sortedStr2 = lowerStr2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
}
