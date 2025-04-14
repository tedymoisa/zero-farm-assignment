import { FunctionComponent, useCallback, useMemo } from "react";
import { useLocalStorageState } from "./hook/useLocalStorageState";
import { LOCAL_STORAGE_KEYS } from "./lib/constants";
import { Customer } from "./lib/types/customer";
import { SortableColumn, SortConfig, SortDirection } from "./lib/types/datatable";

type Props = {
  customers: Customer[];
};

const CustomerDatatable: FunctionComponent<Props> = ({ customers }) => {
  console.log("CustomerDatatable");

  const [filteringState, setFilteringState] = useLocalStorageState<string>(LOCAL_STORAGE_KEYS.FILTER, "");
  const [sortingState, setSortingState] = useLocalStorageState<SortConfig>(LOCAL_STORAGE_KEYS.SORT, {
    column: null,
    direction: "asc"
  });

  const filteredCustomers = useMemo(() => {
    const filter = filteringState.trim().toLowerCase();
    if (!filter) {
      return customers;
    }

    return customers.filter((customer) => {
      const nameMatch = customer.name.toLowerCase().includes(filter);
      const surnameMatch = customer.surname.toLowerCase().includes(filter);
      const cityMatch = customer.address.city.toLowerCase().includes(filter);

      return nameMatch || surnameMatch || cityMatch;
    });
  }, [customers, filteringState]);

  const sortedAndFilteredCustomers = useMemo(() => {
    const dataToSort = filteredCustomers;

    if (!sortingState.column) {
      return dataToSort;
    }

    const columnKey = sortingState.column;
    const sortableCustomers = [...dataToSort];

    sortableCustomers.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (columnKey === "city") {
        aValue = a.address.city.toLowerCase();
        bValue = b.address.city.toLowerCase();
      } else {
        aValue = a[columnKey].toLowerCase();
        bValue = b[columnKey].toLowerCase();
      }

      let comparison = 0;
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      return sortingState.direction === "asc" ? comparison : comparison * -1;
    });

    return sortableCustomers;
  }, [filteredCustomers, sortingState]);

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringState(event.target.value);
  };

  return (
    <div className="overflow-auto mt-6 flex-col gap-1 flex">
      <h1 className="text-3xl font-bold">Customer Datatable</h1>

      <div className="flex justify-end p-1">
        <input
          type="text"
          placeholder="Filter..."
          value={filteringState}
          onChange={handleFilterChange}
          className="border text-sm"
        />
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              <button
                type="button"
                onClick={() => handleSort("name")}
                className="flex items-center bg-transparent border-none p-0 font-inherit text-inherit cursor-pointer hover:text-blue-600 w-full text-left"
              >
                Name
              </button>
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              <button
                type="button"
                onClick={() => handleSort("surname")}
                className="flex items-center bg-transparent border-none p-0 font-inherit text-inherit cursor-pointer hover:text-blue-600 w-full text-left"
              >
                Surname
              </button>
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              <button
                type="button"
                onClick={() => handleSort("city")}
                className="flex items-center bg-transparent border-none p-0 font-inherit text-inherit cursor-pointer hover:text-blue-600 w-full text-left"
              >
                City
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedAndFilteredCustomers.map((customer) => (
            <tr key={customer.uuid}>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.surname}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCustomers.length === 0 && filteringState && (
        <p className="m-2 text-gray-600">No customers match your filter.</p>
      )}
    </div>
  );
};

export default CustomerDatatable;
