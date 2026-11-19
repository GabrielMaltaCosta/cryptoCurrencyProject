# Mercado Da Moeda

Aplicação web para acompanhar as principais criptomoedas, consultar preços e visualizar variações do mercado. Os valores podem ser exibidos em reais (BRL) ou dólares (USD), com dados fornecidos pela API da CoinCap.

## Objetivo

Este projeto foi criado para praticar TypeScript com React e aplicar conceitos de Clean Architecture em uma aplicação frontend. A organização separa as regras da aplicação, os modelos do domínio, a integração com serviços externos e a interface, facilitando o entendimento e a evolução do código.

## Tecnologias

- React
- TypeScript
- Vite
- Axios
- API da CoinCap

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto e configure sua chave da CoinCap:

   ```env
   VITE_API_KEY=sua_chave_da_coincap
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

Para verificar o build de produção e executar o lint:

```bash
npm run build
npm run lint
```

## Organização do projeto

```text
src/
├── app/
│   └── container.ts
├── application/
│   └── useCases/
├── domain/
│   ├── entities/
│   └── repositories/
├── infrastructure/
│   ├── api/
│   ├── mappers/
│   └── repositories/
└── presentarion/
    ├── hooks/
    ├── pages/
    └── utils/
```

- **`domain`**: contém a entidade `Crypto` e o contrato `CryptoRepository`, que define as operações de acesso aos dados sem depender de uma API específica.
- **`application`**: contém os casos de uso `GetCryptos` e `GetCryptoById`. Eles recebem o contrato do repositório e executam as operações da aplicação.
- **`infrastructure`**: implementa a comunicação com a CoinCap usando Axios, adapta os dados recebidos com `CoinCapCryptoMapper` e implementa o repositório definido pelo domínio.
- **`app`**: instancia as implementações e conecta os casos de uso às dependências concretas.
- **`presentarion`**: contém a tela, o hook que carrega os dados e utilitários de apresentação, como a formatação de valores. O nome da pasta mantém a grafia usada atualmente no projeto.

## Fluxo do projeto

1. `main.tsx` monta a aplicação React, que renderiza `App` e a página `Home`.
2. `Home` usa o hook `useCryptos`, responsável por buscar a lista de criptomoedas e a cotação do dólar para real.
3. O hook chama `GetCryptos` disponibilizado pelo container. O caso de uso solicita os dados ao contrato `CryptoRepository`.
4. `CoinCapRepository` implementa esse contrato e chama `CoinCapApi`, que consulta os endpoints da CoinCap.
5. A resposta da API chega no formato DTO; `CoinCapCryptoMapper` converte seus campos para a entidade `Crypto` usada pelo restante da aplicação.
6. Os dados retornam ao hook e à tela, onde podem ser filtrados por nome ou símbolo e formatados em BRL ou USD.

O caso de uso `GetCryptoById` também está disponível para buscar um criptoativo individual, embora não esteja conectado à tela atual.
