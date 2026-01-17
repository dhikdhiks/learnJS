console.log("Update at " + new Date().toISOString());
interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
}

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&order=market_cap_desc";

const coinList = document.getElementById("coin-list") as HTMLDivElement;

async function fetchCoins(): Promise<void> {
  try {
    const res = await fetch(API_URL);
    const data: Coin[] = await res.json();
    renderCoins(data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function renderCoins(coins: Coin[]): void {
  coinList.innerHTML = "";

  coins.forEach((coin) => {
    const card = document.createElement("div");
    card.className =
      "bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transition";

    card.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${coin.image}" class="w-12 h-12" />
        <p class="font-semibold text-lg">${coin.name}</p>
      </div>

      <div class="mt-4 space-y-1">
        <p class="text-sm text-slate-400">
          Market Cap: $${coin.market_cap.toLocaleString()}
        </p>
        <p class="text-xl font-bold">
          Price: $${coin.current_price.toLocaleString()}
        </p>
      </div>
    `;

    coinList.appendChild(card);
  });
}

// Auto Refresh System
let refreshInterval: number | null = null;

function startAutoRefresh() {
  if (refreshInterval !== null) return;

  refreshInterval = window.setInterval(() => {
    fetchCoins();
  }, 30000); // 30 detik
}

// Initial Load
fetchCoins();
startAutoRefresh();
