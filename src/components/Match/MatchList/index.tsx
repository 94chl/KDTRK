import React from 'react';
import { useSelector } from 'react-redux';
import { MatchCard } from '@/components/Match';
import { RootState } from '@/store';

const MatchList = () => {
  const { data } = useSelector((store: RootState) => store.matches);

  return (
    <div>
      <ul>
        {data.map((match) => (
          <MatchCard key={match.matchId} match={match}></MatchCard>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
