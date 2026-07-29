import { useEffect, useRef, useState } from "react";
import { verifyTx } from "../api.js";
import { useVoting } from "../context/VotingContext";

export default function VerifyPanel() {
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);

  // Context only carries a one-time hand-off value (e.g. from the
  // Ledger page's verify icon). The actual form state below is local,
  // so it resets naturally whenever this page unmounts/remounts.
  const { txHash: incomingHash, setTxHash: setContextTxHash } = useVoting();
  const [hash, setHash] = useState(incomingHash);
  const consumedRef = useRef(false);

  function handleVerify(hashToCheck = hash) {
    const trimmed = hashToCheck.trim();
    if (!trimmed) return;

    setChecking(true);
    setStatus({ kind: "pending", message: "Checking Blockfrost..." });
    setResult(null);

    return verifyTx(trimmed)
      .then((data) => {
        setStatus({
          kind: data.confirmed ? "ok" : "pending",
          message: data.confirmed
            ? "Confirmed on-chain."
            : "Not yet confirmed - try again in a few seconds.",
        });
        setResult(data);
      })
      .catch((err) => {
        setStatus({ kind: "err", message: `Error: ${err.message}` });
      })
      .finally(() => {
        setChecking(false);
      });
  }

  // Runs once per mount. Consumes the hand-off hash from context (if any),
  // auto-checks it, then clears context so it doesn't linger for next time.
  useEffect(() => {
    if (!consumedRef.current && incomingHash) {
      consumedRef.current = true;
      setHash(incomingHash);
      handleVerify(incomingHash);
      setContextTxHash("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="card">
      <span className="eyebrow">Verify a transaction</span>
      <h2>Check a single vote on-chain</h2>
      <p className="hint">
        Re-fetches the transaction and its metadata straight from
        Blockfrost, independent of anything stored locally.
      </p>

      <label htmlFor="txHash">Transaction hash</label>
      <input
        id="txHash"
        type="text"
        placeholder="paste a tx hash"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
      />
      <button onClick={() => handleVerify()} disabled={checking}>
        {checking ? "Checking..." : "Verify on-chain"}
      </button>

      {status && (
        <p className={`status-line ${status.kind}`}>{status.message}</p>
      )}
      {result && (
        <details className="raw">
          <summary>Raw response</summary>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </details>
      )}
    </section>
  );
}