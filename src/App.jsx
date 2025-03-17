import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    let todos = []
    console.log(todos);
    if (todoString) {
      todos = JSON.parse(todoString)
    }
    setTodos(todos)
  }, [])
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleSave = () => {
    // setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <div className="container md:w-1/2 min-h-[90vh] p-2 md:p-5 bg-violet-200 md:mx-auto">
        <div className="header font-bold text-3xl text-center bg-violet-400">iTask</div>
        <div className="addTodo font-bold text-lg my-2" >Add a Todo</div>
        <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='px-2 py-1 w-full border-none border-violet-200' />
          <button onClick={handleSave} className='mx-2 px-2 py-1 rounded-lg text-white bg-violet-600 font-bold hover:bg-violet-800'>Save</button>
        </div>
        <input className='mt-5' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='font-bold text-lg my-5'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>Your Todo List is Empty</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 m-2 justify-between">
              <div className='flex gap-2e md:gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                {/* <div className={item.isCompleted?"line-through":""} >{item.todo}</div> */}
                <div className={`${item.isCompleted ? "line-through completed flex flex-col" : "flex"}`}>
                  {item.todo}
                </div>

              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='md:mx-1 px-2 py-1 rounded-lg text-white bg-violet-600 font-bold hover:bg-violet-800'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='mx-1 px-2 py-1 rounded-lg text-white bg-violet-600 font-bold hover:bg-violet-800'>Delete</button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App 
