import Table from "react-bootstrap/Table";

import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

export default function StockApp() {
  const [companies, setCompanies] = useState({});
  const [stocks, setStocks] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch("/data/company.json");
      const data = await response.json();
      setCompanies(data);
    };

    const fetchStocks = async () => {
      const response = await fetch("/data/stock.json");
      const data = await response.json();
      setStocks(data);
    };

    fetchCompanies();
    fetchStocks();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const filtered = stocks[selectedCompany.code] || [];
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks([]);
    }
  }, [selectedCompany, stocks]);

  useEffect(() => {
    console.log("Companies data: ", companies);
  }, [companies]);

  useEffect(() => {
    console.log("Stocks Data: ", stocks);
  }, [stocks]);

  useEffect(() => {
    console.log("Selected Company changed: ", selectedCompany);
  }, [selectedCompany]);

  useEffect(() => {
    console.log("Filtered Stocks updated: ", filteredStocks);
  }, [filteredStocks]);

  return (
    <Row>
      <Col xs={4}>
        <h3>
          ETF:{" "}
          <a target="_blank" rel="noreferrer" href="https://www.soletf.com/ko/fund/etf/210895">
            SOL 200Top10
          </a>
        </h3>
        <div>
          <ListGroup>
            {companies.items &&
              companies.items.map((company, index) => (
                <ListGroup.Item onClick={() => setSelectedCompany(company)} key={company.code ?? index}>
                  <div>회사이름: {company.name}</div>
                  <div>종목코드: {company.code}</div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
      </Col>

      <Col xs={8}>
        <h3>주식: {selectedCompany?.name}</h3>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>날짜</th>
                <th>종가</th>
                <th>시가</th>
                <th>고가</th>
                <th>저가</th>
                <th>거래대금</th>
              </tr>
            </thead>

            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stock.date}</td>
                  {stock.change === "RISE" ? (
                    <td style={{ color: "red" }}>{stock.tradePrice}</td>
                  ) : stock.change === "FALL" ? (
                    <td style={{ color: "blue" }}>{stock.tradePrice}</td>
                  ) : (
                    <td>{stock.tradePrice}</td>
                  )}
                  <td>{stock.openingPrice}</td>
                  <td>{stock.highPrice}</td>
                  <td>{stock.lowPrice}</td>
                  <td>{stock.candleAccTradePrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}
