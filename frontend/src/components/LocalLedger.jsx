import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchLedger,
    reconcile,
    tamperVote,
    repairLedger
} from "../api.js";
import { useVoting } from "../context/VotingContext";

function shortHash(hash) {
  return hash;
}

export default function LocalLedger() {
  const [votes, setVotes] = useState([]);
  const [status, setStatus] = useState(null);
  const [reconciling, setReconciling] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [hasMismatch, setHasMismatch] = useState(false);

  const { refreshKey, refresh, setTxHash } = useVoting();
  const navigate = useNavigate();

  const loadVotes = useCallback(() => {
    return fetchLedger().then((data) => {
      setVotes(data.votes);
      setHasMismatch(false);
      setStatus(null);
    });
  }, []);

  useEffect(() => {
    loadVotes();
  }, [loadVotes, refreshKey]);

  async function handleReconcile() {
    try {
      setReconciling(true);

      setStatus({
        kind: "pending",
        message: "Re-checking every vote against Blockfrost..."
      });

      const data = await reconcile();

      const mismatches = data.results.filter(
        r => r.status === "mismatch"
      ).length;

      setHasMismatch(mismatches > 0);

      setStatus({
        kind: mismatches ? "err" : "ok",
        message: mismatches
          ? `${mismatches} vote(s) don't match the blockchain.`
          : "Every local vote matches what's confirmed on-chain."
      });

      setVotes(data.results);

    } catch (err) {

      setStatus({
        kind: "err",
        message: err.message
      });

    } finally {

      setReconciling(false);

    }
  }

  async function handleTamper(vote) {
    const other =
      vote.choice === "candidate_a"
        ? "candidate_b"
        : "candidate_a";

    const newChoice = window.prompt(
      "Rewrite this vote's LOCAL record only (no on-chain change):",
      other
    );

    if (!newChoice) return;

    await tamperVote(vote.id, newChoice);

    await loadVotes();

    refresh();

    setStatus({
      kind: "pending",
      message: "Local ledger modified. Reconcile with the blockchain to verify integrity.",
    });
  }

  function handleRepair() {
    if (!window.confirm("Restore every tampered record from the blockchain?")) {
      return;
    }

    setRepairing(true);

    setStatus({
      kind: "pending",
      message: "Restoring records..."
    });

    repairLedger()
      .then((data) => {
        setHasMismatch(false);
          setStatus({
            kind: "ok",
            message:`${data.fixed} record(s) restored from blockchain.`,
          });
          return loadVotes();
        })
      .then(() => {
        refresh();
      })
      .catch((err) => {
        setStatus({
          kind: "err",
          message: err.message,
        });
      })
      .finally(() => {
        setRepairing(false);
      });
  }

  return (
    <section className="card">
      <span className="eyebrow">Reconcile</span>
      <h2>Local ledger vs. the blockchain</h2>
      <p className="hint">
        This is what the app's own database believes happened. Use
        Tamper on any row to simulate an attacker editing this
        database directly then reconcile to see it caught.
      </p>

      <div className="actions">
        <button className="secondary" onClick={loadVotes}>
          Refresh
        </button>
        <button onClick={handleReconcile} disabled={reconciling}>
          {reconciling ? "Reconciling..." : "Reconcile with blockchain"}
        </button>
        {hasMismatch && (
            <button
                onClick={handleRepair}
                disabled={repairing}
            >
                {repairing
                    ? "Repairing..."
                    : "Repair Local Database"}
            </button>
        )}
      </div>

      {status && (
        <p className={`status-line ${status.kind}`}>{status.message}</p>
      )}

      {votes.length === 0 ? (
        <p className="empty">No votes cast yet.</p>
      ) : (
        <ul className="ledger-list">
          {votes.map((v) => (
            <li key={v.id} className={`ledger-row ${v.status || ""}`}>
              <div className="ledger-fields">
                <div className="ledger-field">
                  <span className="field-label">Poll</span>
                  <span className="field-value">{v.pollId}</span>
                </div>
                <div className="ledger-field">
                  <span className="field-label">Local</span>
                  <span className="field-value">{v.choice}</span>
                </div>
                <div className="ledger-field">
                  <span className="field-label">On-chain</span>
                  <span className="field-value">{v.onChainChoice ?? "—"}</span>
                </div>
                <div className="ledger-field">
                  <span className="field-label">Status</span>
                  {v.status ? (
                    <span className={`badge ${v.status}`}>{v.status}</span>
                  ) : (
                    <span className="field-value">—</span>
                  )}
                </div>
              </div>

              <div className="ledger-actions">
                <span className="hash-text">{v.txHash}</span>

                <div className="ledger-buttons">
                  <button
                    className="tx-icon"
                    title="Copy transaction hash"
                    onClick={() => {
                      navigator.clipboard.writeText(v.txHash);
                      setStatus({
                        kind: "ok",
                        message: "Transaction hash copied.",
                      });
                    }}
                  >
                    📋
                  </button>

                  <button
                    className="tx-icon"
                    title="Verify transaction"
                    onClick={() => {
                      setTxHash(v.txHash);
                      navigate("/verify");
                    }}
                  >
                    🔍
                  </button>

                  <button className="tamper-btn" onClick={() => handleTamper(v)}>
                    Tamper
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
