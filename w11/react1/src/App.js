import { Route, Switch } from "react-router";
import DefaultTemplate from "@components/template/DefaultTemplate";
import { PostsPage, PostPage, NotFoundPage } from "@pages";
import { Input } from "@components";
import { useRef } from "react";

const App = () => {
  const inputRef = useRef();
  return (
    <DefaultTemplate>
      <Switch>
        <Route path="/" exact>
          <h1>HOME</h1>
          <Input ref={inputRef}></Input>
          <button onClick={() => inputRef.current.focus()}>Focus</button>
          <button onClick={() => inputRef.current.clear()}>Clear</button>
        </Route>
        <Route path="/posts" exact>
          <PostsPage></PostsPage>
        </Route>
        <Route path="/posts/:postId">
          <PostPage></PostPage>
        </Route>
        <Route path="*">
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </DefaultTemplate>
  );
};

export default App;
