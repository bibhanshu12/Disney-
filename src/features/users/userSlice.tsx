import { createSlice } from "@reduxjs/toolkit";

interface userState{
    name:string,
    email:string,
    photo:string,

}


const initialState:userState={
    name:"",
    email:"",
    photo:"",
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{

        setusersLogindetails:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.photo=action.payload.photo;
        },

        setuserSignoutstate:(state)=>{
            state.name="";
            state.email="";
            state.photo="";

        }
    }



});

export const {setusersLogindetails,setuserSignoutstate} = userSlice.actions;
export const selectuserName= (state: {user:userState})=> state.user.name;
export const selectuserEmail= (state: {user:userState})=> state.user.email;
export const selectuserPhotos= (state: {user:userState})=> state.user.photo;
export default userSlice.reducer;