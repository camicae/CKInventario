import { Link, useSearchParams } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GiHomeGarage } from "react-icons/gi";
import { PiNotePencilFill } from "react-icons/pi";
import { FaUserCog } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="bg-light min-vh-100">
        <nav className="navbar navbar-expand-lg bg-dark mb-4" data-bs-theme="dark">
          <div className="container-fluid">
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center gap-2"
              onClick={() => setSearchParams({})}
            >
              <img
                src="/src/assets/ck_logo.png"
                alt="Logo CK"
                width="75"
                height="75"
              />
              <span>CK Inventário</span>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            >
              <ul className="navbar-nav ms-auto">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="home-tooltip">Home</Tooltip>}
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <GiHomeGarage size="40px" />
                    </Link>
                  </li>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="editar-tooltip">Editar Inventário</Tooltip>
                  }
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/editar_inventario/"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <PiNotePencilFill size="40px" />
                    </Link>
                  </li>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="usuario-tooltip">Usuário</Tooltip>}
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/Usuario"
                      onClick={() => setIsNavOpen(false)}
                    >
                      <FaUserCog size="40px" />
                    </Link>
                  </li>
                </OverlayTrigger>
              </ul>
            </div>
          </div>
        </nav>

        {/* Aqui entra o conteúdo dinâmico */}
        <main>{children}</main>
      </div>
    </>
  );
}
