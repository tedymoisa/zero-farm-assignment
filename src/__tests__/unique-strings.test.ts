describe("findfindUniqueStrings", () => {
  test("dovrebbe trovare elementi esclusivi in entrambi gli array", () => {
    const arr1: string[] = ["ciccio", "pluto"];
    const arr2: string[] = ["papperino", "pippo", "pluto"];
    const result = findUniqueStrings(arr1, arr2);

    expect(result).toHaveLength(3);

    expect(result).toContain("ciccio");
    expect(result).toContain("papperino");
    expect(result).toContain("pippo");

    expect(result).not.toContain("pluto");
  });

  test("dovrebbe restituire un array vuoto se gli array sono identici", () => {
    const arr1: string[] = ["ciccio", "pluto"];
    const arr2: string[] = ["ciccio", "pluto"];

    expect(findUniqueStrings(arr1, arr2)).toHaveLength(0);
  });

  test("dovrebbe gestire correttamente array vuoti", () => {
    const arr1: string[] = [];
    const arr2: string[] = ["ciccio", "pluto"];

    expect(findUniqueStrings(arr1, arr2)).toEqual(["ciccio", "pluto"]);
  });
});

/*
Dati due array di stringhe (non necessariamente della stessa lunghezza), 
scrivere una funzione in js/ts che restituisca un array con tutte le stringhe presenti
esclusivamente solo in uno dei due array
*/
function findUniqueStrings(arr1: string[], arr2: string[]): string[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result: string[] = [];

  // Trovo le stringhe che sono in arr1 ma non in arr2
  for (const item of set1) {
    if (!set2.has(item)) {
      result.push(item);
    }
  }

  // Trovo le stringhe che sono in arr2 ma non in arr1
  for (const item of set2) {
    if (!set1.has(item)) {
      result.push(item);
    }
  }

  return result;
}
