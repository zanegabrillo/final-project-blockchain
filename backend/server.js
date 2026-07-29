import "dotenv/config";
import express from "express";
import { randomUUID } from "crypto";
import { submitVote, verifyVote } from "./lib/vote.js";
import {
  getAllVotes,
  saveVote,
  tamperVote,
  replaceAllVotes,
} from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/vote", async (req, res) => {
  try {
    const { pollId, choice, voterRef } = req.body;
    const { txHash, metadata } = await submitVote({ pollId, choice, voterRef });

    const record = saveVote({
      id: randomUUID(),
      txHash,
      pollId: metadata.poll_id,
      choice: metadata.choice,
      voterRef: metadata.voter_ref,
      submittedAt: metadata.timestamp,
    });

    res.json({ ok: true, txHash, record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/vote/:txHash", async (req, res) => {
  try {
    const result = await verifyVote(req.params.txHash);
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/votes", (req, res) => {
  res.json({ ok: true, votes: getAllVotes() });
});

app.get("/api/tally", (req, res) => {
  const votes = getAllVotes();
  const tally = {};
  for (const v of votes) {
    tally[v.choice] = (tally[v.choice] || 0) + 1;
  }
  res.json({ ok: true, tally, total: votes.length });
});

app.post("/api/admin/tamper", (req, res) => {
  try {
    const { id, choice } = req.body;
    const updated = tamperVote(id, { choice, tampered: true });
    res.json({ ok: true, record: updated });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

app.get("/api/reconcile", async (req, res) => {
  try {
    const votes = getAllVotes();

    const results = await Promise.all(
      votes.map(async (local) => {
        const onChain = await verifyVote(local.txHash);

        if (!onChain.confirmed) {
          return { ...local, status: "pending", onChainChoice: null };
        }

        const onChainChoice = onChain.vote?.choice ?? null;
        const status = onChainChoice === local.choice ? "match" : "mismatch";

        return { ...local, status, onChainChoice };
      })
    );

    res.json({ ok: true, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/api/repair", async (req, res) => {
  console.log("=== /api/repair called ===");
  try {
    const votes = getAllVotes();

    let fixed = 0;

    const repaired = await Promise.all(
      votes.map(async (local) => {
        const onChain = await verifyVote(local.txHash);

        if (!onChain.confirmed) {
          return local;
        }

        const blockchainChoice = onChain.vote.choice;

        if (
          local.choice !== blockchainChoice ||
          local.tampered
        ) {
          fixed++;
        }

        return {
          ...local,
          choice: blockchainChoice,
          tampered: false,
        };
      })
    );

    replaceAllVotes(repaired);

    res.json({
      ok: true,
      fixed,
      votes: repaired,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Voting demo running at http://localhost:${port}`);
});
