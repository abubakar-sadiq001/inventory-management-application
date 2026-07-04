import AppLayout from "./components/AppLayout";
import Courseware from "./pages/Courseware";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import StudyCenters from "./pages/StudyCenters";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ToasterProvider from "./components/ToasterProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="courseware" element={<Courseware />} />
            <Route path="studyCenters" element={<StudyCenters />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="users" element={<Users />} />
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>

          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {/* <Route path="rewards" element={<Rewards />} /> */}
        </Routes>
      </BrowserRouter>

      <ToasterProvider />
    </>
  );
}

export default App;
