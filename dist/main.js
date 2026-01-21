/**
 * CONSTANTS
 */
const API_BASE = "https://api.coingecko.com/api/v3/coins/markets";
const container = document.getElementById("tokens");
/**
 * FETCH FUNCTION
 * Async karena network = I/O
 */
async function fetchTokens(vsCurrency) {
    const url = `${API_BASE}?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("CoinGecko API error");
    }
    return response.json();
}
/**
 * RENDER FUNCTION
 */
function renderTokens(usd, idr) {
    container.innerHTML = "";
    usd.forEach((token, i) => {
        const idrToken = idr[i];
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${token.image}" />
      <h3>${token.name} (${token.symbol.toUpperCase()})</h3>
      <div class="price">USD: $${token.current_price.toLocaleString()}</div>
      <div class="price">IDR: Rp ${idrToken.current_price.toLocaleString()}</div>
    `;
        container.appendChild(card);
    });
}
/**
 * MAIN LOGIC
 * Promise.all = paralel (lebih efisien)
 */
async function loadMarket() {
    try {
        const [usd, idr] = await Promise.all([
            fetchTokens("usd"),
            fetchTokens("idr")
        ]);
        renderTokens(usd, idr);
    }
    catch (error) {
        console.error("Failed to load market", error);
    }
}
/**
 * REALTIME UPDATE
 */
loadMarket();
setInterval(loadMarket, 30000);
