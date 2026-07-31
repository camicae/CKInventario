import { useSearchParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
//import { useState } from "react";

// Componente de barra de pesquisa
// utilizando o hook useSearchParams do react-router para manipular os parâmetros de pesquisa na URL

const SearchBarBasic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [busca, setBusca] = useState("");

  // const handlePesquisar = () => {
  //   setSearchParams({ nome_peca: busca });
  // };

  const handleLimpar = () => {
    // limpa os parâmetros de pesquisa na URL
    setSearchParams();
    // setBusca("");
  };

  return (
    <Row className="justify-content-start align-items-center">
      <Col xs="auto" md={6} lg={5}>
        <input
          className="form-control"
          type="text"
          placeholder="Pesquisar peças"
          aria-label="Pesquisar peças"
          value={searchParams.get("nome_peca") || ""}
          // atualiza os parâmetros de pesquisa na URL assim que
          // o usuário digita na barra de pesquisa
          onChange={(e) => setSearchParams({ nome_peca: e.target.value })}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     handlePesquisar();
          //   }
          // }}
        />
      </Col>

      {/* <Col xs="auto">
        <Button variant="dark" className="w-100" onClick={handlePesquisar}>
          Pesquisar
        </Button>
      </Col> */}
      <Col xs="auto">
        <Button variant="light"  className="w-100" onClick={handleLimpar}>
          Limpar
        </Button>
      </Col>
    </Row>
  );
};
export default SearchBarBasic;
