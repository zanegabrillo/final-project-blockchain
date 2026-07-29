import { createContext, useContext, useState } from "react";

const VotingContext = createContext();

export function VotingProvider({ children }) {
    const [txHash, setTxHash] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    function notifyVote(hash) {
        setTxHash(hash);
        setRefreshKey(k => k + 1);
    }

    function refresh() {
        setRefreshKey(k => k + 1);
    }

    return (
        <VotingContext.Provider
            value={{
                txHash,
                setTxHash,
                refreshKey,
                refresh,
                notifyVote
            }}
        >
            {children}
        </VotingContext.Provider>
    );
}

export function useVoting() {
    return useContext(VotingContext);
}