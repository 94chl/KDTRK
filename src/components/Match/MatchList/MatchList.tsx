import React from 'react';
import { useSelector } from 'react-redux';
import { MatchCard } from '@/components';
import { RootState } from '@/store';

const MatchList = () => {
  const { data } = useSelector((store: RootState) => store.posts);

  return (
    <div>
      <ul>
        {data.matches.map((match, index) => (
          <MatchCard key={match.matchId && match.matchId + index} match={match} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
