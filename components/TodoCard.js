import React from "react";
import styles from "../styles/todocard.module.css";

export const TodoCard = (props) => {
  const {
    children,
    edit,
    setEdit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;
//   console.log(handleAddEdit(t));
  return (
    <div className={`${styles.todo_card}`}>
      <div className={`${styles.todo_card_inner}`}>
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            className={`${styles.todo_content}`}
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
        {/* {children} */}
      </div>
      <div className={`${styles.todo_actions}`}>
        {edit === todoKey ? (
          <i
            onClick={handleEditTodo}
            className={`${styles.check_icon} fa-solid fa-check`}
          ></i>
        ) : (
          <i
            onClick={handleAddEdit(todoKey)}
            className={`${styles.edit_icon} fa-solid fa-pencil`}
          ></i>
        )}

        <i onClick={handleDelete(todoKey)} className={`${styles.delete_icon} fa-solid fa-trash-can`}></i>
      </div>
    </div>
  );
};
