import axios, { AxiosError } from "axios";
import api from "../api/api";

// retorna todas as peças
const inventarioService = {
  async listarPecas(parametros: string) {
    return api.get(`/pesquisar?${parametros}`);
  },
};

export default inventarioService;
