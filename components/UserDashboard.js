import React, { useState } from "react";
import styles from "../styles/userdashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { TodoCard } from "./TodoCard";
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';
import useFetchTodos from "../hooks/fetchTodos";
import { Tao } from "./Tao";

export const UserDashboard = () => {
  const {currentUser } = useAuth();
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const { todos, setTodos, loading } = useFetchTodos();
  const [edittedValue, setEdittedValue] = useState('')


  async function handleAddTodo() {
    console.log("21");
      if (!todo) {return};
      const newKey = Object.keys(todos).length === 0 ? 1 :  Math.max(...Object.keys(todos)) +1
      setTodos({...todos,[newKey]: todo});
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        'todos' : {
          [newKey] : todo
        }
      }, {merge: true})
      setTodo('')
  }
  async function handleEditTodo() {
      if (!edittedValue) {return};
      const newKey = edit
      setTodos({...todos,[newKey]: edittedValue});
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        'todos' : {
          [newKey] : edittedValue
        }
      }, {merge: true})
      setEdit(null);
      setEdittedValue('');
  }

   function handleAddEdit(todoKey) {
    console.log('Edit icon clicked for todoKey:', todoKey);
    return  () => {
      setEdit(todoKey)
      setEdittedValue(todos[todoKey])
    }
  }

   function handleDelete(todoKey) {
    return async () => {
      const temObj = {...todos}
      delete temObj[todoKey]

      setTodos(temObj)
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        'todos' : {
          [todoKey] : deleteField()
        }
      }, {merge: true})
    }
}

  return (
    <>
    <Tao/>
    <div className={`${styles.userdashboard}`}>
      <div className={`${styles.user_dashboard_input_container}`}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter todo"
          className={`${styles.user_dashboard_input}`}
        />
        <button onClick={handleAddTodo} className={` ${styles.user_dashboard_add_button}`}>ADD</button>
      </div>
      {(loading) && (
            <div className={`${styles.user_dashboard_spinner}`}>
            <i className={`fa-solid fa-spinner ${styles.todo_card}`}></i>
          </div>
      )}
        {(!loading) && (
          <>
            {Object.keys(todos).map((todo,i) => {
              return (
                <TodoCard key={i}  edit={edit} handleDelete={handleDelete} handleAddEdit={handleAddEdit} handleEditTodo={handleEditTodo} edittedValue={edittedValue} setEdittedValue={setEdittedValue} todoKey={todo} index={i}>
                  {todos[todo]}
                </TodoCard>
              )
            })}
          </>
        )}
    </div>
    </>
  );
};
