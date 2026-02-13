import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import ListarPecas from "./listaPecas";
import { Container, Row, Col } from "react-bootstrap";

const Index = () => {
  document.title = "CKInventário";
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div >
              <ListarPecas
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                 isDisabled={false}
              />{" "}
            </div>
          </Col>
        </Row>
      </Container>
      ;
    </div>
  );
};

export default Index;
