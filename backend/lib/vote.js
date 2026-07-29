import { BlockfrostProvider, MeshWallet, Transaction } from "@meshsdk/core";

const NETWORK = "preprod";
const BLOCKFROST_URL = `https://cardano-${NETWORK}.blockfrost.io/api/v0`;

const VOTE_METADATA_LABEL = 20250001;

let wallet = null;

function getWallet() {
  if (wallet) return wallet;

  const provider = new BlockfrostProvider(process.env.BLOCKFROST_PROJECT_ID);

  wallet = new MeshWallet({
    networkId: 0, // 0 = testnet (preprod/preview), 1 = mainnet
    fetcher: provider,
    submitter: provider,
    key: {
      type: "mnemonic",
      words: process.env.WALLET_MNEMONIC.trim().split(/\s+/),
    },
  });

  return wallet;
}

export async function submitVote({ pollId, choice, voterRef }) {
  if (!pollId || !choice) {
    throw new Error("pollId and choice are required");
  }

  const w = getWallet();
  const address = await w.getChangeAddress();

  const metadata = {
    poll_id: pollId,
    choice,
    voter_ref: voterRef ?? "anonymous",
    timestamp: new Date().toISOString(),
  };

  const tx = new Transaction({ initiator: w })
    .sendLovelace(address, "1000000") // 1 ADA back to self
    .setMetadata(VOTE_METADATA_LABEL, metadata);

  const unsignedTx = await tx.build();
  const signedTx = await w.signTx(unsignedTx);
  const txHash = await w.submitTx(signedTx);

  return { txHash, metadata };
}

export async function verifyVote(txHash) {
  const headers = { project_id: process.env.BLOCKFROST_PROJECT_ID };

  const txRes = await fetch(`${BLOCKFROST_URL}/txs/${txHash}`, { headers });

  if (txRes.status === 404) {
    return { confirmed: false, reason: "not_found_yet" };
  }
  if (!txRes.ok) {
    throw new Error(`Blockfrost error ${txRes.status}: ${await txRes.text()}`);
  }

  const tx = await txRes.json();

  const metaRes = await fetch(`${BLOCKFROST_URL}/txs/${txHash}/metadata`, {
    headers,
  });
  const metadataEntries = metaRes.ok ? await metaRes.json() : [];

  const voteEntry = metadataEntries.find(
    (m) => String(m.label) === String(VOTE_METADATA_LABEL)
  );

  return {
    confirmed: true,
    block_hash: tx.block,
    block_height: tx.block_height,
    block_time: tx.block_time,
    fees_lovelace: tx.fees,
    explorer_url: `https://${NETWORK}.cardanoscan.io/transaction/${txHash}`,
    vote: voteEntry?.json_metadata ?? null,
  };
}
