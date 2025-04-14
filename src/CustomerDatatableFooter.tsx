import { FunctionComponent, memo, useEffect, useState } from "react";
import { Customer } from "./lib/types/customer";
import CustomerForm from "./CustomerForm";

type Props = {
  selectedCustomer: Customer | null;
  modifyCustomers: (customer: Customer) => void;
  deleteAllCustomers: () => void;
};

const CustomerDatatableFooter: FunctionComponent<Props> = ({
  selectedCustomer,
  modifyCustomers,
  deleteAllCustomers
}) => {
  console.log("CustomerDatatableFooter");
  const [formStatus, setFormStatus] = useState<"new" | "mod" | null>();

  useEffect(() => {
    setFormStatus(null);
  }, [selectedCustomer]);

  return (
    <tfoot className="bg-gray-50">
      <tr>
        <td colSpan={4}>
          <div className="flex justify-end gap-5 p-2">
            <button type="button" onClick={() => setFormStatus("new")} className="cursor-pointer border px-1">
              New
            </button>
            {selectedCustomer && (
              <button type="button" onClick={() => setFormStatus("mod")} className="cursor-pointer border px-1">
                Modify
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                deleteAllCustomers();
                setFormStatus(null);
              }}
              className="cursor-pointer border px-1"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          {formStatus && (
            <>
              {formStatus === "new" && <CustomerForm selectedCustomer={null} modifyCustomers={modifyCustomers} />}
              {formStatus === "mod" && (
                <CustomerForm selectedCustomer={selectedCustomer} modifyCustomers={modifyCustomers} />
              )}
            </>
          )}
        </td>
      </tr>
    </tfoot>
  );
};

export default memo(CustomerDatatableFooter);
