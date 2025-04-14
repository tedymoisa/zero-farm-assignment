import { Customer } from "./types/customer";

export const customersSample: Customer[] = [
  {
    uuid: "uuid-1",
    name: "Mario",
    surname: "Rossi",
    address: { city: "Roma", street: "Via del Corso 1" }
  },
  {
    uuid: "uuid-2",
    name: "Luigi",
    surname: "Verdi",
    address: { city: "Milano", street: "Piazza Duomo 5" }
  },
  {
    uuid: "uuid-3",
    name: "Anna",
    surname: "Bianchi",
    address: { city: "Napoli", street: "Via Toledo 100" }
  },
  {
    uuid: "uuid-4",
    name: "Giovanni",
    surname: "Gialli",
    address: { city: "Firenze", street: "Ponte Vecchio 2" }
  }
];

export enum LOCAL_STORAGE_KEYS {
  SORT = "sortingState",
  FILTER = "filteringState",
  SELECT = "selectionState"
}
