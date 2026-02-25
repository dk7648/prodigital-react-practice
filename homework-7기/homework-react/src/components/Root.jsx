import { Col, Container, Row } from "react-bootstrap";
import StockApp from "./StockApp";
import UserApp from "./UserApp";

/**
 * 이 파일은 변경하지 마세요.
 */

export default function Root() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={4}>
          <UserApp />
        </Col>
        <Col xs={12} sm={8}>
          <StockApp />
        </Col>
      </Row>
    </Container>
  );
}
