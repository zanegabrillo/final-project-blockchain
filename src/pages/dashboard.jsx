import NodeCard from "../components/cards/NodeCard";


function Dashboard() {

    return (

        <div>

            <h1>
                Blockchain Network Dashboard
            </h1>


            <p>
                Monitoring decentralized voting nodes
            </p>



            <div>


                <NodeCard
                    nodeName="Node 1"
                    status="Online 🟢"
                    blocks="5"
                />


                <NodeCard
                    nodeName="Node 2"
                    status="Online 🟢"
                    blocks="5"
                />


                <NodeCard
                    nodeName="Node 3"
                    status="Online 🟢"
                    blocks="5"
                />


            </div>


            <hr />


            <h2>
                Consensus Status
            </h2>


            <p>
                ✅ All nodes synchronized
            </p>


            <button>
                Sync Nodes
            </button>


            <button>
                Tamper Test
            </button>


        </div>

    );

}


export default Dashboard;