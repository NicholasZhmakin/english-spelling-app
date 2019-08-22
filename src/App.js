import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Categories from "./components/Categories";
import DetailsCategory from "./components/watchBlock/DetailsCategory";
import Study from "./components/studyBlock/Study";
import Default from "./components/Default";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/study/:category_id" component={Study} />
          <Route
            exact
            path="/categories/:category_id"
            component={DetailsCategory}
          />
          <Route component={Default} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
