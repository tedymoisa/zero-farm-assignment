import { FormEvent, FunctionComponent, useState } from "react";
import { Customer } from "./lib/types/customer";

type Props = {
  selectedCustomer: Customer | null;
  modifyCustomers: (customer: Customer) => void;
};

const CustomerForm: FunctionComponent<Props> = ({ selectedCustomer, modifyCustomers }) => {
  console.log("CustomerForm", selectedCustomer);
  const title = !selectedCustomer ? "Add New Customer" : `Modify Customer ${selectedCustomer.uuid}`;
  const submitButton = !selectedCustomer ? "Add" : "Save";

  const [customer, setCustomer] = useState<Customer>(
    selectedCustomer ?? {
      uuid: `uuid-${Date.now()}`,
      name: "",
      surname: "",
      address: {
        city: "",
        street: ""
      }
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    modifyCustomers(customer);
  };

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label htmlFor="name" className="mb-1 text-xs">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={customer.name}
            onChange={(e) => setCustomer((prev) => ({ ...prev, name: e.target.value }))}
            required
            className="w-full border"
          />
        </div>

        <div>
          <label htmlFor="surname" className="text-xs mb-1">
            Surname:
          </label>
          <input
            id="surname"
            type="text"
            value={customer.surname}
            onChange={(e) => setCustomer((prev) => ({ ...prev, surname: e.target.value }))}
            required
            className="w-full border"
          />
        </div>

        <div>
          <label htmlFor="city" className="text-xs mb-1">
            City:
          </label>
          <input
            id="city"
            type="text"
            value={customer.address.city}
            onChange={(e) => setCustomer((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
            required
            className="w-full border"
          />
        </div>

        <div>
          <label htmlFor="street" className="text-xs mb-1">
            Street:
          </label>
          <input
            id="street"
            type="text"
            value={customer.address.street}
            onChange={(e) => setCustomer((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
            required
            className="w-full border"
          />
        </div>

        <button type="submit" className="cursor-pointer border px-2">
          {submitButton}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
