import React, { useCallback, useState } from 'react';
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { Match } from '@/dummy';

interface Props {
  match: Match;
}

const PostItem = ({match}: Props) => {  
  const dispatch = useDispatch();

  // const handleDeletePost = useCallback(async(id:number)=>{
  //   await dispatch(deletePostById(id))
  // },[dispatch])
  
  return (
    <li>
      <h3>{match.sports}</h3>
      <h3>{`${match.city} ${match.region} ${match.groundName}`}</h3>
      <h3>{match.date}</h3>     
      <button>JOIN</button> 
    </li>
  );
};

export default PostItem;