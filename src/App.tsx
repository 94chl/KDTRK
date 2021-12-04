import React from 'react';
import { Route, Switch } from 'react-router';
import { MatchesPage, MatchPage, SettingPage } from '@/pages';
import DefaultTemplate from '@/components/DefaultTemplate';

const App = () => {
  return (
    <DefaultTemplate>
      <Switch>
        <Route path="/" exact>
          <h1>Home</h1>
        </Route>
        <Route path="/matches" exact>
          <MatchesPage />
        </Route>
        <Route path="/match/:matchId" exact>
          <MatchPage />
        </Route>
        <Route path="/setting" exact>
          <SettingPage />
        </Route>
      </Switch>
    </DefaultTemplate>
  );
};

export default App;
