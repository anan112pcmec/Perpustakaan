import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DetilBukuState{
  Judul: string | null | undefined;
  Gambar: string;
  Penulis: string | null;
  Genre: string | null;
  Bahasa: string | null;
  Tahun: string | null;
  Rating: string | null;
  Harga: number | null;
  Kategori: string | null;
  Jenis:string | null;
  Disukai: string | null;
  Diskon: number | null;
  Penerbit: string | null;
  ISBN: string | null;
  Deskripsi: string | null;
  ID: number | null;
}

const initialState: DetilBukuState = {
  Judul: null,
  Bahasa: null,
  Gambar: "",
  Penulis: null,
  Genre: null,
  Tahun: null,
  Rating: null,
  Harga: null,
  Kategori: null,
  Jenis: null,
  Disukai: null,
  Diskon: null,
  Penerbit: null,
  ISBN: null,
  Deskripsi: null,
  ID: null,
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
