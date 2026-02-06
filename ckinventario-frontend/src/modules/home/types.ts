interface PecasGerais {
  id:string;
  nome:string;
  subsistema_nome:string;
  // caso exista.
  // pode ser null
  data_fabricacao:string;
  // caso exista.
  // pode ser null
  data_aquisicao:string;
}
export {type PecasGerais};