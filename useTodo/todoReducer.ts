import { Todo } from "../types/interfaces";

export const todoReducer = (state: Todo[], action: any) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "delete":
            return state.filter((todo: Todo) => todo.id !== action.payload);
        case "toggle":
            return state.map((todo: Todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            });
        default:
            return state;
    }
}
export const initialState: Todo[] = [
    
]