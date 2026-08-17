import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import inventarioService from "../../service/inventarioService";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { type novaPeca } from "./types";
import { MdOutlineCloseFullscreen } from "react-icons/md";
// Componente para adicionar um item ao inventário

// Define a nova peça com valores iniciais vazios
const pecaAvulsa: novaPeca = {
  nome_peca: "",
  subsistema_peca: "",
  data_fabricacao: "",
  data_aquisicao: "",
};

const subsistemas: Record<string, string>[] = [
  { id: "1", nome: "Eletrônica" },
  { id: "2", nome: "Suspensão e Direção" },
  { id: "3", nome: "Estrutura e Design" },
  { id: "4", nome: "Freio" },
];

const AdicionarItem = () => {
  document.title = "CKInventário";
  const [exibirCard, setExibirCard] = useState(false);
  const [pecaAdicionada, setPecaAdicionada] = useState<novaPeca | null>(null);
  const [data, setData] = useState("");
  const [subsistemaSelecionado, setSubsistemaSelecionado] = useState("");
  const [fabricacaoCheck, setFabricacaoCheck] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  // APENAS PARA TESTE! CASO CONTRARIO, NÃO UTILIZE 
  // const pecaTeste: novaPeca = {
  //   nome_peca: "Teste",
  //   subsistema_peca: "1",
  //   data_fabricacao: "2023-01-01",
  //   data_aquisicao: "2023-01-01",
  // };

  // chama metodo de listagem com os parâmetros da nova peça,
  // para exibir a peça adicionada na tela
  const mostrarPecaAdicionada = (peca: novaPeca) => {
    inventarioService
      .listarPecas(JSON.stringify(peca))
      .then((response) => {
        console.log("Peça adicionada:", response.data);
        setExibirCard(true);
        //setPecaAdicionada(response.data);
        setPecaAdicionada(peca);
      })
      .catch((error: AxiosError) => {
        console.error("Erro ao exibir peça:", error);
        toast.error("Erro ao adicionar peça. Por favor, tente novamente.");
      });
  };

  const handleAdicionar = (peca: novaPeca) => {
    if (
      !peca.nome_peca ||
      !peca.subsistema_peca ||
      (!peca.data_fabricacao && !peca.data_aquisicao)
    ) {
      console.error("Erro: Campos obrigatórios não preenchidos.");
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    } else {
      // chama a função do serviço para adicionar a peça
      inventarioService
        .adicionarPeca(peca)
        .then(() => {
          toast.success("Peça adicionada com sucesso!");
          // chama a função para exibir a peça adicionada
          mostrarPecaAdicionada(peca);
        })
        .catch((error: AxiosError) => {
          console.error("Erro ao adicionar peça:", error);
          toast.error("Erro ao adicionar peça. Por favor, tente novamente.");
        });
    }
  };

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

{/* Apenas para teste! Caso contrario, nao utilize */}
        {/* <Row className="justify-content-end mt-4">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="primary"
                onClick={() => {
                  mostrarPecaAdicionada(pecaTeste);
                }}
              >
                testar card
              </Button>
            </div>
          </Col>
        </Row> */}


        {exibirCard && (
          <div>
            <Row className="justify-content-start mt-4 mb-3">
              <Col xs={8} sm={10} md={8} lg={8} xl={8}>
                <Card>
                  <Card.Body>
                     <div
                        className="d-flex justify-content-end"
                        style={{ color: "#db1d0f" }}
                      >
                        <MdOutlineCloseFullscreen
                          size={30}
                          onClick={() => {
                            setExibirCard(false);
                            setPecaAdicionada(null);
                          }}
                        />
                      </div>
                    <Card.Title> <p><strong>Peça adicionada:</strong></p></Card.Title>
                    <div>
                      <p>
                        <strong>Nome:</strong> {pecaAdicionada?.nome_peca}
                      </p>
                      <p>
                        <strong>Subsistema:</strong>{" "}
                        {pecaAdicionada?.subsistema_peca}
                      </p>
                      <p>
                        <strong>Data de Fabricação:</strong>{" "}
                        {pecaAdicionada?.data_fabricacao}
                      </p>
                      <p>
                        <strong>Data de Aquisição:</strong>{" "}
                        {pecaAdicionada?.data_aquisicao}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        )}
        <h1>Insira as informações do item</h1>
        <Row className="justify-content-start">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div>
              <label className="col-form-label mt-4">Nome</label>
              {/* input para o nome da peça, atualiza o valor do objeto novaPeca */}
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                id="inputDefault"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  pecaAvulsa.nome_peca = e.target.value;
                  console.log(pecaAvulsa.nome_peca);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-start">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <div>
              <label className="col-form-label mt-4">Subsistema</label>

              {/* card com os subsitemas disponíveis, cada subsistema é um radio button
               para o usuario escolher */}
              <Card className="mt-2">
                <Card.Body>
                  {subsistemas.map((subsistema) => (
                    <div key={subsistema.id}>
                      <Form.Check
                        type="radio"
                        id={"subsistemas disponíveis"}
                        label={subsistema.nome}
                        checked={pecaAvulsa.subsistema_peca === subsistema.id}
                        onChange={() => {
                          pecaAvulsa.subsistema_peca = subsistema.id;
                          console.log(pecaAvulsa.subsistema_peca);
                          setSubsistemaSelecionado(subsistema.nome);
                        }}
                      />
                    </div>
                  ))}
                </Card.Body>
              </Card>
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
                value={
                  fabricacaoCheck
                    ? pecaAvulsa.data_fabricacao
                    : pecaAvulsa.data_aquisicao
                }
                onChange={(e) => {
                  fabricacaoCheck
                    ? (pecaAvulsa.data_fabricacao = e.target.value)
                    : (pecaAvulsa.data_aquisicao = e.target.value);
                  console.log(
                    fabricacaoCheck
                      ? pecaAvulsa.data_fabricacao
                      : pecaAvulsa.data_aquisicao,
                  );
                  setData(e.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-start mt-4">
          <Col xs={8} sm={10} md={8} lg={8} xl={8}>
            <Button
              variant="primary"
              onClick={() => {
                handleAdicionar(pecaAvulsa);
                //console.log("Nova peça:", pecaAvulsa);
              }}
            >
              Adicionar Item
            </Button>
          </Col>
        </Row>
      </Container>
      ;
    </div>
  );
};

export default AdicionarItem;
