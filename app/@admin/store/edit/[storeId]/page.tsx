import StoreUpdateForm from "./StoreUpdateForm";

async function getStoreByStoreId(storeId: string) {
  // API call to get store by storeId
  // const response = await fetch(`http://burn.pagekite.me/store/${storeId}`);
  // if (!response.ok) {
  //     throw new Error("Failed to fetch store");
  // }
  // return response.json();
  return {
    storeId: "1",
    storeName: "Store Name",
    salesRep: "Sales Rep",
    address: "Address",
  };
}

type paramType = {
  params: {
    storeId: string;
  };
};

export default async function EditStore({ params }: paramType) {
  const store = await getStoreByStoreId(params.storeId);

  return <StoreUpdateForm store={store} />;
}
