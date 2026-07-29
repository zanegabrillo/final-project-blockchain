import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}
