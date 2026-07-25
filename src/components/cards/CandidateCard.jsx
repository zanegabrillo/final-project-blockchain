function CandidateCard({ candidate, party, description }) {


    return (

        <div className="candidate-card">


            <h2>
                {candidate}
            </h2>


            <h3>
                {party}
            </h3>


            <p>
                {description}
            </p>


            <label>

                <input
                    type="radio"
                    name="candidate"
                />

                Select Candidate

            </label>


        </div>

    );

}


export default CandidateCard;