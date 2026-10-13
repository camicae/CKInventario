import PageHome from "../modules/pages/PageHome";
import PageEditarInventario from "../modules/pages/PageEditarInventario";
import AdicionarItem from "../modules/EditarInventario/adicionarItem";


const routes = [
  {
    path: "/pesquisar_inventario",
    element: <PageHome />,
    breadcrumb: "placeholder",
  },
   {
    path: "/editar_inventario",
    element: <PageEditarInventario />,
    breadcrumb: "placeholder",
  },
   {
    path: "/editar_inventario/adicionar_item",
    element: <AdicionarItem />,
    breadcrumb: "placeholder",
  },
  // {
  //   path: "/pesquisar_inventario/filtro_subsistema",
  //   element: <FiltrarPorSubsistema />,
  //   breadcrumb: "placeholder",
  // },
];

export {routes}