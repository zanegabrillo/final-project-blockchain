import BlockCard from "../components/cards/BlockCard";
import "../styles/blockchainExplorer.css";


function BlockchainExplorer() {


    return (

        <div className="blockchain-explorer">


            <h1>
                Blockchain Explorer
            </h1>


            <p>
                Explore blockchain records and verify block information.
            </p>



            <div className="block-container">


                <BlockCard

                    blockNumber="1"

                    timestamp="July 25, 2026"

                    previousHash="000000"

                    hash="a93f82c1"

                    vote="Candidate A"

                />



                <BlockCard

                    blockNumber="2"

                    timestamp="July 25, 2026"

                    previousHash="a93f82c1"

                    hash="b72e91d4"

                    vote="Candidate B"

                />



                <BlockCard

                    blockNumber="3"

                    timestamp="July 25, 2026"

                    previousHash="b72e91d4"

                    hash="c81fa632"

                    vote="Candidate C"

                />


            </div>



        </div>

    );

}


export default BlockchainExplorer;