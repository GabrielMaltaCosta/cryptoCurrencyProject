import { type Crypto } from "../../domain/entities/Crypto";

export interface CoinCapCryptoDTO {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  marketCapUsd: string;
}

export class CoinCapCryptoMapper {
  static toCrypto(data: CoinCapCryptoDTO): Crypto {
    return {
      id: data.id,
      rank: Number(data.rank),
      symbol: data.symbol,
      name: data.name,
      supply: Number(data.supply),
      maxSupply: Number(data.maxSupply),
      volumeUsd24Hr: Number(data.volumeUsd24Hr),
      priceUsd: Number(data.priceUsd),
      changePercent24Hr: Number(data.changePercent24Hr),
      vwap24Hr: Number(data.vwap24Hr),
      marketCapUsd: Number(data.marketCapUsd),
    };
  }
}
