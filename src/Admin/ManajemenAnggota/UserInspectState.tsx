import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Nama: "",
  Email: "",
  Alamat: "",
  Status: "",
  Bergabung: "",
  KreditSkor: 0,
  BukuDikembalikan: 0,
  BukuBelumDikembalikan: 0,
};

export const UserInspect = createSlice({
  name: "InspectUser",
  initialState,
  reducers: {
    setNama: (state, action) => {
      state.Nama = action.payload;
    },
    setEmail: (state, action) => {
      state.Email = action.payload;
    },
    setAlamat: (state, action) => {
      state.Alamat = action.payload;
    },
    setStatus: (state, action) => {
      state.Status = action.payload;
    },
    setBergabung: (state, action) => {
      state.Bergabung = action.payload;
    },
    setKreditSkor: (state, action) => {
      state.KreditSkor = action.payload;
    },
    setBukudikembalikan: (state, action) => {
      state.BukuDikembalikan = action.payload;
    },
    setBukuBelumdikembalikan: (state, action) => {
      state.BukuBelumDikembalikan = action.payload;
    },
    setSemua: (state, action) => {
      const { Nama, Email, Alamat, Status, Bergabung, KreditSkor } = action.payload;
      state.Nama = Nama;
      state.Email = Email;
      state.Alamat = Alamat;
      state.Status = Status;
      state.Bergabung = Bergabung;
      state.KreditSkor = KreditSkor;
    },
  },
});

export const {
  setNama,
  setEmail,
  setAlamat,
  setStatus,
  setBergabung,
  setKreditSkor,
  setBukudikembalikan,
  setBukuBelumdikembalikan,
  setSemua,
} = UserInspect.actions;

export default UserInspect.reducer;
