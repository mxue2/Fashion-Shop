import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import history from "../../history";
import Main from "../main";
import ProductPage from "../product-page";
import NotFoundPage from "../not-found-page";
import Header from "../header";

const App = () => {
  const [item, setItem] = useState({});

  const addToCartCallback = e => {
    setItem(e);
  };

  return (
    <HashRouter basename="/" history={history}>
      <div>
        <Header newItem={item} />
        <Switch>
          <Route path="/" exact render={() => <Main />} />
          <Route
            path="/item/:id"
            exact
            render={() => <ProductPage addToCartCallback={addToCartCallback} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;
