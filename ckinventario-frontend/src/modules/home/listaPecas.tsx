import React, { useState, useEffect } from "react";
import inventarioService from "../../service/inventarioService";
import { type PecasGerais } from "./types";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { Row, Col, Table, Tab, Button, Alert } from "react-bootstrap";

const ListarPecas = () => {
  const [pecas, setPecas] = useState<PecasGerais[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

//   //por enquanto, nao acompanha o estado de nd
//   useEffect(() => {
//     //carrega todas as pecas
//     setSearchParams("");
//     inventarioService
//       .listarPecas(searchParams.toString())
//       .then((response) => {
//         console.log(response.data);
//         setPecas(response.data);
//         toast(
//           <div>
//             Carregamento concluído. <br /> Verifique o console
//           </div>,
//           { duration: 2000 },
//         );
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  const carregarPecas = () => {
    setSearchParams("");
    inventarioService.listarPecas(searchParams.toString()).then((response) => {
      console.log(response.data);
      setPecas(response.data);
    });
  };

  return (
    <div className=" p-5">
      
      <Button
        variant="dark"
        className="position-absolute top-50 start-50 translate-middle"
        onClick={carregarPecas}
      >
        Pesquisar
      </Button>
      <Table
        variant="warning"
        className="Table Table-striped Table-hover w-50 p-3 mx-auto"
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
                <td>{peca.subsistema_id}</td>
                <td>{peca.data_fabricacao ?? "--"}</td>
                <td>{peca.data_aquisicao ?? "--"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListarPecas;
