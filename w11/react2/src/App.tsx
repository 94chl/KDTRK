import React from 'react';
import styled from '@emotion/styled';
import TaskProvider from './contexts/TaskProvider';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header';

const Container = styled.div`
width: 400px;
margin: 0 auto;
`

const App = () => {
  return (
    <TaskProvider>
      <Container>
        <Header>Todo</Header>
        <NewTaskForm></NewTaskForm>
        <TaskList css={{marginTop:16}}></TaskList>
      </Container>
    </TaskProvider>
  );
};

export default App;