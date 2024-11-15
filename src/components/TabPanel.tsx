// React
// MUI
import { Box } from "@mui/material";
// Components
// Hooks
// Utils
// Types
// Icons

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function DefaultTabPanelProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box width={"100%"} marginTop={3}>
          {children}
        </Box>
      )}
    </div>
  );
}
