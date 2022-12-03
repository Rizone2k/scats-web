import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import instance from "~/config/axios.config";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(register.fulfilled, (state, action) => {
      //   state.isLoggedIn = true;
      //   state.currentUser = action.payload;
      // })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = {};
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const res = await instance.post(`/auth/register`, { username, password });
//       // const res = await axios.post(`http://api.scats.tk/api/v1/auth/login`, {
//       //   username,
//       //   password,
//       // });

//       console.log(res);
//       if (res.status == 200) {
//         if (res.data.status == "success") {
//           Cookies.set("access_token", res.data.data.access_token);
//           //   await SecureStore.setItemAsync("uid", String(res.data.data.user.id));
//           return res.data.data.user;
//         } else {
//           throw rejectWithValue(res.data.message);
//         }
//       }
//     } catch (error) {
//       if (error.payload) {
//         throw rejectWithValue(error.payload);
//       } else {
//         throw error;
//       }
//     }
//   }
// );
export let info = {};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/auth/login`, { username, password });

      info = res;

      if (res.status == 200) {
        if (res.data.status == "success") {
          Cookies.set("access_token", res.data.data.access_token);
          Cookies.set("uid", String(res.data.data.user.id));
          return res.data.data.user;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/auth/logout`);
      if (res.status == 200) {
        if (res.data.status == "success") {
          Cookies.remove("access_token");
          Cookies.remove("uid");
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const id = Cookies.get("uid");
      const res = await instance.post(`/auth/refresh-token`, { id });
      if (res.status == 200) {
        if (res.data.status == "success") {
          Cookies.set("access_token", res.data.data.access_token);
          return res.data.data.user;
        } else {
          Cookies.remove("access_token");
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const updateInfo = createAsyncThunk(
  "auth/updateInfor",
  async ({ id, username, email, avatar }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar.base64);
      }
      formData.append("idUser", id);
      formData.append("username", username);
      formData.append("email", email);
      const res = await instance.post(`/user/update`, formData);
      if (res.status == 200) {
        if (res.data.status == "success") {
          console.log(res.data.data);
          return res.data.data;
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export default authSlice;
