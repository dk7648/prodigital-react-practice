import Table from "react-bootstrap/Table";

import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

export default function StockApp() {
  const [companies, setCompanies] = useState([]);
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
      const response = await fetch("/data/stocks.json");
      const data = await response.json();
      setStocks(data);
    };

    fetchCompanies();
    fetchStocks();
  }, []);

  useEffect(() => {
    console.log("Selected Company:", selectedCompany);
    console.log("Stocks Data:", stocks);
  }, [selectedCompany, stocks]);
  useEffect(() => {
    console.log("s:", selectedCompany ? "true" : "false");
    if (selectedCompany) {
      console.log(selectedCompany.code);
      console.log("ee", stocks);
      const filtered = stocks[selectedCompany.code] || [];
      console.log(filtered);
      setFilteredStocks(filtered);
    } else {
      setFilteredStocks([]);
    }
  }, [selectedCompany, stocks]);

  useEffect(() => {
    console.log("Selected Company:", selectedCompany);
    console.log("Filtered Stocks:", filteredStocks);
  }, [selectedCompany, filteredStocks]);
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
              </tr>
            </thead>

            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stock.date}</td>
                  <td>{stock.tradePrice}</td>
                  <td>{stock.openingPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}
