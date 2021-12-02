import React from 'react';
import styled from "@emotion/styled"
import Toggle from "./Toggle"
// import { removeTask, updateTask } from '../redux/tasks';
import { tasks } from '../redux/tasks';
import { useDispatch } from 'react-redux';

interface Props {
  id: string;
  content: string;
  complete: boolean;
}

const Task = ({id, content, complete, ...props}: Props) => {
  const dispatch = useDispatch();

  return (
    <ListItem {...props}>
      <Toggle 
      on={complete} 
      // onChange={e=>dispatch(updateTask(id, content, e.target.checked))}
      onChange={e=>dispatch(tasks.actions.update(id, content, e.target.checked))}
      />
      <Content complete={complete}>{content}</Content>
      {/* <RemoveBtn onClick={()=>dispatch(removeTask(id))}>Remove</RemoveBtn> */}
      <RemoveBtn onClick={()=>dispatch(tasks.actions.remove(id))}>Remove</RemoveBtn>
    </ListItem>
  );
};

export default Task;

const ListItem = styled.li`
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  padding : 0 6px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  list-style: none;
  box-sizing: border-box;
`

const Content = styled.span<{complete:boolean}>`
display: inline-block;
flex:1;
margin-left: 8px;
font-size: 14px;
text-decoration: ${({complete})=>(complete? "line-through" : "none")}
`

const RemoveBtn = styled.button`
  width: 60px;
  height: 30px;
  margin-left: 4px;
  color: #fff;
  background: red;
  cursor: pointer;
  border:none;
  border-radius:4px;
`