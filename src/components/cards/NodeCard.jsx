import "../../styles/cards.css";

function NodeCard({ 
    nodeName,
    status,
    blocks,
    lastSync
}) {


    return (

        <div className="node-card">


            <h3>
                {nodeName}
            </h3>


            <p>
                Status: {status}
            </p>


            <p>
                Blocks: {blocks}
            </p>


            <p>
                Last Sync: {lastSync}
            </p>


        </div>

    );

}


export default NodeCard;