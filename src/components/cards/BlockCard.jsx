function BlockCard({ blockNumber, timestamp, previousHash, hash, vote }) {


    return (

        <div className="block-card">


            <h2>
                Block #{blockNumber}
            </h2>


            <p>
                Timestamp:
                {" "}
                {timestamp}
            </p>


            <p>
                Previous Hash:
                {" "}
                {previousHash}
            </p>


            <p>
                Hash:
                {" "}
                {hash}
            </p>


            <p>
                Vote Data:
                {" "}
                {vote}
            </p>


        </div>

    );


}


export default BlockCard;