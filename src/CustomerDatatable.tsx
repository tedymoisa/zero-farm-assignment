import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { customersSample, LOCAL_STORAGE_KEYS } from "./lib/constants";
import { Customer } from "./lib/types/customer";
import { useLocalStorageState } from "./hook/useLocalStorageState";
import { SortableColumn, SortConfig, SortDirection } from "./lib/types/datatable";

type Props = {};

const CustomerDatatable: FunctionComponent<Props> = () => {
  console.log("CustomerDatatable");
  const [customers, setCustomers] = useState<Customer[]>(customersSample);

  const [sortingState, setSortingState] = useLocalStorageState<SortConfig>(LOCAL_STORAGE_KEYS.SORT, {
    column: null,
    direction: "asc"
  });

  const sortedCustomers = useMemo(() => {
    if (!sortingState.column) {
      return customers;
    }

    const sortableCustomers = [...customers];

    sortableCustomers.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortingState.column === "city") {
        aValue = a.address.city.toLocaleLowerCase();
        bValue = b.address.city.toLocaleLowerCase();
      } else {
        aValue = a[sortingState.column as keyof Omit<Customer, "address">].toLocaleLowerCase();
        bValue = b[sortingState.column as keyof Omit<Customer, "address">].toLocaleLowerCase();
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
  }, [customers, sortingState]);

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
    <div className="overflow-x-auto mt-6">
      <h1 className="text-3xl font-bold">Customer Datatable</h1>

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
          {sortedCustomers.map((customer) => (
            <tr key={customer.uuid}>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.name}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.surname}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{customer.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerDatatable;
