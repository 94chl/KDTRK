import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchAllMatch } from '@/store/match';
import { fetchAllTeam } from '@/store/team';
import { MatchInfo, TeamCard, MatchDetail, MatchButton } from '@/components/Match';

const MatchPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
    dispatch(fetchAllTeam());
  }, [dispatch]);

  const match = { ...useSelector((store: RootState) => store.matches).data[0] };
  const team = { ...useSelector((store: RootState) => store.teams).data[0] };
  console.log(useSelector((store: RootState) => store.teams));

  return (
    <div>
      <h1>Match</h1>
      <MatchInfo match={match} />
      <TeamCard team={team} />
      <MatchDetail match={match} />
      <MatchButton isAuthor={true} />
    </div>
  );
};

export default MatchPage;
