import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DetilBukuState{
  Judul: string | null;
  Gambar: string;
  Penulis: string | null;
  Genre: string | null;
  Bahasa: string | null;
  Tahun: string | null;
  Rating: string | null;
  Harga: string | null;

}


const initialState: DetilBukuState = {
  Judul: null,
  Gambar: "",
  Penulis: null,
  Genre: null,
  Bahasa: null,
  Tahun: null,
  Rating: null,
  Harga: null,
};

export const StateDetailBuku = createSlice({
  name: "statedetailbuku",
  initialState,
  reducers: {
    updatenilai: (state, action: PayloadAction<Partial<DetilBukuState>>) => {
      Object.assign(state, action.payload);
    },
    resetnilai: () => {
      return initialState;
    },
  },
});

export const { updatenilai, resetnilai } = StateDetailBuku.actions;
export default StateDetailBuku.reducer;
