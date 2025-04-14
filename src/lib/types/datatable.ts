export type SortableColumn = "name" | "surname" | "city";

export type SortDirection = "asc" | "desc";

export type SortConfig = {
  column: SortableColumn | null;
  direction: SortDirection;
};
