import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/dashboard";
import Voting from "./pages/voting";
import BlockchainExplorer from "./pages/blockchainExplorer";
import Results from "./pages/results";


import Layout from "./components/layout/layout";


function App() {


    return (

        <BrowserRouter>

            <Layout>

                <Routes>


                    <Route 
                        path="/" 
                        element={<Dashboard />} 
                    />


                    <Route 
                        path="/voting" 
                        element={<Voting />} 
                    />


                    <Route 
                        path="/blockchain" 
                        element={<BlockchainExplorer />} 
                    />


                    <Route 
                        path="/results" 
                        element={<Results />} 
                    />


                </Routes>

            </Layout>


        </BrowserRouter>

    );


}


export default App;