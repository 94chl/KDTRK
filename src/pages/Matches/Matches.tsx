import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MatchList } from '@/components/Match';
import { fetchAllMatch } from '@/store/matches/matches';
import { store } from '@/store';

const Matches = () => {
  console.log(store.dispatch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatch());
  }, [dispatch]);

  return (
    <div>
      <h1>Matches</h1>
      <MatchList />
    </div>
  );
};

export default Matches;
