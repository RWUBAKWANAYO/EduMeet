import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MeetingsProvider } from "./hooks/context/MeetingsContext";
import Home from "./pages/Home";
import { Layout } from "./components/Layout";
import { UIProvider } from "./hooks/context/UIContext";
import { NewMeeting } from "./pages/NewMeeting";
import Meetings from "./pages/Meetings";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="meetings"
              element={
                <MeetingsProvider>
                  <Meetings />
                </MeetingsProvider>
              }
            />
            <Route path="/meetings/:meetingId/room" element={<NewMeeting />} />
            <Route path="/meetings/new" element={<NewMeeting />} />
          </Route>
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
};

export default App;

