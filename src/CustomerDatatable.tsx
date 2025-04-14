import { FunctionComponent, useState } from "react";
import { customersSample } from "./lib/constants";
import { Customer } from "./lib/types/customer";

type Props = {};

const CustomerDatatable: FunctionComponent<Props> = () => {
  const [customers, setCustomers] = useState<Customer[]>(customersSample);

  return (
    <div className="overflow-x-auto mt-6">
      <h1 className="text-3xl font-bold">Customer Datatable</h1>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Surname</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">City</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {customers.map((customer) => (
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
