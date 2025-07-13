import { useEffect, useReducer } from "react";
import { todoReducer, initialState } from "./todoReducer";
import { Todo } from "../types/interfaces";

const init = () => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onNewTodo = (todo: string) => {
    const newTodo: Todo = {
      id: new Date().getTime(),
      todo: todo,
      done: false,
    };
    dispatch({
      type: "add",
      payload: newTodo,
    });
  };
  const onDeleteTodo = (id: number) => {
    dispatch({
      type: "delete",
      payload: id,
    });
  };
  const onToggleTodo = (id: number) => {
    dispatch({
      type: "toggle",
      payload: id,
    });
  };
  
  return {
    todos,
    onNewTodo,
    onDeleteTodo,
    onToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    completedTodosCount: todos.filter(todo => todo.done).length,
  };
};
