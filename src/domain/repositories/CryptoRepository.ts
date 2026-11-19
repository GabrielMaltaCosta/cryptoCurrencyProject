import { type Crypto } from "../entities/Crypto";

export interface CryptoRepository {
  getAllCryptos(limit: number, offset: number): Promise<Crypto[]>;
  getCryptoById(id: string): Promise<Crypto | null>;
}
