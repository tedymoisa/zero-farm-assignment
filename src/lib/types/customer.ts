export interface Customer {
  uuid: string;
  name: string;
  surname: string;
  address: {
    city: string;
    street: string;
  };
}
