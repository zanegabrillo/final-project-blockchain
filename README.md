# Cardano Voting Demo

A voting web app that submits each vote as a real transaction on the
**Cardano preprod testnet** (via [Blockfrost](https://blockfrost.io)),
then demonstrates why a blockchain-backed record is trustworthy in a way
a plain local database isn't, by letting you deliberately tamper with
the app's local copy of the votes and catch the discrepancy against
what's actually confirmed on-chain.

```
frontend  →  Vite + React (UI)
backend   →  Express + MeshSDK + Blockfrost (API, wallet, chain access)
```

## Features

- **Cast a vote** — builds, signs, and submits a Cardano preprod
  transaction with the vote encoded in transaction metadata
- **Results tally** — vote counts computed from the app's local database
- **Verify** — independently re-fetches a transaction straight from
  Blockfrost to confirm it's really on-chain and unaltered
- **Ledger + tamper check** — lists every locally recorded vote,
  lets you simulate an attacker editing a record directly (no chain
  interaction), then **reconciles** local vs. on-chain data and flags
  mismatches
- **Repair** — rewrites the local database back to match what's
  actually confirmed on-chain, for tampered/incorrect records

## Tech stack

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express
- **Blockchain access:** [MeshSDK](https://meshjs.dev) + [Blockfrost](https://blockfrost.io) (Cardano preprod)
- **Storage:** a local JSON file (`backend/data/votes.json`) acting as
  the app's own database, separate from the blockchain

## Project structure

```
final-project-blockchain/
├── backend/
│   ├── server.js
│   ├── lib/
│   │   ├── vote.js
│   │   └── db.js
│   ├── data/votes.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── api.js
    │   ├── context/
    │   ├── pages/
    │   └── components/
    └── vite.config.js
```

## Prerequisites

- Node.js (v18+ recommended)
- A free [Blockfrost](https://blockfrost.io) account with a project
  created on the **Preprod** network
- A Cardano preprod wallet (24-word mnemonic) funded with test ADA from
  the [Cardano testnet faucet](https://docs.cardano.org/cardano-testnets/tools/faucet)

## Environment variables

The backend needs a `.env` file at `backend/.env`:

```env
BLOCKFROST_PROJECT_ID=preprodXXXXXXXXXXXXXXXXXXXXXXXXXXXX
WALLET_MNEMONIC="word1 word2 word3 ... word24"
PORT=3000
```

| Variable | Required | Description |
|---|---|---|
| `BLOCKFROST_PROJECT_ID` | Yes | Your Blockfrost **Preprod** project ID |
| `WALLET_MNEMONIC` | Yes | 24-word mnemonic for the wallet that signs every vote (app-custodied — see Notes below). Must be funded with test ADA. |
| `PORT` | No | Backend port. Defaults to `3000`. |

## Running the project

```bash
# 1. Clone the repository
git clone <repo-url>
cd final-project-blockchain

# 2. Install dependencies in both projects
cd backend && npm install
cd ../frontend && npm install

# 3. Add your .env file to the backend directory
#    (copy in your existing .env, or create one using the template above)

# 4. Start the backend (from backend/)
npm start

# 5. In a second terminal, start the frontend (from frontend/)
npm run dev

# 6. Open the app
http://localhost:5173
```

The frontend dev server proxies any `/api/*` request to the backend on
port 3000 (configured in `vite.config.js`), so no CORS setup or
hardcoded backend URL is needed.

## API endpoints (backend)

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/vote` | Submits a vote as a preprod transaction; records it locally |
| `GET` | `/api/vote/:txHash` | Re-fetches a transaction + its metadata directly from Blockfrost |
| `GET` | `/api/votes` | Lists every locally recorded vote |
| `GET` | `/api/tally` | Vote counts computed from the local database |
| `POST` | `/api/admin/tamper` | Directly edits a local vote record, no chain interaction |
| `GET` | `/api/reconcile` | Re-checks every local vote against Blockfrost, flags `match`/`mismatch`/`pending` |
| `POST` | `/api/repair` | Overwrites local records with what's actually confirmed on-chain |

## Pages (frontend)

| Route | Page |
|---|---|
| `/` | Home |
| `/vote` | Cast a vote |
| `/results` | Results tally |
| `/verify` | Verify a transaction hash on-chain |
| `/ledger` | Local ledger, tamper simulation, and reconciliation |

## How the tamper demo works

1. Cast a couple of votes and wait for on-chain confirmation (~20–40s).
2. On the **Ledger** page, click **Tamper** on any row and enter a
   different choice. This edits the local JSON file only, with no
   transaction involved, simulating an attacker with database access.
3. Click **Reconcile with blockchain**. The tampered row is flagged
   `mismatch`, showing the real on-chain choice next to the falsified
   local one.
4. Optionally click **Repair** to rewrite the local database back to
   match the chain.

## Notes / limitations

- **App-custodied wallet:** the backend's single wallet signs every
  vote. A production system would instead have each voter sign their
  own transaction with their own wallet (CIP-30).
- **`/api/admin/tamper` has no authentication** — it exists purely to
  demonstrate the attack this project is designed to catch, and would
  never ship in a real app.
- **Blockfrost's free Starter plan** is more than sufficient for
  demo-level traffic.
