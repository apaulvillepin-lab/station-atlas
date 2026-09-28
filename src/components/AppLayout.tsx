import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <header className="header">
        <span className="brand">Station Atlas</span>
        <nav className="nav">
          <NavLink to="/docks">Quais</NavLink>
          <NavLink to="/requests">Demandes</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </>
  );
}