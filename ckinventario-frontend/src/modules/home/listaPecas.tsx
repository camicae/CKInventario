import React, { useState, useEffect } from "react";
import inventarioService from "../../service/inventarioService";
import { type PecasGerais } from "./types";
import { useSearchParams, type SetURLSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Row, Col, Table, Tab, Button, Alert } from "react-bootstrap";
import SearchBarBasic from "../utilities/searchBar";

interface ListarPecasProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const ListarPecas = ({ searchParams, setSearchParams }: ListarPecasProps) => {
  const [pecas, setPecas] = useState<PecasGerais[]>([]);
  // const [searchParams, setSearchParams] = useSearchParams();

  const carregarPecas = () => {
    inventarioService.listarPecas(searchParams.toString()).then((response) => {
      console.log(response.data);
      console.log(searchParams.toString());
      setPecas(response.data);
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

    carregarPecas();
  }, [searchParams]);

  return (
    <div className=" p-5">
      <SearchBarBasic />
      <Row>
        <Table
          responsive
          variant="warning"
          className="table table-striped table-hover  mt-3 ms-1"
        >
          <thead className="Table-dark ">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Peça</th>
              <th scope="col">Subsistema</th>
              <th scope="col">Data de fabricação</th>
              <th scope="col">Data de aquisição</th>
            </tr>
          </thead>

          <tbody>
            {pecas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhuma peça encontrada
                </td>
              </tr>
            ) : (
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
