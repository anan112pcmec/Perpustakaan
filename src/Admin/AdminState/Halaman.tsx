import { createSlice, type PayloadAction} from "@reduxjs/toolkit";

export const HalamanTempatAdmin = createSlice({
    name: "namahalaman",
    initialState: "Dashboard",
    reducers:{
        masukanhalaman: (state:string, action:PayloadAction<string>) =>{
            if(typeof action.payload == "string"){
                return action.payload;
            }

            return state;
        }
    }
})

export const {masukanhalaman}:any = HalamanTempatAdmin.actions