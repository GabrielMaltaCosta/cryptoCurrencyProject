import axios from "axios";
import type { CoinCapCryptoDTO } from "../mappers/CoinCapCryptoMapper";
const api = axios.create({
  baseURL: "https://rest.coincap.io/v3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});
export class CoinCapApi {
  async getUsdToBrlRate(): Promise<number | null> {
    try {
      const response = await api.get("/rates");
      const brlRate = response.data.data?.find(
        (rate: { symbol: string }) => rate.symbol.toUpperCase() === "BRL",
      );
      const rateUsd = Number(brlRate?.rateUsd);

      if (!Number.isFinite(rateUsd) || rateUsd <= 0) {
        return null;
      }

      return 1 / rateUsd;
    } catch (error) {
      console.error("Error fetching BRL exchange rate:", error);
      return null;
    }
  }

  async getAllCryptos(
    limit: number,
    offset: number,
  ): Promise<CoinCapCryptoDTO[] | null> {
    try {
      const response = await api.get("/assets", {
        params: {
          limit,
          offset,
        },
      });
      return response.data.data ?? response.data;
    } catch (error) {
      console.error("Error fetching cryptos:", error);
      return null;
    }
  }
  async getCryptoById(id: string): Promise<CoinCapCryptoDTO | null> {
    try {
      const response = await api.get(`/assets/${id}`);
      return response.data.data ?? response.data;
    } catch (error) {
      console.error(`Error fetching crypto with id ${id}:`, error);
      return null;
    }
  }
}
