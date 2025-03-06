import styled from "styled-components";

const Movies:React.FC=()=>{


    return(
        <>
        <MoviesContent>
            <h1>Hii This is Movies Page!</h1>
        </MoviesContent>
        </>
    )
}


const MoviesContent=styled.div`
    height:screen;
    width:100%;
    display:flex;
    align-item:center;
    justify-content:center;
    text-align:center;
    

`;












export default Movies;