import CandidateCard from "../components/cards/CandidateCard";
import "../styles/voting.css";


function Voting() {


    return (

        <div className="voting-page">


            <div className="voting-header">


                <h1>
                    Cast Your Vote
                </h1>


                <p>
                    Submit your vote securely through the decentralized blockchain network.
                </p>


            </div>



            <div className="voter-section">


                <h2>
                    Voter Information
                </h2>


                <label>
                    Voter ID
                </label>


                <input
                    type="text"
                    placeholder="Enter voter ID"
                />


            </div>




            <h2>
                Select Candidate
            </h2>



            <div className="candidate-container">


                <CandidateCard

                    candidate="Candidate A"

                    party="Blockchain Innovation Party"

                    description="Focused on improving blockchain technology and digital security."

                />



                <CandidateCard

                    candidate="Candidate B"

                    party="Digital Future Party"

                    description="Focused on technology advancement and digital transformation."

                />



                <CandidateCard

                    candidate="Candidate C"

                    party="Technology Advancement Party"

                    description="Focused on innovation and decentralized solutions."

                />


            </div>




            <div className="transaction-preview">


                <h2>
                    Transaction Preview
                </h2>


                <p>
                    Selected Candidate:
                    {" "}
                    None
                </p>


                <p>
                    Target Node:
                    {" "}
                    Node 1
                </p>


                <p>
                    Blockchain Status:
                    {" "}
                    Ready
                </p>


            </div>




            <button className="submit-vote">

                Submit Vote

            </button>



        </div>

    );

}


export default Voting;