import React from 'react';
import { useSelector } from 'react-redux';
import Match from "@/components/Match"
import { RootState } from '@/store';

const MatchList = () => {
  const {data} = useSelector((store: RootState)=> store.matches)

  return (
    <div>
      <ul>
        {data.map(match=>(
          <Match key={match.matchId} match={match}></Match>
        ))}
      </ul>    
    </div>
  );
};

export default MatchList;