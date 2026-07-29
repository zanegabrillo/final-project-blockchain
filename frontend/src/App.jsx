import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Verify from "./pages/Verify";
import Ledger from "./pages/Ledger";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/vote" element={<Vote />} />
                <Route path="/results" element={<Results />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/ledger" element={<Ledger />} />
            </Route>
        </Routes>
    );
}