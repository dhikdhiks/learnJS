"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Hello, TypeScript!");
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&order=market_cap_desc";
const coinList = document.getElementById("coin-list");
function fetchCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(API_URL);
            const data = yield res.json();
            renderCoins(data);
        }
        catch (err) {
            console.error("Fetch error:", err);
        }
    });
}
function renderCoins(coins) {
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
fetchCoins();
