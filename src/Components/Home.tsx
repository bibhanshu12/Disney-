import styled from "styled-components";

const Home:React.FC=()=>{


    return(
        <>
        <HomeContent>
            <h1>Hii This is Home Page!</h1>
        </HomeContent>
        </>
    )
}


const HomeContent=styled.div`
    height:screen;
    width:100%;
    display:flex;
    align-item:center;
    justify-content:center;
    text-align:center;
    

`;












export default Home;