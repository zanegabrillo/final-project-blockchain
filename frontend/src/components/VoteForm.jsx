import { useState } from "react";
import { castVote } from "../api.js";
import { useVoting } from "../context/VotingContext";

export default function VoteForm() {
  const [pollId, setPollId] = useState("election_2026_demo");
  const [choice, setChoice] = useState("candidate_a");
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { notifyVote } = useVoting();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ kind: "pending", message: "Submitting to preprod..." });
    setResult(null);

    return castVote({ pollId, choice })
      .then((data) => {
      setStatus({
        kind: "ok",
        message: "Submitted. Confirmation usually takes ~20-40s.",
      });
      setResult(data);
      notifyVote(data.txHash);
      })
      .catch((err) => {
        setStatus({ kind: "err", message: `Error: ${err.message}` });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <section className="card">
      <span className="eyebrow">Cast a vote</span>
      <h2>Submit a vote</h2>
      <p className="hint">
        Builds, signs, and submits a Cardano preprod transaction to record your vote.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="pollId">Poll ID</label>
            <input
              id="pollId"
              type="text"
              value={pollId}
              onChange={(e) => setPollId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="choice">Choice</label>
            <select
              id="choice"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
            >
              <option value="candidate_a">Candidate A</option>
              <option value="candidate_b">Candidate B</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit vote"}
        </button>
      </form>

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
