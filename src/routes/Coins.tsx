import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  margin-bottom: 30px;
  color: ${(props) => props.theme.accentColor};
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
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

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>"Loading ... "</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <CoinElem key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
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
