import React, { useState } from "react";
import { useForm } from "react-hook-form";

/*function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
    setToDoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(toDo.length < 10) {
      return setToDoError("ToDo should be longer.");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Write a To Do..."
          value={toDo}
          onChange={onChange}
        />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}*/

function ToDoList() {
  // register 함수를 사용하면, 'onChange' event handler & input의 props & useState() 가 필요 없다.
  // watch 함수는 form의 입력값들의 변화를 관찰할 수 있게 해 주는 함수이다.
  const { register, watch } = useForm();
  console.log(watch());

  // 객체를 만들고, 그 안에 register 함수를 spread 해서 넣어준다. (ES6 문법!)
  // -> register 함수가 반환하는 객체를 input에다가 props로 준다.
  // 새로운 input을 만들 때마다, register 함수만 실행시켜주면 알잘딱으로 다 해 준다..~!!~!
  return (
    <div>
      <form>
        <input {...register("email")} placeholder="Email" />
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <input {...register("username")} placeholder="Username" />
        <input {...register("password")} placeholder="Password" />
        <input {...register("password1")} placeholder="Password Confirmation" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
