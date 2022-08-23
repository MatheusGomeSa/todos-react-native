import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const data: Task = {
      id: new Date().getDate() + new Date().getMilliseconds(),
      done: false,
      title: newTaskTitle
    }
    setTasks(oldTasks => [...oldTasks, data]);
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {

    let changeTask = tasks;
    let finalTaskOrder = tasks.filter(task => task.id != id);
    let changeTaskIndex = tasks.findIndex(task => task.id == id);
    changeTask[changeTaskIndex].done = !changeTask[changeTaskIndex].done;

    if (changeTask[changeTaskIndex].done) {
      finalTaskOrder.push(changeTask[changeTaskIndex])
    } else {
      finalTaskOrder.unshift(changeTask[changeTaskIndex])
    }

    setTasks(finalTaskOrder);
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => [...oldTasks.filter(task => task.id != id)]);
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})