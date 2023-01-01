import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
//==============================

const Checks = [
  {
    month: "01",
    name: "Jan",
    color: "#f29d38",
  },
  {
    month: "02",
    name: "Feb",
    color: "#8d2095",
  },
  {
    month: "03",
    name: "Mar",
    color: "#5d1793",
  },
  {
    month: "04",
    name: "Apr",
    color: "#1452cf",
  },
  {
    month: "05",
    name: "May",
    color: "#52b4c4",
  },
  {
    month: "06",
    name: "Jun",
    color: "#409629",
  },
  {
    month: "07",
    name: "Jul",
    color: "#7fc73d",
  },
  {
    month: "08",
    name: "Aug",
    color: "#fffe54",
  },
  {
    month: "09",
    name: "Sep",
    color: "#f9cd46",
  },
  {
    month: "10",
    name: "Oct",
    color: "#f29d38",
  },
  {
    month: "11",
    name: "Nov",
    color: "#ef6f2e  ",
  },
  {
    month: "12",
    name: "Dec",
    color: "#ec3223",
  },
];
//==========================
export default function RentCard(props) {
  console.log(props.month);
  return (
    <Box
      sx={{
        boxShadow:
          props.status === "DUE"
            ? "0px 0px 2px 6px #ff000036"
            : "0px 0px 2px 6px #54ff5433",
        background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
        borderRadius: "8px",
        p: 2,
        mb: 1,
        mt: 5,
        // border:"4px solid lightGreen"
      }}
    >
      {/* --------------------------- */}

      {Checks.map((x) => {
        if (x.month === props.month) {
          return (
            <Box
              sx={{
                background: `linear-gradient(252deg,  ${x.color}, #ffecec)`,
                p: 5,
                height: "150px",
                width: "150px",
                borderRadius: "100%",
                boxShadow: "inset 0px 0px 8px 0px #3f51b5",
                position: "relative",
                bottom: "70px",
                left: "15px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bolder",
                  color: "white",
                  textAlign: "center",
                  mt: 1,
                }}
              >
                {x.name}
              </Typography>
            </Box>
          );
        }
      })}
      {/* --------------------------- */}

      <Typography
        sx={{
          mt: -5,
          fontFamily: "poppins",
          fontWeight: "bolder",
          color: "gray",
        }}
      >
        Rent : ₹ {props.rent.toLocaleString("en-IN")}{" "}
        <AppRegistrationIcon sx={{ ml: 6 }} />
      </Typography>
      <Typography
        sx={{
          mt: 1,
          fontFamily: "poppins",
          fontWeight: "bolder",
          color: "gray",
        }}
      >
        To be received : ₹ {props.rentDue.toLocaleString("en-IN")}
      </Typography>
      <Typography
        sx={{
          mt: 1,
          fontFamily: "poppins",
          fontWeight: "bolder",
          color: "gray",
        }}
      >
        E-Bill: ₹ {props.ebillDue.toLocaleString("en-IN")}
      </Typography>
    </Box>
  );
}
