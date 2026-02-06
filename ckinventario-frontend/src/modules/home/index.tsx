import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router-dom";

import ListarPecas from "./listaPecas";

const Index = () => {
  document.title = "CKInventário";
  // const [pecas, setPecas] = useState<PecasGerais[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container-fluid">
            {/* BRAND À ESQUERDA */}
            <Link
              to="/"
              className="navbar-brand d-flex align-items-center gap-2"
              onClick={() => setSearchParams({})}
            >
              <img
                src="src/assets/ck_logo.png"
                alt="Logo CK"
                width="75"
                height="75"
              />
              <span>CK Inventário</span>
            </Link>

            {/* TOGGLER */}
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen(!open)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* LINKS À DIREITA */}
            <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link navbar-toggler-icon"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                  ></button>

                  <ul className={`dropdown-menu ${open ? "show" : ""}`}>
                    <li>
                      <Link className="dropdown-item" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/pecas">
                        Peças
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <ListarPecas
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Index;
