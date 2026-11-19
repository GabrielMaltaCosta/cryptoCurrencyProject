import { useEffect, useState } from "react";
import { getCryptos, getUsdToBrlRate } from "../../app/container";
import { type Crypto } from "../../domain/entities/Crypto";

export function useCryptos() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [usdToBrlRate, setUsdToBrlRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      try {
        const [data, exchangeRate] = await Promise.all([
          getCryptos.execute(20, 0),
          getUsdToBrlRate(),
        ]);
        setCryptos(data);
        setUsdToBrlRate(exchangeRate);
      } catch (error) {
        console.error("Error fetching cryptos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return { cryptos, loading, usdToBrlRate };
}
