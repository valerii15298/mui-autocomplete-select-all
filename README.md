# mui-autocomplete-select-all

Dead simple select all functionality for MUI [Autocomplete](https://mui.com/material-ui/react-autocomplete/)

## Usage example

```ts
import { useState, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiAutocompleteSelectAll } from "mui-autocomplete-select-all";

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
```

## Quickstart

### Install via preferred package manager

```bash
npm install mui-autocomplete-select-all
yarn add mui-autocomplete-select-all
pnpm add mui-autocomplete-select-all
```

### Import `MuiAutocompleteSelectAll`:

    import { MuiAutocompleteSelectAll } from "mui-autocomplete-select-all";

### Wrap your autocomplete in MuiAutocompleteSelectAll.Provider and provide value with `onSelectAll`, `selectedAll` and optionally `indeterminate` values:

```tsx
<MuiAutocompleteSelectAll.Provider
  value={{
    onSelectAll: (selectedAll) => void setValue(selectedAll ? [] : options),
    selectedAll,
    indeterminate: !!value.length && !selectedAll,
  }}
>
  ...
</MuiAutocompleteSelectAll.Provider>
```

This values will be used to control select all functionality.

### Add `ListboxComponent` prop to `Autocomplete` as `MuiAutocompleteSelectAll.ListBox`:

```tsx
<Autocomplete
...
ListboxComponent={MuiAutocompleteSelectAll.ListBox}
...
/>
```
