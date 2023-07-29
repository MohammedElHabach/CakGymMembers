import React, { useEffect, useState } from "react";
import DataGridDemo from "./Table";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import  {
  decrementSessionCounter,
  getMembers,
  incrementSessionCounter,
  membersSlice,
} from "../../features/Members/membersSlice";
import AddDialog from "./AddDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import Spinner from "../../Components/Spinner/Spinner";
import { toast } from "react-toastify";

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

  const sessionCounters = useSelector((state) => state.members.sessionCounters);


  useEffect(() => {
    const storedSessionCounters = localStorage.getItem("sessionCounters");
    if (storedSessionCounters) {
      dispatch(membersSlice.actions.setSessionCounters(JSON.parse(storedSessionCounters)));
    }
  }, [dispatch]);


  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
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
      width: 140,
      renderCell: (params) => {
        return params.row.amountPaid + " $";
      },
    },
    {
      field: "ptPackage",
      headerName: "PT Package",
      width: 130,
      renderCell: (params) => {
        return params.row.ptPackage === true ? "Yes" : "No";
      },
    },
    {
      field: "sessions",
      headerName: "Sessions",
      width: 220,

      renderCell: (params) => {
        const member = params.row;
        const memberSessionCounter = sessionCounters[member._id] || 0; // Get the session counter for the member from Redux state

        const handleIncrementSession = (memberId) => {
          const member = members.find((m) => m._id === memberId);
          if (member) {
            const totalSessions = member.sessions;
            const memberSessionCounter = sessionCounters[memberId] || 0;
            if (memberSessionCounter < totalSessions) {
              dispatch(incrementSessionCounter({ memberId }));
            } else {
              // Show a message or handle the case when the member has reached the session limit
              toast.info(`${member.name} has reached the session limit`);
            }
          }
        };

        const handleDecrementSession = (memberId) => {
          dispatch(decrementSessionCounter({ memberId }));
        };

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <span>
              {params.row.ptPackage === false
                ? "-"
                : `${memberSessionCounter} of ${params.row.sessions}`}
            </span>
            {params.row.ptPackage === true && (
              <button
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "1px solid #1976D2",
                  color: "#1976D2",
                  padding: "5px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  cursor: "pointer",
                  fontSize: "16px",
                  margin: "4px 2px",
                }}
                variant="outlined"
                onClick={() => handleIncrementSession(member._id)}
              >
                +
              </button>
            )}
            {params.row.ptPackage === true && (
              <button
                style={{
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "1px solid #1976D2",
                  color: "#1976D2",
                  padding: "5px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "16px",
                  margin: "4px 2px",
                }}
                onClick={() => handleDecrementSession(member._id)}
              >
                -
              </button>
            )}
          </div>
        );
      },
    },
    {
      field: "trainer",
      headerName: "Trainer",
      width: 190,
      renderCell: (params) => {
        return params.row.tariner;
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

  if (isLoading) {
    return <Spinner />;
  }

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
