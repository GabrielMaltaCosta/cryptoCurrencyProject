import { CoinCapRepository } from "../infrastructure/repositories/CoinCapRepository";
import { CoinCapApi } from "../infrastructure/api/CoinCapApi";
import { GetCryptos } from "../application/useCases/GetCryptos";
import { GetCryptoById } from "../application/useCases/GetCryptoById";

const coinCapApi = new CoinCapApi();
const coinCapRepository = new CoinCapRepository(coinCapApi);
export const getCryptos = new GetCryptos(coinCapRepository);
export const getCryptoById = new GetCryptoById(coinCapRepository);
export const getUsdToBrlRate = () => coinCapApi.getUsdToBrlRate();
