import React, { useState } from "react";
import { AutoComplete } from "antd";
import axios from "axios";
import { debounce } from "lodash";

interface CityAutocompleteProps {
  onSelect: (value: string) => void;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ onSelect }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const searchCity = async (value: string) => {
    if (value.length > 2) {
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

        const results = response.data.map((item: any) => ({
          value: item.display_name,
          label: item.display_name,
        }));

        setOptions(results);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    } else {
      setOptions([]);
    }
  };

  const debouncedSearchCity = debounce(searchCity, 300);

  const handleSearch = (value: string) => {
    debouncedSearchCity(value);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
  };

  return (
    <AutoComplete
      style={{ width: "100%" }}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Ingrese la ciudad o zona"
    />
  );
};

export default CityAutocomplete;
