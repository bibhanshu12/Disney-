import styled from "styled-components";

const Series:React.FC=()=>{


    return(
        <>
        <SeriesContent>
            <h1>Hii This is Series Page!</h1>
        </SeriesContent>
        </>
    )
}


const SeriesContent=styled.div`
    height:screen;
    width:100%;
    display:flex;
    align-item:center;
    justify-content:center;
    text-align:center;
    

`;












export default Series;