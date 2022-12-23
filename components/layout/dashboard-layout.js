import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import  DashboardNavbar  from "../dashboard-navbar";
import DashboardSidebar  from "../sidebar/dashboard-sidebar";
import { useSidebarOpen } from "../../context/sidebarOpen";
//===============================================================
const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  paddingTop: 71,
  [theme.breakpoints.down("xl")]: {
    paddingLeft: "5%",
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "20%",
    // margin:"15%"
  },
  // [theme.breakpoints.up("xs")]: {
  //   paddingLeft: "25%",
  // },
}));
//===============================================================
export default function DashboardLayout(props) {
  //=============================================================
  const { children } = props;
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const{ sidebarOpen,setSidebarOpen} = useSidebarOpen()


  //=============================================================
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            backgroundColor:"white",
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            // height:"50vh"
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        // showFilter={props.showFilter}
        open={sidebarOpen}

        onSidebarOpen={() => setSidebarOpen(true)}
      />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        // open={isSidebarOpen
        open={sidebarOpen}
      />
    </>
  );
};
//===============================================================
