import { useSearchParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";


//PLANEJAR MELHOR: 
// Arquitetura da pesquisa pela peça: será integrada com a homepage ou será um componente separado?



// Componente de filtro de pesquisa
// utilizando o hook useSearchParams do react-router para manipular os parâmetros de pesquisa na URL    

const FiltroSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

    const handleFiltroClick = (filtro: string) => {
        // Atualiza os parâmetros de pesquisa na URL com o filtro selecionado
        setSearchParams((prev) => {
            prev.set("filtro", filtro);
            return prev;
        });
    }

    const handleLimparClick = () => {
        // Limpa os parâmetros de pesquisa na URL
        setSearchParams({});
    }   
}