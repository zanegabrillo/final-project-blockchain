import Navbar from "./Navbar";


function layout({ children }) {

    return (

        <>

            <Navbar />

            <main>

                {children}

            </main>

        </>

    );

}


export default layout;