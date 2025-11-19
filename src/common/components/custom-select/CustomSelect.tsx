import {
  Box,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import type { SelectOption } from "./custom-select.type.ts";

interface Props<T> {
  options: SelectOption<T>[];
  name?: string;
  value: T;
  onChange: (e: SelectChangeEvent<T>) => void;
  label?: string;
  displayEmpty?: boolean;
  emptyOption?: SelectOption<string>;
  sx?: SxProps<Theme>;
}

const defaultEmptyOption = {
  value: "",
  label: "Не выбрано",
};

export default function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  label,
  name = "",
  displayEmpty = false,
  emptyOption = defaultEmptyOption,
  sx = {},
}: Props<T>) {
  return (
    <Box>
      <Typography variant="body2" component="div">
        {label}
      </Typography>
      <Select
        onChange={onChange}
        value={value}
        size="small"
        sx={{
          minWidth: "200px",
          ...sx,
        }}
        name={name}
      >
        {displayEmpty && (
          <MenuItem value={emptyOption.value}>
            <em>{emptyOption.label}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
