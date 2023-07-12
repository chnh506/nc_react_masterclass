import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTickers } from "../apifetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  a {
    font-size: 36px;
    color: ${(props) => props.theme.accentColor};
    position: absolute;
    right: 5px;
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
  font-size: 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin: 30px 0px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => props.theme.accentColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.bgColor : props.theme.textColor};
  transition: color 0.3s ease-in-out; // 요 Transition이 좀 쓸만한 듯하다 ..! 잘 우려먹어보자.

  // 감싸고 있는 전체 블록을 링크로 만들어버려서 클릭 용이하도록!
  // 이런 사소한 디테일들 잘 챙겨가자.
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
  symbol: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  // useParams: url의 변수를 오브젝트 형태로 return해 준다.
  // TS에서는, Generic의 형태로 Object의 타입을 지정해 줘야 되는 듯.
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>(); // react-router-DOM이 보내 주는 location object에 접근한다.

  const priceMatch = useRouteMatch("/:coinId/price"); // react-router-dom v6에서 수정사항 o
  const chartMatch = useRouteMatch("/:coinId/chart");

  /* 
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); 
  */
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
    // {
    //   refetchInterval: 5000,
    // }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading ..." : infoData?.name}
        </title>
        <link
          rel="icon"
          type="image/png"
          href={`https://coinicons-api.vercel.app/api/icon/${state.symbol}`}
          sizes="16x16"
        />
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading ..." : infoData?.name}
        </Title>
        <Link to={`../`}>
          <FontAwesomeIcon icon={faBackward} />
        </Link>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link
            to={{
              pathname: `/${coinId}/price`,
              state: {
                name: infoData?.name,
                symbol: infoData?.symbol.toLowerCase(),
                tickersData,
              },
            }}
          >
            Price
          </Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link
            to={{
              pathname: `/${coinId}/chart`,
              state: {
                name: infoData?.name,
                symbol: infoData?.symbol.toLowerCase(),
              },
            }}
          >
            Chart
          </Link>
        </Tab>
      </Tabs>
      <Switch>
        <Route path={`/${coinId}/price`}>
          <Price />
        </Route>
        <Route path={`/${coinId}/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
}

export default Coin;
