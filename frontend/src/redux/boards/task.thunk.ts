import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddTask, UpdateTask } from "../../types/tasks.types";
import { setAxiosBaseUrl } from "../../helpers/setAxiosBaseUrl";

const host = await setAxiosBaseUrl();
axios.defaults.baseURL = host;

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`/tasks/${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: AddTask, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", task);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: UpdateTask, thunkAPI) => {
    try {
      const response = await axios.patch(`/tasks/${task.id}`, task);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/tasks/${id}`);
      return id;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
