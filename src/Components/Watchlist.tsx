import styled from "styled-components";
import * as React from "react";
const Watchlist:React.FC=()=>{


    return(
        <>
        <Watchcontents>
            <h1>Hii This is Watchlist Page!</h1>
        </Watchcontents>
        </>
    )
}


const Watchcontents=styled.div`
    height:screen;
    width:100%;
    display:flex;
    align-item:center;
    justify-content:center;
    text-align:center;
    

`;












export default Watchlist;