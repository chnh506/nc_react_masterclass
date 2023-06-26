import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // React.FormEvent<HTMLInputElement> 이런 걸 찾으려면 ... 답은 언제나 '구글링'
    const {
      currentTarget: { value },
    } = event; // React + TS를 쓰는 사람들은 currentTarget을 쓰기로 채택했다.
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event 타입 지정 같은 것들 : 일종의 패턴이다. 하면 할수록 익숙해질 것이다~

    // event의 type을 알려 준 덕분에, 자동완성 기능의 도움을 받을 수 있다!
    // 어쩌면 JS에서는 저지르고도 알아차리지 못할 여러 실수들을 사전에 방지해 준다.
    event.preventDefault();
    console.log(`Hello, ${value}!`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default App;
