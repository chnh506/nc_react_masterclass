import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../apifetch";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  font-size: 24px;
`;

const CoinsList = styled.ul``;

const CoinElem = styled.li`
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 20px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  a {
    transition: color 0.3s ease-in-out;
    padding: 20px;
    display: flex;
    align-items: center;
  }

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin: 30px 0px;
  color: ${(props) => props.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /*
  const [coins, setCoins] = useState<CoinInterface[]>([]); // useState()에서는 Generic을 이용해 type을 지정해 준다.
  const [loading, setLoading] = useState(true); // React-query에서는 Loading을 이렇게 하지는 않음.

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })(); // function을 즉시 실행시킬 수 있는 trick!
  }, []);
  */

  // 아래 한 줄로, 위의 API Fetch해 오고 -> json data를 state에 넣어 주고, loading 변수 바꿔주는 모든 절차를 실행시킬 수 있다!
  // react-query는 데이터를 캐시에 저장해 두기 때문에, 다른 screen에 갔다가 다시 'Coins’ screen으로 돌아와도 로딩이 한번 더 일어나지 않는다!!
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>"Loading ... "</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <CoinElem key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name, symbol: coin.symbol.toLowerCase() },
                }}
              >
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={`${coin.symbol}`}
                />
                {coin.name} &rarr;
              </Link>
            </CoinElem>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
