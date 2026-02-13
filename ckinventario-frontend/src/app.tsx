import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Layout from "./modules/Layout/layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
