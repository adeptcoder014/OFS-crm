import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
//=================================
const accountsHeads = [
  {
    name: "Rents",
  },
  {
    name: "Ebills",
  },
  {
    name: "Food",
  },
  {
    name: "Veggies",
  },
  {
    name: "Grocceries",
  },
  {
    name: "Staff salaries",
  },
  {
    name: "Housekeeping",
  },
  {
    name: "Water bills",
  },
  {
    name: "Gas bills",
  },
];
//=================================
export default function AccountHeadsEntry() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        boxShadow: "0px 1px 2px 0px grey",
        // backgroundColor:"wheat",
        // width: "200%",
        p: 2,
        borderRadius: 1,
      }}
    >
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Accounts Heads
        </Typography>
        <FormControl size="small" fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem>Choose accounts heads</MenuItem>

            {accountsHeads.map((x) => (
              <MenuItem value={x.name.toUpperCase()}>{x.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Credit
        </Typography>
        <TextField size="small" />
      </Grid>

      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Debit
        </Typography>
        <TextField size="small" />
      </Grid>

      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>Action</Typography>
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            p: "10px 45px",
            borderRadius: 1,
            fontWeight: "bolder",
            alignSelf:"center",
            "&:hover": {
              color: "black",
              border: "2px solid black",
              backgroundColor: "white",
            },
          }}
        >
          Enter
        </Button>
      </Grid>
    </Grid>
  );
}
