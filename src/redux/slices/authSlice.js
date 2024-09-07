import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import axios from "axios";

const currentuser = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: currentuser ? currentuser : null,
  isAuthenticated: currentuser ? true : false,
  loading: false,
};

export const localLogin = createAsyncThunk(
  "user/localLogin",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/local`,
        data,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error });
    }
  }
);
export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google`,
        { token: data.access_token },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error });
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    const api = useAxios();

    try {
      const response = await api.post("/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      if (!error.response) {
        return rejectWithValue({
          message: "Network error or server is not responding",
        });
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        data,
        {
          timeout: 5000,
        }
      );
      const user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue({ response: error });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: state => {
      state.user = null;
    },
    updateUsername: (state, action) => {
      state.user.name = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(localLogin.pending, state => {
        state.loading = true;
      })
      .addCase(localLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(localLogin.rejected, state => {
        state.loading = false;
      })
      .addCase(googleLogin.pending, state => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleLogin.rejected, state => {
        state.loading = false;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
      })
      .addCase(logout.rejected, state => {
        state.loading = false;
      })
      .addCase(signup.pending, state => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signup.rejected, state => {
        state.loading = false;
      });
  },
});
export const { clearUser, updateUsername } = authSlice.actions;

export default authSlice.reducer;
