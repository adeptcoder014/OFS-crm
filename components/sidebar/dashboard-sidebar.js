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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDarkMode } from "../../context/darkMode";
import { useTheme } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
//===================================================================
const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "red",
  height: 80,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
//========================================================================
export default function DashboardSidebar(props) {
  const { darkMode, setDarkMode } = useDarkMode();
  const theme = useTheme();

  // const [opN, setOpN] = useState(false);

  // const handleClickOpen = () => {
  //   setOpN(true);
  // };

  // const handleClose = () => {
  //   setOpN(false);
  // };
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

  //=========================================================
  return (
    <>
      <Drawer variant="permanent" open={open}>
        {/* ==========  Drawer_Header(Logo part) =========================== */}
        {open ? (
          <DrawerHeader
            sx={{
              backgroundColor: darkMode
                ? theme.custom.primary.dark
                : theme.custom.primary.light,
            }}
          >
            <Box
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 1,
                backgroundColor: darkMode
                  ? theme.custom.primary.dark
                  : theme.custom.primary.light,
                width: "100%",
              }}
            >
              <Image
                // onClick={() => router.push("/")}
                style={{
                  margin: "auto",
                  marginTop: 18,
                }}
                src="/logo.png"
                alt="me"
                width="120"
                height="100"
              />
              <Box
                sx={{
                  // backgroundColor:"red",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: darkMode
                      ? theme.custom.primary.contrastText
                      : theme.custom.primary.contrastText,
                  }}
                >
                  One Fine Stay
                </Typography>
                <Typography
                  sx={{
                    mb: 3,
                    fontSize: 12,
                    fontWeight: "bold",
                    color: darkMode
                      ? theme.custom.primary.contrastText
                      : theme.custom.primary.contrastText,
                  }}
                >
                  Arise Enterprise ©️
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{ color: "white", border: "1px solid white" }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
        ) : (
          <Box sx={{ mt: 8 }} />
        )}

        <Divider />
        {/* ==========  SidebarMenu_Items(Dynamic-->comes from the Constants file) =========================== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: darkMode
              ? theme.custom.primary.dark
              : theme.custom.primary.light,
            color: "white",
          }}
        >
          <List>
            {[
              {
                href: "/admin/home",
                title: "Dashboard",
                icon: <DashboardIcon />,
              },
              {
                href: "/admin/user/rental",
                title: "Rental",
                icon: <RequestQuoteIcon />,
              },
              {
                href: "/admin/notice",
                title: "Notice",
                icon: <BroadcastOnHomeIcon />,
              },
              {
                href: "/admin/accounts",
                title: "Accounts",
                icon: <AccountBalanceIcon />,
              },
            ].map((text, index) => (
              <ListItem
                key={text.title}
                disablePadding
                sx={{ display: "block", fontWeight: "bolder" }}
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
                    <NextLink
                      sx={{ fontWeight: "bolder" }}
                      href={text.href}
                      passHref
                    >
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
          <Box
            disableRipple
            onClick={() => router.push("/")}
            sx={{
              // zoom: '90%',
              //   background: 'linear-gradient(45deg, #ff4b4b, #ffb5b5)',
              display: "flex",
              // justifyContent:"space-around",
              cursor: "pointer",
              color: "gray",
              fontWeight: "bolder",
              p: 1,
              height: "100%",
              alignItems: "end",
              width: "100%",
              marginRight: 1,
              borderRadius: 1,
              mb: 2,
              textAlign: "center",
              //   flex: 1,
            }}
          >
            {/* <AccountBoxIcon sx={{ mr: 2, fontSize: "36px" }} />
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Nischal Gupta</Typography>
              <Typography variant="caption">Adept Baniya</Typography>
            </Box> */}
          </Box>
          <Box
            onClick={() => {
              // if (typeof window !== "undefined") {
              // }
              localStorage.clear();
              Swal.fire(
                "You have been logged out!",
                "Log in to continue",
                "success"
              ).then(res => window.location.reload())
            }}
            sx={{
              // zoom: '90%',
              // background: 'linear-gradient(45deg, #ff4b4b, #ffb5b5)',
              display: "flex",
              justifyContent: "start",
              alignItems: "flex-end",
              color: "gray",
              cursor: "pointer",
              fontWeight: "bolder",
              p: 1,
              width: "100%",
              marginRight: 1,
              borderRadius: 1,
              textAlign: "right",
              flex: 1,
              color: "white",
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: "white" }} />
            Logout
          </Box>{" "}
          <Box
            sx={{
              backgroundColor: darkMode
                ? theme.custom.primary.dark
                : theme.custom.primary.light,
            }}
          >
            <Switch
              sx={{ mb: 2 }}
              onChange={() => setDarkMode((prev) => !prev)}
              label="dark"
            />

            {darkMode ? (
              <DarkModeIcon
                sx={{
                  color: "#80E1FF",
                }}
              />
            ) : (
              <LightModeIcon sx={{ color: "orange" }} />
            )}
          </Box>
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
