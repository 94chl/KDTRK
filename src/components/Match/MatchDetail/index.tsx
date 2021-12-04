import React from 'react';
import { Match } from '@/store/match';

interface Props {
  match: Match;
}

const MatchDetail = ({ match }: Props) => {
  return (
    <div>
      <div>
        <h3>Detail</h3>
        <div>
          <button>edit</button>
          <button>remove</button>
        </div>
      </div>
      <div>{match.detail}</div>
    </div>
  );
};

export default MatchDetail;
