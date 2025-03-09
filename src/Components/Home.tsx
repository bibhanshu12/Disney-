import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viwers";
import Recommend from "./Recommend";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { db } from "../firebase";
import { useDispatch, UseDispatch,useSelector } from "react-redux";
import { setMovies } from "../features/movies/movieSlice";
import { selectuserName } from "../features/users/userSlice";
import { collection, query, where, getDocs } from "firebase/firestore";




const Home:React.FC=()=>{

    const dispatch= useDispatch();
    const userName=useSelector(selectuserName);

    let recommends=[];
    let originals=[];
    let newDisney=[];
    let trending=[];

    useEffect(()=>{
        
    })

    return(
        <>
        <HomeContainer>
            <ImgSlider/>
            <Viewers/>
            <Recommend/>
            <NewDisney/>
            <Originals/>
            <Trending/>
        </HomeContainer>
        </>
    )
}


const HomeContainer=styled.main`
   
position:relative;
min-height: calc(100vh - 250px);
overflow-x:hidden;
display:block;
padding:0 calc(3.5w +5px);


&:after{
background: url("images/home-background.png") center center / cover no-repeat fixed;
content:""; 
position:absolute;
inset:0px;
opacity:1;
z-index:-1;

}
`;












export default Home;