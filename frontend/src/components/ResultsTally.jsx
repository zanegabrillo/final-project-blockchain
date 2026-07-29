import { useEffect, useState, useCallback } from "react";
import { fetchTally } from "../api.js";
import { useVoting } from "../context/VotingContext";

function formatLabel(choice) {
  return choice
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ResultsTally() {
  const [tally, setTally] = useState({});
  const [total, setTotal] = useState(0);

  const { refreshKey } = useVoting();

  const load = useCallback(() => {
    return fetchTally().then((data) => {
      setTally(data.tally);
      setTotal(data.total);
    });
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);

  return (
    <section className="card">
      <span className="eyebrow">Results</span>
      <h2>Current tally</h2>
      <p className="hint">
        Results stored in the app's own database, updated after every vote.
        This is not a blockchain source of truth.
      </p>

      {total === 0 ? (
        <p className="empty">No votes cast yet.</p>
      ) : (
        <>
          <p className="tally-total">
            <strong>{total}</strong> vote{total === 1 ? "" : "s"} recorded
          </p>
          {entries.map(([choice, count]) => {
            const pct = total ? Math.round((count / total) * 100) : 0;
            return (
              <div className="tally-row" key={choice}>
                <div className="tally-label">
                  <span className="name">{formatLabel(choice)}</span>
                  <span className="count">
                    {count} · {pct}%
                  </span>
                </div>
                <div className="tally-bar-track">
                  <div
                    className="tally-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </section>
  );
}
