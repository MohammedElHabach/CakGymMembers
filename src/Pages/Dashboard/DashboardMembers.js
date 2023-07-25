import React, { useEffect, useState } from "react";
import DataGridDemo from "./Table";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getMembers } from "../../features/Members/membersSlice";
import AddDialog from "./AddDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const DashboardMembers = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [deleteId, setDeleteId] = useState();
  const [editId, setEditId] = useState();

  const [selectedMemberData, setSelectedMemberData] = useState(null);

  const dispatch = useDispatch();
  const { members, isLoading, isError, message } = useSelector(
    (state) => state.members
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getMembers());
  }, [dispatch, isError, message]);

  const columns = [
    {
      field: "name",
      headerName: "Member Name",
      width: 190,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 190,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 190,
      renderCell: (params) => {
        return params.row.startDate.split("T")[0];
      },
    },
    {
      field: "expirationDate",
      headerName: "Expiration Date",
      width: 190,
      renderCell: (params) => {
        return params.row.expirationDate.split("T")[0];
      },
    },
    {
      field: "amountPaid",
      headerName: "Amount Paid",
      width: 190,
    },
    {
      field: "ptPackage",
      headerName: "PT Package",
      width: 190,
      renderCell: (params) => {
        return params.row.ptPackage === true ? "Yes" : "No";
      },
    },
    {
      field: "sessions",
      headerName: "Sessions",
      width: 190,
      renderCell: (params) => {
        return params.row.ptPackage === false ? "-" : params.row.sessions;
      },
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 190,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              setEditId(params.row._id);
              setSelectedMemberData(params.row);
              setOpenEditDialog(true);
            }}
            variant="contained"
            color="primary"
            startIcon={<Edit />}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "red",
              "&:hover": {
                color: "white",
                backgroundColor: "red",
              },
            }}
            startIcon={<GridDeleteIcon />}
            onClick={() => {
              setDeleteId(params.row._id);
              setOpenDeleteDialog(true);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const getRowId = (row) => {
    return row._id;
  };

  const onClose = () => {
    setOpenAddDialog(false);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Members</h1>
      <Button
        onClick={() => {
          setOpenAddDialog(true);
        }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add Member
      </Button>
      <DataGridDemo rows={members} columns={columns} getRowId={getRowId} />
      <AddDialog open={openAddDialog} onClose={onClose} />
      <DeleteDialog
        deleteId={deleteId}
        open={openDeleteDialog}
        onClose={onClose}
      />
      <EditDialog
        editId={editId}
        memberData={selectedMemberData}
        open={openEditDialog}
        onClose={onClose}
      />
    </>
  );
};

export default DashboardMembers;
