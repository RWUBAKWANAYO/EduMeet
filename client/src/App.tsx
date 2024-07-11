import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MeetingsProvider } from "./hooks/context/meetings/MeetingsContext";
import Home from "./pages/Home";
import { Layout } from "./components/Layout";
import { UIProvider } from "./hooks/context/UIContext";
import { NewMeeting } from "./pages/NewMeeting";
import Meetings from "./pages/Meetings";
import { Analytics } from "./pages/Analytics";
import JoinMeeting from "./pages/JoinMeeting";
import { MeetingRoom } from "./pages/MeetingRoom";
import { Auth } from "./pages/Auth";
import { UserProvider } from "./hooks/context/UserContext";
import { RequireAuth, RequireNoAuth } from "./hooks/custom/protectRoute";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <UIProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Routes>
              <Route element={<RequireAuth />}>
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
                  <Route path="meetings/:meetingId/analytics" element={<Analytics />} />
                  <Route path="/meetings/new" element={<NewMeeting />} />
                </Route>
                <Route path="rooms/:meetingId" element={<MeetingRoom />} />
                <Route path="join-meeting" element={<JoinMeeting />} />
              </Route>
              <Route element={<RequireNoAuth />}>
                <Route path="/auth" element={<Auth />} />
              </Route>
            </Routes>
          </UserProvider>
        </QueryClientProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

export default App;

