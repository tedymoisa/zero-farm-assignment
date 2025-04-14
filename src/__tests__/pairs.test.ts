describe("pairs function", () => {
  // Casi base
  test("dovrebbe restituire un array vuoto per un input vuoto", () => {
    expect(pairs([])).toEqual([]);
  });

  test("dovrebbe restituire l'elemento singolo", () => {
    expect(pairs(["John"])).toEqual(["John"]);
  });

  // Array con n pari
  describe("con input di lunghezza pari", () => {
    const arr = ["John", "Mary", "Paul", "Joe"];
    let result: (string[] | string)[] = [];

    beforeAll(() => {
      result = pairs(arr);
    });

    test("dovrebbe restituire n/2 coppie", () => {
      expect(result).toHaveLength(arr.length / 2);
    });
  });

  // Array con n dispari
  describe("con input di lunghezza dispari", () => {
    const arr = ["John", "Mary", "Paul", "Joe", "David"];
    let result: (string[] | string)[] = [];

    beforeAll(() => {
      result = pairs(arr);
    });

    test("dovrebbe restituire (n-1)/2 coppie e un elemento singolo", () => {
      expect(result).toHaveLength((arr.length - 1) / 2 + 1);
    });
  });
});

/*
Dato un array ad una dimensione (es: ["John", "Mary", "Paul", "Joe", …]) di n elementi, scrivere
una funzione in js/ts che restituisca delle coppie randomizzate di elementi
dell’array. Ciascun elemento dell’array può comparire in una sola coppia. Se n è dispari, il
risultato deve riportare le (n-1)/2 coppie + l’elemento non accoppiato.
*/
function pairs(arr: string[]): (string[] | string)[] {
  if (arr.length === 0) {
    return [];
  }

  const indices = new Set<number>();
  for (let i = 0; i < arr.length; i++) {
    indices.add(i);
  }
  const result = [];

  // Finche' si puo' formare almeno una coppia
  while (indices.size >= 2) {
    const index1 = removeIndex(indices);
    const index2 = removeIndex(indices);

    result.push([arr[index1], arr[index2]]);
  }

  // Se e' rimasto un elemento
  if (indices.size === 1) {
    const lastIndex = Array.from(indices)[0];

    result.push(arr[lastIndex]);
  }

  return result;
}

// Scelgo un indice random, lo cancello dal Set originale e poi lo ritorno
function removeIndex(indices: Set<number>) {
  const randomIndex = Math.floor(Math.random() * indices.size);
  const index = Array.from(indices)[randomIndex];

  indices.delete(index);

  return index;
}
