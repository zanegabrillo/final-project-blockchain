const BASE = "/api";

async function asJson(res) {
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Request failed");
  return data;
}

export function castVote({ pollId, choice }) {
  return fetch(`${BASE}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pollId, choice }),
  }).then(asJson);
}

export function verifyTx(txHash) {
  return fetch(`${BASE}/vote/${txHash}`).then(asJson);
}

export function fetchLedger() {
  return fetch(`${BASE}/votes`).then(asJson);
}

export function fetchTally() {
  return fetch(`${BASE}/tally`).then(asJson);
}

export function reconcile() {
  return fetch(`${BASE}/reconcile`).then(asJson);
}

export function tamperVote(id, choice) {
  return fetch(`${BASE}/admin/tamper`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, choice }),
  }).then(asJson);
}

export function repairLedger() {
  return fetch(`${BASE}/repair`, {
    method: "POST",
  }).then(asJson);
}