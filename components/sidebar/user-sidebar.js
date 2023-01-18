import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import {
  ListItemText,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
  useMediaQuery,
  Switch,
} from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDarkMode } from "../../context/darkMode";
import { useTheme } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

//===================================================================
const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//========================================================================
export default function DashboardSidebar(props) {
  const { darkMode, setDarkMode } = useDarkMode();
  const theme = useTheme();
  //========================================================================
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  //========================================================================
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);
  //----------------------------
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //=========================================================
  return (
    <>
      <Drawer
        sx={{
          background: darkMode
            ? "linear-gradient(#2c2f33, #2c2f33)"
            : "linear-gradient(#99aab5, #99aab5)",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader
          sx={{
            backgroundColor: darkMode
              ? theme.custom.primary.dark
              : theme.custom.primary.light,
          }}
        >
          <Typography
            variant="h7"
            sx={
              darkMode
                ? [theme.lightText, { mr: 5 }]
                : [theme.darkText, { mr: 5 }]
            }
          >
            {" "}
            User Home
          </Typography>

          <IconButton onClick={props.onClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List sx={{ mt: -2 }}>
          {[
            {
              href: "/user/profile",
              title: "Profile",
              icon: (
                <AccountCircleIcon
                  sx={{
                    color: darkMode ? "white" : "#2c2f33",
                  }}
                />
              ),
            },
            {
              href: "/user/rents",
              title: "Rents",
              icon: (
                <RequestQuoteIcon
                  sx={{
                    color: darkMode ? "white" : "#2c2f33",
                  }}
                />
              ),
            },
            {
              href: "/user/ebills",
              title: "E-bills",
              icon: (
                <BroadcastOnHomeIcon
                  sx={{
                    color: darkMode ? "white" : "#2c2f33",
                  }}
                />
              ),
            },
            {
              href: "/user/notices",
              title: "Notices",
              icon: (
                <AccountBalanceIcon
                  sx={{
                    color: darkMode ? "white" : "#2c2f33",
                  }}
                />
              ),
            },
          ].map((text, index) => (
            <ListItem
              key={text.title}
              disablePadding
              sx={{
                display: "block",
                fontWeight: "bolder",
                backgroundColor: darkMode ? "#2c2f33" : "white",
                color: darkMode ? "white" : "#2c2f33",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  fontWeight: "bolder",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : null,
                    justifyContent: "start",
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  <NextLink href={text.href} passHref>
                    {text.icon}
                  </NextLink>
                  {/* <DashboardIcon/> */}
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <NextLink
                  sx={{ fontWeight: "bolder" }}
                  href={text.href}
                  passHref
                >
                  {open ? (
                    <ListItemText>
                      <Typography sx={{ fontWeight: 600 }}>
                        {text.title}
                      </Typography>
                    </ListItemText>
                  ) : null}
                </NextLink>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}

        <Box
          sx={{
            background: darkMode
              ? "linear-gradient(#2c2f33, #2c2f33)"
              : "white",
            mt: -2,
            height: "80vh",
            display: "flex",
          }}
        >
          <Switch
            sx={{ mt: 5 }}
            onChange={() => setDarkMode((prev) => !prev)}
            label="dark"
          />

          <Typography
            sx={
              darkMode
                ? [theme.lightText, { mt: 6 }]
                : [theme.darkText, { mt: 6 }]
            }
          >
            Dark Mode
          </Typography>
        </Box>

        <Box
          sx={{
            background: darkMode
              ? "linear-gradient(#2c2f33, #2c2f33)"
              : "white",
            // mt: -2,

            height: "80vh",
            display: "flex",
          }}
          onClick={() => {
            // if (typeof window !== "undefined") {
            // }
            localStorage.clear();
            Swal.fire(
              "You have been logged out!",
              "Log in to continue",
              "success"
            )
              .then(() => {
                onClose;
              })
              .finally(() => {
                // window.location.reload();
                router.push("/user/login");
              });
          }}
        >
          <LogoutIcon
            sx={{
              color: darkMode ? "white" : "black",
              ml: 2,
            }}
          />

          <Typography
            sx={
              darkMode
                ? [theme.lightText, { ml: 1 }]
                : [theme.darkText, { ml: 1 }]
            }
          >
            Logout
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
//========================================================================
DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
