import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Matches, Match, MatchModal, Hires, Teams, Users, Login, Setting } from '@/pages';
import DefaultTemplate from '@/components/DefaultTemplate/DefaultTemplate';

const App = () => {
  // 라우터 세부설정 완료시 변경필요
  return (
    <DefaultTemplate>
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/matches/" exact>
          <Matches />
        </Route>
        <Route path="/matches/post/:matchId" exact>
          <Match />
        </Route>
        <Route path="/matches/edit/:matchId/" exact>
          <MatchModal />
        </Route>
        <Route path="/hires" exact>
          <Hires />
        </Route>
        <Route path="/team/select" exact>
          <Teams />
        </Route>
        <Route path="/user" exact>
          <Users />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/setting" exact>
          <Setting />
        </Route>
      </Switch>
    </DefaultTemplate>
  );
};

export default App;
