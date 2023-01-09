import React, { useEffect } from "react";
import "./App.css";
import StockPage from "./pages/stockPage/stockPage.component";
import QuotePage from "./pages/quotesPage/quotePage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";

function App() {
  return (
    <article className="App">
      <Header />
      <Switch>
        <Route path="/instruments" component={StockPage}></Route>
        <Route path="/quotes" component={QuotePage}></Route>
        <Route render={() => <Redirect to={{ pathname: "/instruments" }} />} />
      </Switch>
    </article>
  );
}

export default App;
