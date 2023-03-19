import { useState, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiAutocompleteSelectAll } from ".";

export function App() {
  const [value, setValue] = useState<string[]>([]);
  const options = useMemo(
    () => new Array(100).fill(0).map((_, i) => i.toString()),
    []
  );

  const selectedAll = value.length === options.length;
  return (
    <MuiAutocompleteSelectAll.Provider
      value={{
        onSelectAll: (selectedAll) => void setValue(selectedAll ? [] : options),
        selectedAll,
        indeterminate: !!value.length && !selectedAll,
      }}
    >
      <Autocomplete
        value={value}
        onChange={(_, newValue) => void setValue(newValue)}
        sx={{ width: 200, m: "auto" }}
        disableCloseOnSelect
        multiple
        limitTags={3}
        ListboxComponent={MuiAutocompleteSelectAll.ListBox}
        disablePortal
        options={options}
        renderInput={(params) => <TextField {...params} />}
        renderOption={(props, option, { selected }) => (
          <li key={option} {...props}>
            <Checkbox checked={selected} />
            {option}
          </li>
        )}
      />
    </MuiAutocompleteSelectAll.Provider>
  );
}
