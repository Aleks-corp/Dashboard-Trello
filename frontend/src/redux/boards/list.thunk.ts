import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddList, UpdateList } from "../../types/list.types";
import { setAxiosBaseUrl } from "../../helpers/setAxiosBaseUrl";

const host = await setAxiosBaseUrl();
axios.defaults.baseURL = host;

export const fetchLists = createAsyncThunk(
  "lists/fetchLists",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/lists");
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async (list: AddList, thunkAPI) => {
    try {
      const response = await axios.post("/Lists", list);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (list: UpdateList, thunkAPI) => {
    try {
      const response = await axios.patch(`/lists/${list.id}`, list);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);

export const deleteList = createAsyncThunk(
  "lists/deleteList",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/lists/${id}`);
      return id;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
