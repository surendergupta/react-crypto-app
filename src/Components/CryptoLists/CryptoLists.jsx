import React from "react";

import "./CryptoLists.css";
const CryptoLists = ({ cryptoLists, searchInput, formatNumber }) => {
  return (
    <div className="cryptoLists">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume(24hrs)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoLists &&
            cryptoLists
              .filter((crypto) =>
                crypto.name.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((crypto) => {
                return (
                  <tr key={crypto.id}>
                    <td>{crypto.market_cap_rank}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <img src={crypto.image} alt="logo" width="30px" />
                      {crypto.name}
                    </td>
                    <td>{crypto.symbol.toUpperCase()}</td>
                    <td>{`$ ${formatNumber(crypto.market_cap)}`}</td>
                    <td>{`$ ${formatNumber(crypto.current_price)}`}</td>
                    <td>{formatNumber(crypto.circulating_supply)}</td>
                    <td>{formatNumber(crypto.total_volume)}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoLists;
