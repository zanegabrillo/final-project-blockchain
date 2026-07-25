import ResultCard from "../components/cards/ResultCard";
import "../styles/results.css";


function Results() {


    return (

        <div className="results-page">



            <div className="results-header">


                <h1>
                    Election Results
                </h1>


                <p>
                    Final voting outcome verified through the blockchain network.
                </p>


            </div>






            <div className="results-container">


                <ResultCard

                    candidate="Candidate A"

                    votes="120"

                    percentage="45%"

                />



                <ResultCard

                    candidate="Candidate B"

                    votes="95"

                    percentage="35%"

                />



                <ResultCard

                    candidate="Candidate C"

                    votes="55"

                    percentage="20%"

                />


            </div>






            <div className="verification-card">


                <h2>
                    Blockchain Integrity Status
                </h2>



                <div className="verification-item">


                    <span className="status-dot"></span>


                    <div>

                        <h3>
                            Verified
                        </h3>


                        <p>
                            Vote records have been successfully authenticated.
                        </p>


                    </div>


                </div>





                <div className="verification-item">


                    <span className="status-dot"></span>


                    <div>

                        <h3>
                            Confirmed
                        </h3>


                        <p>
                            Blockchain records match the validated chain.
                        </p>


                    </div>


                </div>






                <div className="verification-item">


                    <span className="status-dot"></span>


                    <div>

                        <h3>
                            Synchronized
                        </h3>


                        <p>
                            Latest block data is synchronized across nodes.
                        </p>


                    </div>


                </div>



            </div>




        </div>

    );

}


export default Results;