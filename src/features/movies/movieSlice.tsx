import { createSlice } from "@reduxjs/toolkit";


interface movieInterface{
    recommend:string[] | null;
    newDisney:string[]| null;
    original:string[]| null;
    trending:string[]| null;
} 

const initialState={
    recommend:null,
    newDisney:null,
    original:null,
    trending:null,
}

const movieSlice=createSlice({
    name:'movie',
    initialState,
    reducers:{
        setMovies:(state,actions)=>{

            state.recommend=actions.payload.recommend;
            state.newDisney=actions.payload.newDisney;
            state.original=actions.payload.original;
            state.trending=actions.payload.trending;
        
        }
        
    }

})


export const {setMovies} =movieSlice.actions;
export const selectRecommend=(state:{movie:movieInterface})=>state.movie.recommend;
export const selectNewDisney=(state:{movie:movieInterface})=>state.movie.newDisney;
export const selectOriginal=(state:{movie:movieInterface})=>state.movie.original;
export const selectTrending=(state:{movie:movieInterface})=>state.movie.trending;

export default movieSlice.reducer;