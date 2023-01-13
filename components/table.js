import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { GridPrintExportOptions } from "@mui/x-data-grid";
//===========================================
export default function Table(props) {
  const router = useRouter();
  const [pageSize, setPageSize] = React.useState(5);

  //====================================================
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    tablePagination: { backgroundColor: "red" },
    [`& .${gridClasses.row}.even`]: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "#ff855f7d",
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        "@media (hover: none)": {
          backgroundColor: "transparent",
        },
      },
      "&.Mui-selected": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity
        ),
        "&:hover, &.Mui-hovered": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity
          ),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
  }));

  //=======================================================

  return (
    <Grid container>
      {/* ------------------------------ */}
      <Grid item lg={12} xs={12}>
        <StripedDataGrid
          scrollable
          onRowClick={props.handleClick}
          sx={{
            ".MuiTablePagination-displayedRows": {
              color: "#3c2400",
            },
            ".MuiTablePagination-selectLabel": {
              color: "#3c2400",
            },
            ".MuiDataGrid-toolbarContainer": {
              backgroundColor: "#d6cbcb70",
              color: "white",
              p: 2,
              borderRadius: 1.8,
            },
            ".MuiDataGrid-toolbarList	": {
              color: "red",
              // p: 2
            },
            "@media print": {
              ".MuiDataGrid-main": {
                // zoom: "45%",
                // width:"fit-content"
              },
            },
            "&.MuiDataGrid-root": {},
            ".MuiDataGrid-columnSeparator": {
              color: "green",
            },
            "& .MuiDataGrid-gridCOloumns": {
              color: "red",
              backgroundColor: "red",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#828df8",
              color: "white",
              fontWeight: "bolder",
            },
            // margin: 5,
            padding: 1,
            borderRadius: 2,
            boxShadow: "0px 4px 1px 0px #d2c6c6",
            marginTop: 5,
            height: "700px",
            // width: "100%",
            border: "1px solid #d2c6c657",
            // justifyContent: "center",
            backgroundColor: "white",
            //  overflowX: 'scroll'
            minWidth: "100%",
          }}
          // rowHeight={100}
          components={{ Toolbar: GridToolbar }}
          GridPrintExportOptions={{ color: "red" }}
          data={props.rows}
          pageSize={pageSize}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          rows={props.rows}
          columns={props.columns}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
 
        />
      </Grid>
    </Grid>
  );
}
