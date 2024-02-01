import React, { useState } from "react";
import { BrowserRouter as Router, Link, Navigate, Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import { ReactNode } from "react";

interface AuthProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<{ auth: AuthProps; children: ReactNode }> = ({ auth, children }) => {
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

const PrivateWrapper: React.FC<{ auth: AuthProps; }> = ({ auth }) => {
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const Login: React.FC<{ setAuth: (value: AuthProps) => void }> = ({ setAuth }) => {
  const handleLogin = () => {
    // Simulating authentication, replace with your actual authentication logic
    setAuth({ isAuthenticated: true });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthProps>({ isAuthenticated: false });

  const handleLogout = () => {
    setAuth({ isAuthenticated: false });
  };

  return (
    <Router>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        {auth.isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
        <div>
          <Link to="/dashboard1">Dashboard1 w/o auth</Link>{" "}
          <Link to="/dashboard2">Dashboard2 w/ auth</Link>{" "}
        </div>
        <div>
          <Link to="/dashboard3">Dashboard3 w/o auth wrapper</Link>{" "}
          <Link to="/dashboard4">Dashboard4 w/ auth wrapper</Link>{" "}
        </div>
        <Routes>
          <Route path="login" element={<Login setAuth={setAuth} />} />
          <Route
            path="/dashboard1"
            element={
              <PrivateRoute auth={auth}>
                <h1>Dashboard 1</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard2"
            element={
              <PrivateRoute auth={auth}>
                <h1>Dashboard 2</h1>
              </PrivateRoute>
            }
          />

          <Route element={<PrivateWrapper auth={auth} />}>
            <Route path="/dashboard3" element={<h1>Dashboard 3</h1>} />
          </Route>
          <Route element={<PrivateWrapper auth={auth} />}>
            <Route path="/dashboard4" element={<h1>Dashboard 4</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
