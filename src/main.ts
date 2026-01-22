type Coin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
  price_change_percentage_1h_in_currency?: number
  price_change_percentage_7d_in_currency?: number
}

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets' +
  '?vs_currency=usd' +
  '&order=market_cap_desc' +
  '&per_page=50' +
  '&page=1' +
  '&sparkline=false' +
  '&price_change_percentage=1h,24h,7d'

const listEl = document.getElementById('tokens') as HTMLElement
const detailEl = document.getElementById('coin-detail') as HTMLElement

let coinsCache: Coin[] = []

/* =========================
   FETCH DATA
========================= */
async function fetchCoins(): Promise<void> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch market data')

  coinsCache = await res.json()
  renderCoinList(coinsCache)
}

/* =========================
   RENDER LIST
========================= */
function renderCoinList(coins: Coin[]): void {
  listEl.innerHTML = ''

  coins.forEach((coin) => {
    const item = document.createElement('div')
    item.className = 'coin-item'

    item.innerHTML = `
      <div class="coin-basic">
        <img src="${coin.image}" alt="${coin.name}" />
        <div>
          <strong>${coin.name}</strong>
          <span>${coin.symbol.toUpperCase()}</span>
        </div>
      </div>

      <div class="coin-price">
        $${coin.current_price.toLocaleString()}
      </div>

      <div class="coin-change ${coin.price_change_percentage_24h >= 0 ? 'up' : 'down'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    `

    item.addEventListener('click', () => showDetail(coin.id))
    listEl.appendChild(item)
  })
}

/* =========================
   DETAIL VIEW
========================= */
function showDetail(coinId: string): void {
  const coin = coinsCache.find((c) => c.id === coinId)
  if (!coin) return

  detailEl.innerHTML = `
    <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
    <img src="${coin.image}" width="64" />

    <section>
      <h3>Market</h3>
      <p>Price: <strong>$${coin.current_price.toLocaleString()}</strong></p>
      <p>Market Cap Rank: #${coin.market_cap_rank}</p>
      <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
      <p>24h Volume: $${coin.total_volume.toLocaleString()}</p>
    </section>

    <section>
      <h3>Price Change</h3>
      <p>1h: ${coin.price_change_percentage_1h_in_currency?.toFixed(2) ?? '-'}%</p>
      <p>24h: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
      <p>7d: ${coin.price_change_percentage_7d_in_currency?.toFixed(2) ?? '-'}%</p>
    </section>

    <section>
      <h3>Supply</h3>
      <p>Circulating: ${coin.circulating_supply.toLocaleString()}</p>
      <p>Total: ${coin.total_supply?.toLocaleString() ?? '∞'}</p>
      <p>Max: ${coin.max_supply?.toLocaleString() ?? '∞'}</p>
    </section>

    <section>
      <h3>All Time</h3>
      <p>ATH: $${coin.ath.toLocaleString()} (${coin.ath_change_percentage.toFixed(2)}%)</p>
      <p>ATL: $${coin.atl.toLocaleString()} (${coin.atl_change_percentage.toFixed(2)}%)</p>
    </section>

    <small>Last updated: ${new Date(coin.last_updated).toLocaleString()}</small>
  `
}

/* =========================
   INIT
========================= */
fetchCoins().catch(console.error)
