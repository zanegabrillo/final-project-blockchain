import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card hero">
      <span className="eyebrow">Cardano · Preprod</span>
      <h2>Voting ledger &amp; tamper check</h2>
      <p>
        Every vote is submitted as a real transaction on the Cardano preprod
        testnet. The app also keeps a local database for convenience. This
        demo shows why that local copy can't be trusted on its own, and how
        checking it against the blockchain catches tampering.
      </p>
      <div className="actions">
        <Link to="/vote">
          <button>Cast a vote</button>
        </Link>
        <Link to="/ledger">
          <button className="secondary">View the ledger</button>
        </Link>
      </div>
    </section>
  );
}
