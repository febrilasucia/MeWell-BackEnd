import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getBlog = createAsyncThunk('blog', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'https://finalproject-be-production.up.railway.app/blog',
      {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }}
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(getBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
