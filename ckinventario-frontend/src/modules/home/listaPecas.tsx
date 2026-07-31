import React, { useState, useEffect } from "react";
import inventarioService from "../../service/inventarioService";
import { type PecasGerais } from "../home/types";
import { useSearchParams, type SetURLSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Row, Col, Table, Tab, Button, Alert } from "react-bootstrap";
import SearchBarBasic from "../utilities/searchBar";
import { AxiosError } from "axios";

interface ListarPecasProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  isDisabled: boolean;
}

const ListarPecas = ({ searchParams, setSearchParams, isDisabled }: ListarPecasProps) => {
  const [loading,setLoading] = useState(false);
  const [pecas, setPecas] = useState<PecasGerais[]>([]);
  // const [searchParams, setSearchParams] = useSearchParams();

  const carregarPecas = () => {
// chama requisição para listar peças com os parâmetros de pesquisa
// parametros sao opcionais, caso não existam,
// a requisição retorna todas as peças
    inventarioService.listarPecas(searchParams.toString()).then((response) => {
      console.log(response.data);
      console.log(searchParams.toString());
      setPecas(response.data);
      setLoading(false);
    }).catch((error: AxiosError) => {
      console.error("Erro ao carregar peças:", error);
      toast.error("Erro ao carregar peças. Por favor, tente novamente.");
    });

    // toast.promise(myPromise, {
    //   loading: "Loading",
    //   success: "Got the data",
    //   error: "Error when fetching",
    // });
  };



  useEffect(() => {
    // const temFiltro = searchParams.has("nome_peca");
    // if (!temFiltro) return;
    setLoading(true);

    carregarPecas();
  
  }, [searchParams]);

  return (
    <div className="mt-3 p-3">
      {/* adiciona barra de pesquisa */}
      {isDisabled == false ? (<SearchBarBasic/>): ('')}
      <Row className="w-70">
        {/* gera a tabela de peças */}
        <Table
          responsive="md"
          striped
          hover
          variant="warning"
          className="mt-3 small"
        >
        {/* cria o cabeçalho da tabela */}
          <thead className="Table-dark ">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Peça</th>
              <th scope="col">Subsistema</th>
              <th scope="col">Data de fabricação</th>
              <th scope="col">Data de aquisição</th>
            </tr>
          </thead>
        {/* cria o corpo da tabela */}
          <tbody>
            {/* verifica se o array de peças está vazio, */}
            {/* caso esteja, exibe uma mensagem de que não há peças cadastradas */}
            {pecas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhuma peça encontrada
                </td>
              </tr>
            ) : (
              // pesquisa no array de peças e cria uma linha para cada peça
              pecas.map((peca) => (
                <tr key={peca.id}>
                  <th scope="row">{peca.id}</th>
                  <td>{peca.nome}</td>
                  <td>{peca.subsistema_nome}</td>
                  <td>{peca.data_fabricacao ?? "--"}</td>
                  <td>{peca.data_aquisicao ?? "--"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default ListarPecas;
