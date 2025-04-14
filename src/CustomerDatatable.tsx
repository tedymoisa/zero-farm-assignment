import { FunctionComponent, memo, useCallback, useMemo, useState } from "react";
import CustomerDatatableBody from "./CustomerDatatableBody";
import CustomerDatatableFooter from "./CustomerDatatableFooter";
import CustomerDatatableHeader from "./CustomerDatatableHeader";
import { useLocalStorageState } from "./hook/useLocalStorageState";
import { LOCAL_STORAGE_KEYS } from "./lib/constants";
import { Customer } from "./lib/types/customer";
import { SortConfig } from "./lib/types/datatable";

type Props = {
  customers: Customer[];
};

const CustomerDatatable: FunctionComponent<Props> = ({ customers: customersSample }) => {
  console.log("CustomerDatatable");
  const [customers, setCustomers] = useState<Customer[]>(customersSample);

  const [filteringState, setFilteringState] = useLocalStorageState<string>(LOCAL_STORAGE_KEYS.FILTER, "");
  const [sortingState, setSortingState] = useLocalStorageState<SortConfig>(LOCAL_STORAGE_KEYS.SORT, {
    column: null,
    direction: "asc"
  });
  const [selectedCustomer, setSelectedCustomer] = useLocalStorageState<Customer | null>(
    LOCAL_STORAGE_KEYS.SELECT,
    null
  );

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringState(event.target.value);
  };

  const handleDeleteAllCustomers = useCallback(() => {
    setCustomers([]);
  }, []);

  const handleModifyCustomers = useCallback((customer: Customer) => {
    setCustomers((prev) => {
      const existingCustomer = prev.some((c) => c.uuid === customer.uuid);

      if (existingCustomer) {
        return prev.map((c) => (c.uuid === customer.uuid ? customer : c));
      } else {
        return [...prev, customer];
      }
    });
  }, []);

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
        <CustomerDatatableHeader setSortingState={setSortingState} />
        <CustomerDatatableBody
          sortedAndFilteredCustomers={sortedAndFilteredCustomers}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
        <CustomerDatatableFooter
          selectedCustomer={selectedCustomer}
          modifyCustomers={handleModifyCustomers}
          deleteAllCustomers={handleDeleteAllCustomers}
        />
      </table>
    </div>
  );
};

export default memo(CustomerDatatable);
