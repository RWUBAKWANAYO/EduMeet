import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Layout } from "./components/Layout";
import { UIProvider } from "./hooks/context/UIContext";
import { NewMeeting } from "./pages/NewMeeting";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/meetings/new" element={<NewMeeting />} />
          </Route>
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
};

export default App;

