const BASE_URL = "https://api.coinpaprika.com/v1";

// fetcher 함수 -> json data의 Promise를 return해야 한다.
export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json;
}

export async function fetchCoinInfo(coinId: string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
}

export async function fetchCoinTickers(coinId: string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
}

export async function fetchCoinHistory(coinId: string) {
  return await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
}
