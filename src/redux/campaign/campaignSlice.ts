import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDisplays } from "../../services/api";
import { SearchParams, Display, ApiResponse } from "../../types";

interface CampaignState {
  searchParams: SearchParams;
  displays: Display[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    per_page: string;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}

const initialState: CampaignState = {
  searchParams: {
    page: 1,
    per_page: 0,
    date_from: "",
    date_to: "",
    lat_sw: 0,
    lng_sw: 0,
    lat_ne: 0,
    lng_ne: 0,
  },
  displays: [],
  loading: false,
  error: null,
  pagination: {
    total: 0,
    per_page: "",
    current_page: 1,
    last_page: 1,
    from: 0,
    to: 0,
  },
};

export const searchCampaign = createAsyncThunk<ApiResponse, SearchParams>(
  "campaign/searchCampaign",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await fetchDisplays(searchParams);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.searchParams = initialState.searchParams;
      state.displays = [];
      state.error = null;
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.displays = action.payload.data;
        state.pagination = {
          total: action.payload.total,
          per_page: action.payload.per_page,
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          from: action.payload.from,
          to: action.payload.to,
        };
      })
      .addCase(searchCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSearch } = campaignSlice.actions;

export default campaignSlice.reducer;
