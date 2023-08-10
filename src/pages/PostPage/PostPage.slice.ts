import { createSlice } from "@reduxjs/toolkit";
import { TPost } from "src/types/post.types";

type TInitialPostState = {
  postList: TPost[];
};

const initialPostState: TInitialPostState = {
  postList: [],
};

const postSlice = createSlice({
  name: "postSlice",
  initialState: initialPostState,
  reducers: {
    setPost: (state, action) => {
      state.postList = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer;
