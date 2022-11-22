import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/LoginPage";
import { ManagementTable } from "./components/ManagementTable";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import "./styles.css";
import { useEffect, useState } from "react";

const MyRoutes = () => {
  const [userFactory, setUserFactory] = useState();
  const [realStateFactory, setRealStateFactory] = useState();

  useEffect(() => {
    fetch("http://localhost:5173/api/users")
    .then(response => response.json())
    .then(data => setUserFactory(data));

    fetch("http://localhost:5173/api/real-states")
    .then(response => response.json())
    .then(data => setRealStateFactory(data)); 
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <div className="main-container">
                <Sidebar />
                <Dashboard />
              </div>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Header />
              <div className="main-container">
                <Sidebar />
                <ManagementTable 
                  title="Clientes"
                  entityType="user"
                  users={userFactory?.users}
                  setUserFactory={setUserFactory}
                />
              </div>
            </>
          }
        />
        <Route
          path="/real-state"
          element={
            <>
              <Header />
              <div className="main-container">
                <Sidebar />
                <ManagementTable 
                  title="Imóveis"
                  entityType="real state"
                  realStates={realStateFactory?.realStates}
                  setRealStateFactory={setRealStateFactory}
                />
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
