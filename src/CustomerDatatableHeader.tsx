import { Dispatch, FunctionComponent, SetStateAction, useCallback } from "react";
import { SortableColumn, SortConfig, SortDirection } from "./lib/types/datatable";

type Props = {
  setSortingState: Dispatch<SetStateAction<SortConfig>>;
};

const CustomerDatatableHeader: FunctionComponent<Props> = ({ setSortingState }) => {
  const handleSort = useCallback(
    (columnKey: SortableColumn) => {
      setSortingState((currentConfig) => {
        let direction: SortDirection = "asc";

        if (currentConfig.column === columnKey && currentConfig.direction === "asc") {
          direction = "desc";
        }

        return { column: columnKey, direction };
      });
    },
    [setSortingState]
  );

  return (
    <thead className="bg-gray-100">
      <tr>
        <th>{""}</th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
          <button type="button" onClick={() => handleSort("name")} className="cursor-pointer">
            Name
          </button>
        </th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
          <button type="button" onClick={() => handleSort("surname")} className="cursor-pointer">
            Surname
          </button>
        </th>
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
          <button type="button" onClick={() => handleSort("city")} className="cursor-pointer">
            City
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default CustomerDatatableHeader;
