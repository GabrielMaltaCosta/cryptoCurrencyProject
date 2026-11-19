import { type Crypto } from "../../domain/entities/Crypto";
import { type CryptoRepository } from "../../domain/repositories/CryptoRepository";

export class GetCryptoById {
  private readonly cryptoRepository: CryptoRepository;

  constructor(cryptoRepository: CryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(id: string): Promise<Crypto | null> {
    return this.cryptoRepository.getCryptoById(id);
  }
}
