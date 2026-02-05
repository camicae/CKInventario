import React, { useState, useEffect } from "react";
import inventarioService from "../../service/inventarioService";
import { type PecasGerais } from "./types";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { Row, Col, Table, Tab, Button, Alert } from "react-bootstrap";
import ListarPecas from "./listaPecas";

const Index = () => {
  const [pecas, setPecas] = useState<PecasGerais[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className=" p-5">
      <Alert variant="warning" className="mx-auto w-50">
        <h1 className="text-center fw-bold">CKInventário</h1>
      </Alert>
      <ListarPecas />
    </div>
  );
};

export default Index;
