import React, { useState, FormEvent } from 'react';
import styled from "@emotion/styled"
import { useDispatch } from 'react-redux';
// import { addTask } from '../redux/tasks';
import { tasks } from '../redux/tasks';

const NewTaskFrom = (props:any) => {
  const [task, setTask] = useState("")
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // dispatch(addTask(task));
    dispatch(tasks.actions.add(task))
    setTask("")
  }

  return (
    <Form {...props} onSubmit={handleSubmit}>
      <Input 
        type="text" 
        value={task} 
        onChange={e=>setTask(e.target.value)} 
        required
      />
      <SubmitBtn>Add</SubmitBtn>
    </Form>
  );
};

export default NewTaskFrom;

const Form = styled.form`
  width:400px;
`

const Input = styled.input`
width: 330px;
height: 30px;
padding : 4px 6px;
border-radius: 16px;
box-sizing: border-box;
`

const SubmitBtn = styled.button`
  width: 60px;
  height: 30px;
  margin-left: 4px;
  color: #fff;
  background: red;
  cursor: pointer;
  border:none;
  border-radius:4px;
`


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
