import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        // disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: "gray",
        },
        focused: {
          backgroundColor: "red",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          // borderColor: "transparent",
          borderWidth: 1,
          // backgroundColor:"gray",
          focused: {
            borderColor: "red",
            backgroundColor: "red",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6",
          ".MuiTableCell-root": {
            color: "#374151",
          },
          borderBottom: "none",
          "& .MuiTableCell-root": {
            borderBottom: "none",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },

    MuiDataGridToolbarContainer: {
      styleOverrides: { backgroundColor: "red" },
    },
  },
  //======================= Custom Styling =========================
  //----------- Button ----------------------------------
  // custom: {
  //   Button: {
  //     background: 'linear-gradient(43deg, #8b5704, #ddb070)',
  //     color: 'white',
  //     width: "40%",
  //     mt: 3
  //   },
  //   editButton: {
  //     background: 'linear-gradient(43deg, #8b5704, #8b5704)',
  //     color: 'white',
  //     iconStyle: {
  //       marginLeft: 1,
  //       width: 23,
  //       height: 23,
  //     },
  //   },
  //   addButton: {
  //     background: 'linear-gradient(43deg, #8b5704, #8b5704)',
  //     color: 'white',
  //     mt: 1,
  //     fontWeight: 'bolder',
  //   },
  //   modal: {
  //     background: 'linear-gradient(11deg, rgb(252 252 253), #f5f5f5)',
  //     p: 7,
  //     borderRadius: 1,
  //     boxShadow: '0px 4px 1px 0px #d2c6c6',
  //     border: '1px solid #d2c6c657',
  //   },
  //   selected: {
  //     background: 'linear-gradient(43deg, #8b5704, #ddb070)',
  //     color: 'white',
  //   },
  //   //----------- Cards/Grid ----------------------------------
  //   infoCard: {
  //     bg: {
  //       backgroundColor: "#FDFAF2",
  //     },

  //   },
  //   margin: {
  //     marginRight: 5
  //   },
  //   inventoryCard: {
  //     bg: {
  //       backgroundColor: "#FDFAF2",
  //       display: "flex",
  //       // justifyContent:"start",
  //       cursor: "pointer",

  //       width: "100%",
  //       borderRadius: 1,
  //       p: "10% 5%",
  //       height: "100%",
  //       boxShadow: '-3px 3px 4px -2px #d2c6c6',
  //       border: '1px solid #d2c6c657',
  //     },
  //     selectedBg: {
  //       backgroundColor: "#905E0F",
  //       color: "white",
  //       display: "flex",
  //       // justifyContent:"start",
  //       cursor: "pointer",

  //       width: "100%",
  //       borderRadius: 1,
  //       p: "10% 5%",
  //       height: "100%",
  //       boxShadow: '-3px 3px 4px -2px #d2c6c6',
  //       border: '1px solid #d2c6c657',
  //     },
  //   },
  //   invoiceCard: {

  //     p: 10,

  //     borderRadius: 5,
  //     backgroundColor: "white",
  //     boxShadow: '-3px 3px 4px -2px #d2c6c6',
  //     border: '1px solid #d2c6c657',
  //   },
  //   invoiceGridItem: {
  //     padding: "2px 150px",
  //     minWidth: "100%",
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "space-between",
  //     mb: 4,
  //   },
  //   retailCard: {
  //     bg: {
  //       backgroundColor: "#FDFAF2",
  //       width: "50%",
  //       borderRadius: 1,
  //       p: "10% 20%",
  //       // height: "100%",
  //       boxShadow: '-3px 3px 4px -2px #d2c6c6',
  //       border: '1px solid #d2c6c657',
  //     }
  //   },
  //   buySaveCard: {
  //     bg: {
  //       backgroundColor: "#FDFAF2",
  //       minWidth: "100%",
  //       borderRadius: 1,

  //       p: "2% 2%",
  //       height: "100%",
  //       boxShadow: '-3px 3px 4px -2px #d2c6c6',
  //       border: '1px solid #d2c6c657',
  //     },
  //   },
  //   cardModal: {
  //     box: {
  //       p: 2,
  //       display: "flex",
  //       justifyContent: "space-between",
  //       width: 380,
  //       background: 'linear-gradient(11deg, rgb(252 252 253), #f5f5f5)',
  //       borderRadius: 1,
  //       boxShadow: '0px 4px 1px 0px #d2c6c6',
  //       border: '1px solid #d2c6c657',
  //     }
  //   },

  //   //----------- Typography ----------------------------------
  //   typography: {
  //     infoCard: {
  //       bg: {
  //         backgroundColor: "#FDFAF2",

  //       },
  //       h1: {
  //         fontFamily: "poppins",
  //         color: "#0B0B0A",
  //         fontSize: 20,
  //         fontWeight: "medium",
  //         mt: 5,
  //         mb: 1

  //       },
  //       h2: {
  //         fontFamily: "poppins",
  //         fontSize: 16,
  //         fontWeight: "medium",
  //       },
  //       h3: {
  //         fontFamily: "poppins",
  //         fontSize: 14,
  //         // fontWeight: "regular",
  //         mt: 2,
  //         cursor: "pointer"
  //       },
  //     },
  //     sideBar: {
  //       fontFamily: "poppins",
  //       fontSize: 16,
  //       fontWeight: "bold",
  //     },
  //     dashBoard: {
  //       heading: {
  //         cursor: "pointer",
  //         fontSize: 22,
  //         color: "black",
  //         fontWeight: "bold",
  //         mt: 1
  //       },
  //       h1: {
  //         fontFamily: "poppins",
  //         color: "#905E0F",
  //         fontSize: "18px",
  //         fontWeight: "medium",
  //         // overflowWrap:"wrap"
  //         black: {
  //           color: "black"
  //         }

  //       },
  //       h2: {
  //         fontFamily: "poppins",
  //         fontSize: 26,
  //         color: "#001737",
  //         fontWeight: "bold",

  //       },
  //       h3: {
  //         fontFamily: "poppins",
  //         fontSize: 17,
  //         color: "#495463",

  //         error: {
  //           color: "red",
  //           mr: 1
  //         },
  //         success: {
  //           color: "#14b8a6",
  //           mr: 1
  //         }
  //       },
  //     },
  //     inventoryCard: {
  //       heading: {
  //         fontSize: 21,
  //         fontWeight: "bolder",
  //         color: "#8B5704",
  //         mb: 2,
  //         mt: 5
  //       },
  //       h1: {
  //         fontSize: 19,
  //         color: "#8B5704",
  //         fontWeight: 600,
  //         mb: 2
  //       },
  //       h2: {
  //         fontSize: 22,
  //         fontWeight: "bold",
  //         color: "#001737"
  //       },
  //       selectedH1: {
  //         fontSize: 19,
  //         color: "white",
  //         fontWeight: 600,
  //         mb: 2
  //       },
  //       selectedH2: {
  //         fontSize: 22,
  //         fontWeight: "bold",
  //         color: "white"
  //       },
  //       span: {
  //         color: "gray",
  //         fontSize: "15px"
  //       },
  //       selectedSpan: {
  //         color: "white",
  //         fontSize: "15px"
  //       },
  //     },
  //     reports: {
  //       fontWeight: 'regular',
  //       fontSize: 20,
  //       color: "gray",
  //       lineHeight: 2.2
  //     },
  //     invoice: {
  //       text_12: {
  //         fontSize: 12,

  //         fontWeight: "regular",
  //         color: "black",
  //         bold: {
  //           fontWeight: "bold", color: "black", mr: 6
  //         },
  //         light: {
  //           fontWeight: "light", color: "black"
  //         }
  //       },
  //       text_16: {
  //         fontSize: 16,
  //         fontWeight: "bold",
  //         color: "black"
  //       },
  //       text_24: {
  //         fontSize: 24,
  //         fontWeight: "medium",
  //         color: "black",
  //         mb: 3,
  //         mt: 3
  //       },
  //       text_14: {
  //         fontSzie: 14,
  //         bold: {
  //           fontWeight: "bold", color: "black"
  //         },
  //         light: {
  //           fontWeight: "light", color: "black"
  //         }
  //       }
  //     },

  //==================== OFS =============================================
  custom: {
    primary: {
      main: "#99aab5",
      light: "#99aab5",
      dark: "#23272a",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#ff9e80",
      light: "#a7a5cb",
      dark: "#23272a",
      contrastText: "#FFFFFF",
    },
    navbar: {
      light: {
        backgroundColor: "#a7a5cb",
      },
      dark: {
        backgroundColor: "#1b1a32",
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: "bold",
        color: "gray",
      },
      h2: {},
    },
  },

  primaryBtn: {
    backgroundColor: "#7289da",
    fontWeight: "bolder",
    color: "white",
    "&:hover": {
      color: "#7289da",
      border: "2px solid #7289da",
      backgroundColor: "white",
    },
  },

  lightCard:{
    backgroundColor:"#ffffff",
    color:"#23272a",
    borderRadius:1,
  },

  lightText:{
    color:"#ffffff",
    fontFamily:"poppins"
  },
  darkText:{
    color:"#23272a",
    fontFamily:"poppins"

  },

  //==================================================================
  palette: {
    neutral: {
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "#acb2ef",

      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background: {
      default: "#F9FAFC",
      paper: "#FFFFFF",
    },
    divider: "#E6E8F0",
    primary: {
      main: "#ff9e80",
      light: "#828DF8",
      dark: "#3832A0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#80E1FF",
      light: "#3FC79A",
      dark: "#0B815A",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFB020",
      light: "#FFBF4C",
      dark: "#B27B16",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#121828",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
  // typography: {
  //   button: {
  //     fontWeight: 600,
  //   },
  //   fontFamily:
  //     '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  //   body1: {
  //     fontSize: '1rem',
  //     fontWeight: 400,
  //     lineHeight: 1.5,
  //   },
  //   body2: {
  //     fontSize: '0.875rem',
  //     fontWeight: 400,
  //     lineHeight: 1.57,
  //   },
  //   subtitle1: {
  //     fontSize: '1rem',
  //     fontWeight: 500,
  //     lineHeight: 1.75,
  //   },
  //   subtitle2: {
  //     fontSize: '0.875rem',
  //     fontWeight: 500,
  //     lineHeight: 1.57,
  //   },
  //   overline: {
  //     fontSize: '0.75rem',
  //     fontWeight: 600,
  //     letterSpacing: '0.5px',
  //     lineHeight: 2.5,
  //     textTransform: 'uppercase',
  //   },
  //   caption: {
  //     fontSize: '0.75rem',
  //     fontWeight: 400,
  //     lineHeight: 1.66,
  //   },
  //   h1: {
  //     fontWeight: 700,
  //     fontSize: '3.5rem',
  //     lineHeight: 1.375,
  //   },
  //   h2: {
  //     fontWeight: 700,
  //     fontSize: '3rem',
  //     lineHeight: 1.375,
  //   },
  //   h3: {
  //     fontWeight: 700,
  //     fontSize: '2.25rem',
  //     lineHeight: 1.375,
  //   },
  //   h4: {
  //     fontWeight: 700,
  //     fontSize: '2rem',
  //     lineHeight: 1.375,
  //   },
  //   h5: {
  //     fontWeight: 600,
  //     fontSize: '1.5rem',
  //     lineHeight: 1.375,
  //   },
  //   h6: {
  //     fontWeight: 600,
  //     fontSize: '1.125rem',
  //     lineHeight: 1.375,
  //   },
  // },
});

export const themeHai = createTheme({
  colors: {
    primary: {
      color: "blue",
    },
    secondary: {
      color: "green",
    },
  },
});
