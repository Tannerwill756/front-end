import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import { Register } from "./components/Register";

import { Nav } from "./components/Nav";

import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import UpdatePostForm from "./components/UpdatePostForm";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/post" component={Posts} />
          <PrivateRoute exact path="/postform" component={PostForm} />
          <PrivateRoute
            exact
            path="/api/posts/:id"
            component={UpdatePostForm}
          />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
