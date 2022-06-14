import { connect } from "react-redux";
import React from "react";

function App(props) {
  function handleClick(event) {
    if (event.keyCode === 13 && event.target.value) {
      props.dispatch({ type: "add", todo: event.target.value });
      event.target.value = "";
    }
  }

  function handleRemove({ target }) {
    let { id } = target.dataset;
    props.dispatch({ type: "remove", id: id });
  }

  function handleCompleted({ target }) {
    let { id, completed } = target.dataset;
    console.log("testing");
    props.dispatch({
      type: "toggle",
      isCompleted: completed === "false" ? true : false,
      id: id,
    });
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter todo"
          className="input-box"
          onKeyUp={handleClick}
          c
        />
        <div>
          <ul>
            {props.state &&
              props.state.map((t, i) => {
                return (
                  <li key={i} className="flex justify-between width-full">
                    <div className="flex">
                      <input
                        type="checkbox"
                        onClick={handleCompleted}
                        data-id={i}
                        data-completed={t.isCompleted}
                        checked={t.isCompleted ? true : false}
                      />
                      <h2
                        className={
                          t.isCompleted
                            ? "capitalize line-through"
                            : "capitalize"
                        }
                      >
                        {t.todo}
                      </h2>
                    </div>

                    <span
                      className="cursor-pointer"
                      onClick={handleRemove}
                      data-id={i}
                    >
                      ❌
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function getState(state) {
  return {
    state: [...state],
  };
}

export default connect(getState)(App);
