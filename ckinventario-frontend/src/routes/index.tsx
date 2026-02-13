import PageHome from "../modules/pages/PageHome";
import PageEditarInventario from "../modules/pages/PageEditarInventario";
import AdicionarItem from "../modules/EditarInventario/adcItem";


const routes = [
  {
    path: "/",
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
];

export {routes}