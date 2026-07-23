function voting() {

    return (

        <div>

            <h1>
                Voting Portal
            </h1>


            <p>
                Submit your vote to a blockchain node.
            </p>


            <div>

                <label>
                    Voter ID:
                </label>

                <br />

                <input 
                    type="text"
                    placeholder="Enter voter ID"
                />

            </div>


            <br />


            <div>

                <label>
                    Select Candidate:
                </label>

                <br />

                <select>

                    <option>
                        Candidate A
                    </option>

                    <option>
                        Candidate B
                    </option>

                    <option>
                        Candidate C
                    </option>

                </select>


            </div>


            <br />


            <div>

                <label>
                    Select Node:
                </label>

                <br />


                <select>

                    <option>
                        Node 1
                    </option>

                    <option>
                        Node 2
                    </option>

                    <option>
                        Node 3
                    </option>


                </select>


            </div>


            <br />


            <button>
                Cast Vote
            </button>


        </div>

    );

}


export default voting;