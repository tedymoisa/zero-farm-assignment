import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Customer } from "./lib/types/customer";

type Props = {
  sortedAndFilteredCustomers: Customer[];
  selectedCustomer: Customer | null;
  setSelectedCustomer: Dispatch<SetStateAction<Customer | null>>;
};

const CustomerDatatableBody: FunctionComponent<Props> = ({
  sortedAndFilteredCustomers,
  selectedCustomer,
  setSelectedCustomer
}) => {
  const handleSelect = (customer: Customer) => {
    setSelectedCustomer((prev) => (prev?.uuid === customer.uuid ? null : customer));
  };

  return (
    <tbody className="bg-white">
      {sortedAndFilteredCustomers.map((customer) => (
        <tr key={customer.uuid}>
          <td className="px-4 py-2">
            <input
              type="checkbox"
              checked={selectedCustomer?.uuid === customer.uuid}
              onChange={() => handleSelect(customer)}
            />
          </td>
          <td className="px-4 py-2 text-sm text-gray-800">{customer.name}</td>
          <td className="px-4 py-2 text-sm text-gray-800">{customer.surname}</td>
          <td className="px-4 py-2 text-sm text-gray-800">{customer.address.city}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default CustomerDatatableBody;
