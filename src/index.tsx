import {
  ForwardedRef,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  createContext,
} from "react";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";

const contextDefaultValue = {
  onSelectAll: (_selectedAll: boolean) => void null,
  selectedAll: false,
  indeterminate: false,
};
type ContextType = Omit<typeof contextDefaultValue, "indeterminate"> & {
  indeterminate?: boolean;
};
const MuiAutocompleteSelectAllContext =
  createContext<ContextType>(contextDefaultValue);

type ListBoxProps = React.HTMLAttributes<HTMLUListElement>;
type NullableUlElement = HTMLUListElement | null;

const MuiAutocompleteSelectAllListBox = forwardRef(function ListBoxBase(
  props: ListBoxProps,
  ref: ForwardedRef<HTMLUListElement>
) {
  const { children, ...rest } = props;

  const innerRef = useRef<HTMLUListElement>(null);

  useImperativeHandle<NullableUlElement, NullableUlElement>(
    ref,
    () => innerRef.current
  );

  const { onSelectAll, selectedAll, indeterminate } = useContext(
    MuiAutocompleteSelectAllContext
  );

  return (
    <>
      <ul {...rest} ref={innerRef} role="list-box">
        <li style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            indeterminate={indeterminate}
            checked={selectedAll}
            onChange={(_e) => onSelectAll(selectedAll)}
            sx={{ ml: 2 }}
          />
          Select All
        </li>
        <Divider />
        {children}
      </ul>
    </>
  );
});

export const MuiAutocompleteSelectAll = {
  Provider: MuiAutocompleteSelectAllContext.Provider,
  ListBox: MuiAutocompleteSelectAllListBox,
};
