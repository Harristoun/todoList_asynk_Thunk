// 1 Cоздаем папку 'арр' в котором будет файл 'store.js' 

import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todoSlice'

export const store = configureStore({
    reducer: todosReducer, // cоздаем в 'reducer' переменную 'todoReducer' в котором будет заключаться переменная  из папки 'features'
});