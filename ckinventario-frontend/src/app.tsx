import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {routes} from "./routes";

const App = () => {
  return (
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
  );
};

export default App;
