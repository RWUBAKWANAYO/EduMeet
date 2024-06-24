import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Layout } from "./components/Layout";
import { UIProvider } from "./hooks/context/UIContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
};

export default App;

