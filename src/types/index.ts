export interface SearchParams {
  page: number;
  per_page: number;
  date_from: string;
  date_to: string;
  lat_sw: number;
  lng_sw: number;
  lat_ne: number;
  lng_ne: number;
  price_min?: number;
  price_max?: number;
}

export interface Picture {
  id: number;
  display_id: number;
  url: string;
}

export interface Display {
  id: number;
  name: string;
  resolution_width: number;
  resolution_height: number;
  latitude: number;
  longitude: number;
  administrative_area_level_1: string;
  administrative_area_level_2: string;
  formatted_address: string;
  zip_code: string;
  country: string;
  slots: number;
  slot_length: number;
  shows_per_hour: number;
  price_per_day: number;
  location_type: string;
  size_type: string;
  size_width: number;
  size_height: number;
  description: string;
  country_iso: string;
  external_programmatic_cpm: string;
  price_currency: string;
  cpmi: string;
  is_online: boolean;
  pictures: Picture[];
}

export interface ApiResponse {
  total: number;
  per_page: string;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: Display[];
}
