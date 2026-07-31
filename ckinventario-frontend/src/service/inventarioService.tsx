import axios, { AxiosError } from "axios";
import api from "../api/api";
import { type novaPeca } from "../modules/EditarInventario/types";

// retorna todas as peças
const inventarioService = {
  async listarPecas(parametros: string) {
    return api.get(`/pesquisar?${parametros}`);
  },

  
  async adicionarPeca(parametros: novaPeca) {
    return api.post(`/editar_inventario/adicionar_item`, parametros);
  }
};

export default inventarioService;
