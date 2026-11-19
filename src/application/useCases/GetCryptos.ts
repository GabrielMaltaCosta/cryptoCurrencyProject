import { type CryptoRepository } from "../../domain/repositories/CryptoRepository";
import { type Crypto } from "../../domain/entities/Crypto";

export class GetCryptos {
  private readonly cryptoRepository: CryptoRepository;

  constructor(cryptoRepository: CryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(limitt: number = 20, offset: number = 0): Promise<Crypto[]> {
    return this.cryptoRepository.getAllCryptos(limitt, offset);
  }
}
