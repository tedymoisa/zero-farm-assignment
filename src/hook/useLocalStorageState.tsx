import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorageState = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    if (item) {
      const parsedItem = JSON.parse(item) as T;

      return parsedItem !== null ? parsedItem : initialValue;
    }

    return initialValue;
  });

  useEffect(() => {
    const valueToStore = storedValue;

    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
