import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface props {
  tabs: string[];
  icons?: React.ReactNode[];
  value: string;
  onchange: (newValue: string) => void;
}

export const BarandiBottomNavigation: React.FC<props> = (props) => {
  const NavigationActions = props.tabs.map((tab) => {
    return (
      <BottomNavigationAction
        label={tab}
        icon={props.icons ? props.icons[props.tabs.indexOf(tab)] : undefined}
        value={tab}
        key={tab}
        color="secondary"
        sx={{ width: "100%" }}
      />
    );
  });

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: indigo[500],
      }}
      elevation={1}>
      <BottomNavigation
        onChange={(_, newValue) => props.onchange(newValue)}
        value={props.value}
        sx={{
          height: 90,

          backgroundColor: indigo[500],
          justifyContent: "space-around",
          gap: "1rem",
        }}
        showLabels>
        {NavigationActions}
      </BottomNavigation>
    </Paper>
  );
};
