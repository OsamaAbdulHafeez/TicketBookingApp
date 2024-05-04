import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomsColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to='/login' />
    }
    return children
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route index element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>} />
          {/* User */}
          <Route path="user">
            <Route index element={
              <ProtectedRoutes>
                <List columns={userColumns}/>
              </ProtectedRoutes>
            } />
            <Route path=":userId" element={
              <ProtectedRoutes>
                <Single />
              </ProtectedRoutes>
            } />
            <Route
              path="new"
              element={
                <ProtectedRoutes>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoutes>
              }
            />
          </Route>
          {/* Products */}
          <Route path="hotel">
            <Route index element={
              <ProtectedRoutes>
                <List columns={hotelColumns}/>
              </ProtectedRoutes>
            } />
            <Route path=":hotelId" element={
              <ProtectedRoutes>
                <Single />
              </ProtectedRoutes>
            } />
            <Route
              path="new"
              element={
                <ProtectedRoutes>
                  <NewHotel/>
                </ProtectedRoutes>
              }
            />
          </Route>
          {/* Rooms */}
          <Route path="room">
            <Route index element={
              <ProtectedRoutes>
                <List columns={roomsColumns}/>
              </ProtectedRoutes>
            } />
            <Route path=":roomId" element={
              <ProtectedRoutes>
                <Single />
              </ProtectedRoutes>
            } />
            <Route
              path="new"
              element={
                <ProtectedRoutes>
                  <NewRoom/>
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
