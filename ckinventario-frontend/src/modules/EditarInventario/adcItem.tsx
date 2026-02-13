import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
// import ListarPecas from "./listaPecas";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const AdicionarItem = () => {
  document.title = "CKInventário";
  const [searchParams, setSearchParsams] = useSearchParams();
  const [fabricacaoCheck, setFabricacaoCheck] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Container className="mt-4">
        <Row className="justify-content-end">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div className="d-flex justify-content-end mb-1">
              <Button
                variant="warning"
                className="w-25"
                onClick={() => navigate("/editar_inventario/")}
              >
                Voltar
              </Button>
            </div>
          </Col>
        </Row>
        <h1>Insira as informações do item</h1>
        <Row className="justify-content-start">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div>
              <label className="col-form-label mt-4">Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                id="inputDefault"
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-start">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div>
              <label className="col-form-label mt-4">Subsistema</label>
              <input
                type="text"
                className="form-control"
                placeholder="Subsistema"
                id="inputDefault"
              />
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <Row className="justify-content-start mt-4">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div className="mb-3">
              <Form.Check
                inline
                type="radio"
                name="tipoData"
                label="Data de Fabricação"
                checked={fabricacaoCheck === true}
                onChange={() => setFabricacaoCheck(true)}
              />

              <Form.Check
                inline
                type="radio"
                name="tipoData"
                label="Data de Aquisição"
                checked={fabricacaoCheck === false}
                onChange={() => setFabricacaoCheck(false)}
              />
            </div>
            <div>
              <label className="col-form-label mt-4">
                {fabricacaoCheck ? "Data de Fabricação" : "Data de Aquisição"}
              </label>

              <input
                type="date"
                className="form-control"
                placeholder={
                  fabricacaoCheck ? "Data de Fabricação" : "Data de Aquisição"
                }
              />
            </div>
          </Col>
        </Row>
      </Container>
      ;
    </div>
  );
};

export default AdicionarItem;
