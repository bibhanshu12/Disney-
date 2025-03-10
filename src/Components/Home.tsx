import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viwers";
import Recommend from "./Recommend";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { db } from "../firebase";
import { useDispatch,useSelector } from "react-redux";
import { setMovies } from "../features/movies/movieSlice";
import { selectuserName } from "../features/users/userSlice";
import { collection, getDocs } from "firebase/firestore";


interface Movie {
   id:string,
    title: string,
    type: string,
    backgroundImg: string,
    cardImg: string,
    description: string,
    subTitle: string,
    titleImg: string,
}
const Home:React.FC=()=>{

    const dispatch= useDispatch();
    const userName=useSelector(selectuserName);

    const recommends: Movie[] = [];
    const originals: Movie[] = [];
    const newDisneys: Movie[] = [];
    const trendings: Movie[] = [];

    useEffect(()=>{
        const fetchMovies= async()=>{
            const movieCollections=collection(db,"movies");
            const movieSnapShots= await getDocs(movieCollections);
            movieSnapShots.docs.map((doc)=>{
                const data=doc.data();
                const movie: Movie = {
                    id: doc.id,
                    title: data.title || "Unknown Title",
                    type: data.type || "unknown",
                    backgroundImg: data.backgroundImg || "",
                    cardImg: data.cardImg || "",
                    description: data.description || "No description available",
                    subTitle: data.subTitle || "",
                    titleImg: data.titleImg || "",
                };
                // console.log(newDisneys);
                
                switch(doc.data().type){
                    case 'recommend':
                    recommends.push(movie)
                    break;

                    case 'new':
                        newDisneys.push(movie);
                        break;
                    
                    case 'original':
                        originals.push(movie);
                    break;

                    case 'trending':
                    case "thriller":
                        trendings.push(movie);

                }

            });
           
            dispatch(setMovies(
                {
                    recommend:recommends,
                    newDisney:newDisneys,
                    original:originals,
                    trending:trendings
    
    
                }
            ))
        
        };

        
        fetchMovies();

    },[userName,dispatch]);

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