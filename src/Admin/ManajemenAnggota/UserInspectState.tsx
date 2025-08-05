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
  PenggunaAktif: 0,
  PenggunaTidakAktif: 0,
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
    setPenggunaAktif: (state, action) => {
      state.PenggunaAktif = action.payload;
    },
    setPenggunaTidakAktif: (state, action) => {
      state.PenggunaTidakAktif = action.payload
    },
    setSemua: (state, action) => {
      const { Nama, Email, Alamat, Status, Bergabung, KreditSkor, PenggunaAktif, PenggunaTidakAktif } = action.payload;
      state.Nama = Nama;
      state.Email = Email;
      state.Alamat = Alamat;
      state.Status = Status;
      state.Bergabung = Bergabung;
      state.KreditSkor = KreditSkor;
      state.PenggunaAktif = PenggunaAktif;
      state.PenggunaTidakAktif = PenggunaTidakAktif;
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
  setPenggunaAktif,
  setPenggunaTidakAktif,
  setSemua,
} = UserInspect.actions;

export default UserInspect.reducer;
