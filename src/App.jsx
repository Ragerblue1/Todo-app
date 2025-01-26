import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finshed, setFinshed] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

const toggleFinished=() => { 
  setFinshed(!finshed)
 }


  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveLocal();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveLocal();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveLocal();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLocal();
  };

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl p-10 bg-violet-200 min-h-[80vh] md:w-1/2">
        <div className="addTodo  flex flex-col">
          <h2 className="text-3xl font-extrabold justify-center">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white w-full my-8 px-5 py-2 rounded-xl"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <=2}
            className="bg-violet-700 text-white hover:bg-violet-900 disabled:bg-violet-600 hover:font-bold p-4 py-3 rounded-xl mx-8 text-md w-[30vw]  items-center justify-center align-middle"
          >
            Save
          </button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={finshed} className="my-3 " /> Show Finsihed
        <h2 className="text-xl font-medium">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 font-medium">No Todos To Display</div>
          )}
          {todos.map((items) => {
            return ( (finshed || !items.isCompleted) &&
              <div
                key={items.id}
                className="todo flex  md:w-1/2 justify-between my-4"
              >
                <div className="flex gap-5 items-center ">
                  <input
                    name={items.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={items.isCompleted}
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, items.id)}
                    className="bg-violet-700 text-white hover:bg-violet-900 hover:font-bold p-4 py-2 rounded-xl mx-2 text-2xl"
                  >
                    <MdEditNote />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-violet-700 text-white hover:bg-violet-900 hover:font-bold p-4 py-1 rounded-xl mx-2 text-md"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;


