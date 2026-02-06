import { useSearchParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";



const SearchBarBasic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
 const [busca, setBusca] = useState("");

const handlePesquisar = () => {
  setSearchParams({ nome_peca: busca });
};


const handleResetar = () => {
  setSearchParams();
  setBusca("")
};


return (
  <Row className="justify-content-start align-items-center">
    <Col xs={8} md={6} lg={5}>
      <input
        className="form-control"
        type="text"
        placeholder="Pesquisar peças"
        aria-label="Pesquisar peças"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      </Col>

      <Col xs="auto">
        <Button variant="dark" onClick={handlePesquisar}>
          Pesquisar
        </Button>
      </Col>
      <Col xs="auto">
        <Button variant="light" onClick={handleResetar}>
          Resetar
        </Button>
      </Col>
    </Row>
  );
};
export default SearchBarBasic;
