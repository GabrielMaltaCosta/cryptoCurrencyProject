import { useMemo, useState } from "react";
import { useCryptos } from "../../hooks/useCryptos";
import { formatCurrency, type DisplayCurrency } from "../../utils/currencyFormatter";

function Home() {
	const { cryptos, loading, usdToBrlRate } = useCryptos();
	const [search, setSearch] = useState("");
	const [selectedCurrency, setSelectedCurrency] = useState<DisplayCurrency>("BRL");

	const visibleCryptos = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return cryptos;
		return cryptos.filter(
			(crypto) =>
				crypto.name.toLowerCase().includes(term) ||
				crypto.symbol.toLowerCase().includes(term),
		);
	}, [cryptos, search]);

	const marketCap = cryptos.reduce(
		(total, crypto) => total + (Number.isFinite(crypto.marketCapUsd) ? crypto.marketCapUsd : 0),
		0,
	);

	return (
		<main className="market-page">
			<div className="page-shell">
				<header className="topbar">
					<a className="brand" href="#top" aria-label="Página inicial do Mercado Da Moeda">
						<span className="brand-mark" aria-hidden="true">₿</span>
						<span>Mercado Da Moeda<span className="brand-period">.</span></span>
					</a>
					<nav className="top-nav" aria-label="Navegação principal">
						<a className="nav-link nav-link-active" href="#markets">Mercado</a>
						<a className="nav-link" href="#markets">Explorar</a>
					</nav>
					<div className="live-indicator"><span /> Mercado ao vivo</div>
				</header>

				<section className="hero" id="top">
					<div className="hero-copy">
						<p className="eyebrow">O MERCADO EM UM SÓ LUGAR</p>
						<h1>Mercado cripto<br /><span>sem complicação.</span></h1>
						<p className="hero-description">Acompanhe preços, explore o mercado e encontre sua próxima oportunidade.</p>
					</div>
					<div className="market-summary" aria-label="Resumo do mercado">
						<div className="summary-icon" aria-hidden="true">↗</div>
						<p className="summary-label">Capitalização total</p>
						<p className="summary-value">{formatCurrency(marketCap, selectedCurrency, usdToBrlRate, true)}</p>
						<p className="summary-footnote">Entre {cryptos.length} principais criptoativos</p>
					</div>
					<div className="hero-orbit hero-orbit-one" aria-hidden="true" />
					<div className="hero-orbit hero-orbit-two" aria-hidden="true" />
				</section>

				<section className="market-section" id="markets">
					<div className="section-heading">
						<div>
							<p className="eyebrow">ACOMPANHE</p>
							<h2>Principais criptomoedas</h2>
						</div>
						<div className="market-controls">
							<label className="search-box">
								<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.2 13.2 4 4" /></svg>
								<input
									type="search"
									placeholder="Buscar criptomoedas..."
									value={search}
									onChange={(event) => setSearch(event.target.value)}
									aria-label="Buscar criptomoedas"
								/>
								<kbd>/</kbd>
							</label>
							<label className="currency-select-wrap">
								<span className="visually-hidden">Moeda de exibição</span>
								<select
									className="currency-select"
									value={selectedCurrency}
									onChange={(event) => setSelectedCurrency(event.target.value as DisplayCurrency)}
									aria-label="Moeda de exibição"
								>
									<option value="BRL">R$ BRL</option>
									<option value="USD">$ USD</option>
								</select>
							</label>
						</div>
					</div>

					<div className="table-card">
						<div className="crypto-table-wrap">
							<table className="crypto-table">
								<thead>
									<tr>
										<th className="rank-column">#</th>
										<th>Ativo</th>
										<th className="align-right">Preço</th>
										<th className="align-right">Variação (24h)</th>
										<th className="align-right optional-column">Capitalização</th>
										<th className="align-right optional-column">Volume (24h)</th>
									</tr>
								</thead>
								<tbody>
									{loading && Array.from({ length: 7 }, (_, index) => (
										<tr className="loading-row" key={`loading-${index}`}>
											<td><span className="skeleton skeleton-short" /></td>
											<td><div className="asset-cell"><span className="skeleton skeleton-icon" /><span className="skeleton skeleton-name" /></div></td>
											<td className="align-right"><span className="skeleton skeleton-value" /></td>
											<td className="align-right"><span className="skeleton skeleton-value" /></td>
											<td className="align-right optional-column"><span className="skeleton skeleton-value" /></td>
											<td className="align-right optional-column"><span className="skeleton skeleton-value" /></td>
										</tr>
									))}
									{!loading && visibleCryptos.map((crypto) => {
										const isPositive = crypto.changePercent24Hr >= 0;
										return (
											<tr key={crypto.id}>
												<td className="rank-column">{crypto.rank}</td>
												<td>
													<div className="asset-cell">
														<span className={`coin-avatar coin-${crypto.symbol.toLowerCase()}`} aria-hidden="true">
															{crypto.symbol.slice(0, 1)}
														</span>
														<span className="asset-name">{crypto.name}<span className="asset-symbol">{crypto.symbol}</span></span>
													</div>
												</td>
												<td className="align-right price-cell">{formatCurrency(crypto.priceUsd, selectedCurrency, usdToBrlRate)}</td>
												<td className={`align-right change-cell ${isPositive ? "positive" : "negative"}`}>
													<span className="change-arrow" aria-hidden="true">{isPositive ? "↗" : "↘"}</span>
													{Number.isFinite(crypto.changePercent24Hr) ? `${Math.abs(crypto.changePercent24Hr).toFixed(2)}%` : "—"}
												</td>
												<td className="align-right optional-column data-cell">{formatCurrency(crypto.marketCapUsd, selectedCurrency, usdToBrlRate, true)}</td>
												<td className="align-right optional-column data-cell">{formatCurrency(crypto.volumeUsd24Hr, selectedCurrency, usdToBrlRate, true)}</td>
											</tr>
										);
									})}
									{!loading && visibleCryptos.length === 0 && (
										<tr>
											<td className="empty-state" colSpan={6}>
												<span className="empty-icon" aria-hidden="true">⌕</span>
												<strong>{cryptos.length ? "Nenhuma moeda encontrada" : "Dados do mercado indisponíveis"}</strong>
												<span>{cryptos.length ? "Tente buscar por outro nome ou símbolo." : "Tente novamente em instantes."}</span>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<footer className="table-footer">
							<span>{loading ? "Carregando dados do mercado..." : `Exibindo ${visibleCryptos.length} de ${cryptos.length} criptoativos`}</span>
							<span className="data-source">
								<span />
								{selectedCurrency === "BRL" && usdToBrlRate === null
									? "Cotação do real indisponível"
									: `Valores em ${selectedCurrency === "BRL" ? "reais (BRL)" : "dólares (USD)"}`}
							</span>
						</footer>
					</div>
					<p className="disclaimer">Os dados do mercado são apenas para fins informativos.</p>
				</section>
			</div>
		</main>
	);
}

export default Home;
