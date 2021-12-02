import React from 'react';
import {Route, Switch} from "react-router";
import { NotFoundPage, PostsPage, PostPage } from './pages';
import DefaultTemplate from "./components/DefaultTemplate"

const App = () => {
  return (
    <DefaultTemplate>
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/posts" exact>
          <PostsPage/>
        </Route>
        <Route path="/post/:postId" exact>
          <PostPage/>
        </Route>
        <Route path="*" exact>
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </DefaultTemplate>
  );
};

export default App;