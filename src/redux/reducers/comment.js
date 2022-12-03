import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/config/axios.config";
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    cmts: [],
    page: 1,
    total: 0,
  },
  reducers: {
    setOpenReply: (state, action) => {
      state.cmts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.cmts = action.payload.cmts;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.cmts = action.payload.cmts;
        state.page = action.payload.page;
        state.total = action.payload.total;
      })
      .addCase(sendReply.fulfilled, (state, action) => {
        state.cmts.map((cmt) => {
          if (cmt.id === action.payload.comment_id) {
            cmt.Replies.push(action.payload);
          }
        });
      });
  },
});

export const getComments = createAsyncThunk(
  "comments/getComments",
  async ({ id, page }, { rejectWithValue }) => {
    try {
      const res = await instance.get(`/comment/${id}?page=${page}`);
      if (res.status == 200) {
        if (res.data.status == "success") {
          const result = res.data;
          let cmts = result.data.comments;
          cmts = cmts.map((cmt) => {
            cmt = { ...cmt, open_reply: false };
            return cmt;
          });
          return { cmts, page, total: result.data.count };
        } else {
          throw rejectWithValue(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.payload) {
        throw rejectWithValue(error.payload);
      } else {
        throw error;
      }
    }
  }
);

export const sendComment = createAsyncThunk(
  "comments/sendComment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/comment`, data);
      if (res.status == 200) {
        if (res.data.status == "success") {
          const result = res.data;
          let cmts = result.data.comments;
          cmts = cmts.map((cmt) => {
            cmt = { ...cmt, open_reply: false };
            return cmt;
          });
          return { cmts, page: 1, total: result.data.count };
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

export const sendReply = createAsyncThunk(
  "comments/sendReply",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.post(`/comment/reply`, data);
      if (res.status == 200) {
        if (res.data.status == "success") {
          const result = res.data;
          return result.data;
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

export default commentsSlice;
