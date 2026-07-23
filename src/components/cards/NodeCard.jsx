function NodeCard({ nodeName, status, blocks }) {

    return (

        <div className="node-card">

            <h2>
                {nodeName}
            </h2>


            <p>
                Status:
                {" "}
                {status}
            </p>


            <p>
                Blocks:
                {" "}
                {blocks}
            </p>


        </div>

    );

}


export default NodeCard;