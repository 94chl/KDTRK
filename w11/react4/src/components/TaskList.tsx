import React from 'react';
import styled from "@emotion/styled"
import Task from "./Task"
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const TaskList = (props:any) => {
  const tasks = useSelector((store:RootState) => store.tasks)

  return (
    <UnorderedList {...props}>
      {tasks.map((item)=>(
        <Task key={item.id} id={item.id} content={item.content} complete={item.complete}></Task>
      ))}
    </UnorderedList>
  );
};

export default TaskList;

const UnorderedList = styled.ul`
width: 400px;
padding : 0;
margin: 0;

  display: flex;
  height: 40px;
  align-items: center;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  list-style: none;
  box-sizing: border-box;
`