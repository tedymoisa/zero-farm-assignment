import CustomerDatatable from "./CustomerDatatable";
import { customersSample } from "./lib/constants";

function App() {
  return (
    <div className="flex flex-col p-28">
      <CustomerDatatable customers={customersSample} />
    </div>
  );
}

export default App;
