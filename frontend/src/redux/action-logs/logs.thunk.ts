import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:3000";

export const fetchHistory = createAsyncThunk(
  "log/fetchLogs",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/logs");
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const fetchTaskHistory = createAsyncThunk(
  "log/fetchTaskLogs",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/logs/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
