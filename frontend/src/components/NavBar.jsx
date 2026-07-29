import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/vote", label: "Vote" },
  { to: "/results", label: "Results" },
  { to: "/verify", label: "Verify" },
  { to: "/ledger", label: "Ledger" },
];

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          Cardano Voting Demo
        </NavLink>
        <div className="navbar-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navlink" + (isActive ? " active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
