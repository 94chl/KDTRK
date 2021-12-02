import React from 'react';
import { useSelector } from 'react-redux';
import { matches } from '@/dummy';
import Match from "@/components/Match"
//import { RootState } from '@/store';

//import PostItem from '../PostItem';

const PostList = () => {
  // const {data} = useSelector((store: RootState)=> store.match)

  return (
    <div>
      <ul>
        {matches.map(match=>(
          <Match key={match.matchId} match={match}></Match>
        ))}
      </ul>    
    </div>
  );
};

export default PostList;