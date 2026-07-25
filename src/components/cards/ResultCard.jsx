function ResultCard({ candidate, votes, percentage }) {


    return (

        <div className="result-card">


            <h2>
                {candidate}
            </h2>


            <div className="result-info">


                <p>
                    🗳️ Votes:
                    {" "}
                    {votes}
                </p>


                <p>
                    📊 Percentage:
                    {" "}
                    {percentage}
                </p>


            </div>


        </div>

    );

}


export default ResultCard;