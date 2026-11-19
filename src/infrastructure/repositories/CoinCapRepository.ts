import { type Crypto } from "../../domain/entities/Crypto";
import { CoinCapApi } from "../api/CoinCapApi";
import { type CryptoRepository } from "../../domain/repositories/CryptoRepository";
import {
  CoinCapCryptoMapper,
  type CoinCapCryptoDTO,
} from "../mappers/CoinCapCryptoMapper";

export class CoinCapRepository implements CryptoRepository {
  private readonly coinCapApi: CoinCapApi;

  constructor(coinCapApi: CoinCapApi) {
    this.coinCapApi = coinCapApi;
  }

  async getAllCryptos(limit: number, offset: number): Promise<Crypto[]> {
    const data: CoinCapCryptoDTO[] | null = await this.coinCapApi.getAllCryptos(
      limit,
      offset,
    );

    if (!data) {
      return [];
    }

    return data.map((cryptoData) => CoinCapCryptoMapper.toCrypto(cryptoData));
  }
  async getCryptoById(id: string): Promise<Crypto | null> {
    const data: CoinCapCryptoDTO | null =
      await this.coinCapApi.getCryptoById(id);

    if (data) {
      return CoinCapCryptoMapper.toCrypto(data);
    }
    return null;
  }
}
