/* eslint-disable react/jsx-fragments */
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchMatchById } from '@/store/match';
import { MatchInfo, TeamCard, MatchDetail, MatchButton } from '@/components/Match';

const Match = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatchById(1));
  }, [dispatch]);

  const { match } = useSelector((store: RootState) => store.matches).data;

  return (
    <div>
      <h1>Match</h1>
      {match.map((matchInfo) => (
        <Fragment key={`match${matchInfo.matchId}`}>
          <MatchInfo key={`matchInfo${matchInfo.matchId}`} match={matchInfo} />
          <TeamCard key={`teamInfo${matchInfo.homeTeam}`} team={matchInfo.homeTeam} />
          <MatchDetail key={`matchDetail${matchInfo.matchId}`} match={matchInfo} />
        </Fragment>
      ))}
      <MatchButton enable={{ apply: true, approve: true }} />
    </div>
  );
};

export default Match;
