import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

function Coin() {
  // useParams: url의 변수를 오브젝트 형태로 return해 준다.
  // TS에서는, Generic의 형태로 Object의 타입을 지정해 줘야 되는 듯.
  const { coinId } = useParams<RouteParams>();
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
