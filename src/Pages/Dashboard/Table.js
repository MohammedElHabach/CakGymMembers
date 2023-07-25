import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataGridDemo(props) {
  return (
    <Box sx={{ height: 760, width: "100%", marginTop: "1rem" }}>
     
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: GridToolbar,
        }}
        getRowId={props.getRowId}
      />
    </Box>
  );
}
