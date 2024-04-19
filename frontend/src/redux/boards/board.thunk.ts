import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddBoard, UpdateBoard } from "../../types/board.types";

axios.defaults.baseURL = "http://localhost:3000";

export const fetchBoards = createAsyncThunk(
  "boards/fetchBoards",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/boards");
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  "boards/fetchBoardById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/boards/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (board: AddBoard, thunkAPI) => {
    try {
      const response = await axios.post("/boards", board);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const updateBoard = createAsyncThunk(
  "boards/updateBoard",
  async (board: UpdateBoard, thunkAPI) => {
    try {
      const response = await axios.patch(`/boards/${board.id}`, board);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/boards/${id}`);
      return id;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
