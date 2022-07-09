import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, removeTodo } from "./features/todoSlice";

const App = () => {
  const todos = useSelector((state)=> state.todos) // изначально тут хранится пустой массив []
  const loading = useSelector((state)=> state.loading)

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchTodos()) // После fetch запроса, у нас изменяется state 
  }, [dispatch])

  if(loading) {
    return 'Загрузка контента. . .'
  }

  const handleRemoveTodo = (id)=>{
    dispatch(removeTodo(id))
  }
  
  return(
  <ul>
    {todos.map((todo)=>{
    return <li>{todo.title}<button onClick={()=> handleRemoveTodo(todo.id)}>✂︎</button></li>
  })}
  </ul>
  )
} 

export default App; 