import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMatch } from '@/store/match/match';
import { MatchPosts } from '@/components';
import { RootState } from '@/store';

const MatchesPage = () => {
  const dispatch = useDispatch();
  const { matchListFilter } = useSelector((store: RootState) => store.match.data);

  useEffect(() => {
    dispatch(fetchAllMatch(matchListFilter));
  }, [dispatch, matchListFilter]);

  return <MatchPosts />;
};

export default MatchesPage;
