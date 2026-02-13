import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ListarPecas from "../Home/listaPecas";
import { Container, Row, Col, Button } from "react-bootstrap";
import AdicionarItem from "./adcItem";


const Index = () => {
  document.title = "Editar";
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDisabled, setIsDisabled] = useState(true);
// const [mostrarAdicionar, setMostrarAdicionar] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Container  className="mt-5">
        {/* Adicionar */}
        <Row className="justify-content-center mb-3 ">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <Button
              variant="success"
              className="w-100"
              onClick={() => (navigate('/editar_inventario/adicionar_item'))}
            >
              Adicionar item
            </Button>
          </Col>
        </Row>

        {/* Remover */}
        <Row className="justify-content-center mb-3">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <Button variant="danger" className="w-100">
              Remover item
            </Button>
          </Col>
        </Row>

        {/* Editar */}
        <Row className="justify-content-center mb-3">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <Button variant="warning" className="w-100">
              Editar item
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* Tabela */}
        {isDisabled === false && (
          <Row className="justify-content-center mt-5 mb-3">
            <Col xs={8} sm={10} md={8} lg={8} xl={8}>
              <div className="d-flex justify-content-end mb-1">
                <Button
                  variant="danger"
                  className="w-10"
                  onClick={() => setIsDisabled(true)}
                >
                  X
                </Button>
              </div>

              <ListarPecas
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isDisabled={false}
              />
            </Col>
          </Row>
        )}

      </Container>
    </div>
  );
};

export default Index;
