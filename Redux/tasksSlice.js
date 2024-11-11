import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [
        { id: 0, text: 'play guitar' },
        { id: 1, text: 'play badminton' },
        { id: 2, text: 'play football' }
    ],
    reducers: {
        addTask: (state, action) => {
            state.push({ id: state.length, text: action.payload });
        },
        editTask: (state, action) => {
            const { id, text } = action.payload;
            const existingTask = state.find((task) => task.id === id);
            if (existingTask) {
                existingTask.text = text;
            }
        },
        deleteTask: (state, action) => {
            return state.filter((task) => task.id !== action.payload);
        }
    }
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
