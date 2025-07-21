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
// import disneyMoviesData from "../disneyPlusMoviesData.json";


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

    useEffect(()=>{
        console.log("useEffect triggered with userName:", userName);
        
        const fetchMovies= async()=>{
            console.log("fetchMovies function started");
            try {
                const recommends: Movie[] = [];
                const originals: Movie[] = [];
                const newDisneys: Movie[] = [];
                const trendings: Movie[] = [];

                console.log("About to fetch from Firebase...");
                console.log("Firebase db instance:", db);
                const movieCollections=collection(db,"movies");
                console.log("Movie collection reference:", movieCollections);
                const movieSnapShots= await getDocs(movieCollections);
                
                console.log("Firebase snapshot size:", movieSnapShots.size);
                
                // Process Firebase data (since you have movies in Firebase)
                movieSnapShots.docs.map((doc)=>{
                    const data=doc.data();
                    console.log("Processing movie from Firebase:", {
                        id: doc.id,
                        title: data.title,
                        type: data.type
                    });
                    
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
                    
                    switch(data.type){
                        case 'recommend':
                            recommends.push(movie);
                            console.log("Added to recommends:", movie.title);
                            break;

                        case 'new':
                            newDisneys.push(movie);
                            console.log("Added to newDisneys:", movie.title);
                            break;
                        
                        case 'original':
                            originals.push(movie);
                            console.log("Added to originals:", movie.title);
                            break;

                        case 'trending':
                        case 'thriller':
                            trendings.push(movie);
                            console.log("Added to trendings:", movie.title);
                            break;
                            
                        default:
                            console.log("Unknown movie type:", data.type, "for movie:", movie.title);
                    }
                });
                
                // Since you have Firebase data, we don't need JSON fallback
                // If Firebase is empty in the future, you can add sample data here
                if (movieSnapShots.size === 0) {
                    console.log("No movies found in Firebase");
                } 
               
                console.log("Movies fetched:", {
                    recommend: recommends,
                    newDisney: newDisneys,
                    original: originals,
                    trending: trendings
                });

                // Log the counts
                console.log("Movie counts:", {
                    recommendCount: recommends.length,
                    newDisneyCount: newDisneys.length,
                    originalCount: originals.length,
                    trendingCount: trendings.length
                });

                dispatch(setMovies(
                    {
                        recommend:recommends,
                        newDisney:newDisneys,
                        original:originals,
                        trending:trendings
                    }
                ));
            
            } catch (error) {
                console.error("Error fetching movies from Firebase:", error);
            }
        };

        console.log("About to call fetchMovies...");
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