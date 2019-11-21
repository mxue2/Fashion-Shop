import React, { useState } from "react";
import Menu from "../products-menu";
import ProductsSection from "../products-section";

const Main = () => {
  const [orderby, setOrderby] = useState("");
  const [filterby, setFilterby] = useState("");
  const [numItems, setNumItems] = useState(0);

  const handleCallback = fn => e => {
    fn(e);
  };

  return (
    <React.Fragment>
      <main>
        <Menu onOrderBy={handleCallback(setOrderby)} onFilterBy={handleCallback(setFilterby)} numItems={numItems}/>
        <ProductsSection orderby={orderby} filterby={filterby} getNumItemsCallback={handleCallback(setNumItems)}/>
      </main>
    </React.Fragment>
  );
};

export default Main;
