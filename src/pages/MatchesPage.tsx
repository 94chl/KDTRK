import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MatchList from '@/components/MatchList';
import { fetchAllMatch } from '@/store/match';

const MatchesPage = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllMatch())
  }, [dispatch])

  return (
    <div>
      <h1>Matches</h1>    
      <MatchList></MatchList> 
    </div>
  );
};

export default MatchesPage;