import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // >>> в initialState мы передаем пустой массив []
  todos: [],
  loading: false,
  error: null
};
export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    //асинхронная функция asynk () => {}
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
); // создаем createAnynkThunk() в переменной fetchTodos
export const removeTodo = createAsyncThunk(
  'todo/remove', 
   async (id, thunkAPI) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'DELETE'
  },
    )
    return id
  }
   catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
})

const todosSlice = createSlice({
  // создаем в 'createSlice() объект, куда заключаем ключи'
  name: "todos",
  initialState, // <<< todos [],
  reducers: {}, //
  extraReducers: (builder) => {
    //  все действиия которые будут связаны с запросом на сервер, будут записаны в extraReducers: (builder)
    builder.addCase(fetchTodos.fulfilled, (state,action)=>{
state.todos = action.payload
state.loading =false
    })
    builder.addCase(fetchTodos.rejected, (state,action)=>{
        state.error = action.payload
        state.loading = false
            })
    builder.addCase(fetchTodos.pending, (state,action)=>{
                state.loading = true
                    })
                    builder.addCase(removeTodo.fulfilled, (state, action)=>{
                      state.todos = state.todos.filter((todo)=>{
                      return todo.id !== action.payload
                   })
                 })
  },
});


export default todosSlice.reducer;

