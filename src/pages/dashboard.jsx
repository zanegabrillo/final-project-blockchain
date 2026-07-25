import NodeCard from "../components/cards/NodeCard";
import SummaryCard from "../components/cards/SummaryCard";
import "../styles/dashboard.css";


function Dashboard() {

    return (

        <div className="dashboard">


            <h1>
                Network Dashboard
            </h1>



            <div className="summary-container">


                <SummaryCard
                    title="Total Nodes"
                    value="3"
                />


                <SummaryCard
                    title="Network Status"
                    value="Online 🟢"
                />


                <SummaryCard
                    title="Consensus"
                    value="Synchronized ✅"
                />


            </div>



            <h2>
                Active Network Nodes
            </h2>



            <div className="node-container">


                <NodeCard
                    nodeName="Node 1"
                    status="Online 🟢"
                    blocks="5"
                    lastSync="Just now"
                />


                <NodeCard
                    nodeName="Node 2"
                    status="Online 🟢"
                    blocks="5"
                    lastSync="Just now"
                />


                <NodeCard
                    nodeName="Node 3"
                    status="Online 🟢"
                    blocks="5"
                    lastSync="Just now"
                />
                


            </div>



            <div className="dashboard-actions">


                <button>
                    Sync Nodes
                </button>


                <button>
                    Tamper Test
                </button>


            </div>


        </div>

    );

}


export default Dashboard;