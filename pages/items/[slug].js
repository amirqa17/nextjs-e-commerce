import React from "react";
import ItemDetail from "../../app/components/ItemDetail";
import Layout from "../../app/layout";
const ItemIndividualPage = () => {
  return (
    <Layout>
      <div className="bg-white min-h-screen lg:w-1/2 w-full mx-auto">
        <h1 className="text-3xl font-bold py-6 text-center text-black"></h1>
        <div className="mx-auto">
          <ItemDetail />
        </div>
      </div>
    </Layout>
  );
};

export default ItemIndividualPage;
