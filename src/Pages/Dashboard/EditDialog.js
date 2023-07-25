import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { editMember } from "../../features/Members/membersSlice";

export default function EditDialog(props) {
  const [editedDisplaySessionInput, setEditedDisplaySessionInput] =
    React.useState(false);
  // Use state initializer function to set initial state based on props.memberData
  const [editedMemberName, setEditedMemberName] = React.useState(() =>
    props.memberData ? props.memberData.name : ""
  );

  const [editedPhone, setEditedPhone] = React.useState(() =>
    props.memberData ? props.memberData.phone : ""
  );

  const [editedStartDate, setEditedStartDate] = React.useState(() =>
    props.memberData ? dayjs(props.memberData.startDate).toDate() : null
  );

  const [editedExpirationDate, setEditedExpirationDate] = React.useState(() =>
    props.memberData ? dayjs(props.memberData.expirationDate).toDate() : null
  );

  const [editedAmountPaid, setEditedAmountPaid] = React.useState(() =>
    props.memberData ? props.memberData.amountPaid : ""
  );

  const [editedPtPackage, setEditedPtPackage] = React.useState(() =>
    props.memberData ? props.memberData.ptPackage : false
  );

  const [editedNbOfSessions, setEditedNbOfSessions] = React.useState(() =>
    props.memberData ? props.memberData.sessions : ""
  );

  const notifyEdited = () => toast.success("Edited Successfully");
  const disptach = useDispatch();

  const handleStartDateChange = (date) => {
    console.log("Start date selected:", date);

    setEditedStartDate(date);
  };

  const handleExpirationDateChange = (date) => {
    console.log("Expiration date selected:", date);

    setEditedExpirationDate(date);
  };

  React.useEffect(() => {
    if (props.memberData) {
      setEditedMemberName(props.memberData.name);
      setEditedPhone(props.memberData.phone);
      setEditedStartDate(dayjs(props.memberData.startDate));
      setEditedExpirationDate(dayjs(props.memberData.expirationDate));
      setEditedAmountPaid(props.memberData.amountPaid);
      setEditedPtPackage(props.memberData.ptPackage);
      setEditedNbOfSessions(props.memberData.sessions);
    }
  }, [props.memberData]);

  const handleEditMember = (e) => {
    e.preventDefault();

    const dateFormat = "YYYY-MM-DD"; // Choose the desired date format

    const editedMemberData = {
      name: editedMemberName,
      phone: editedPhone,
      startDate: dayjs(editedStartDate).format(dateFormat),
      expirationDate: dayjs(editedExpirationDate).format(dateFormat),
      amountPaid: editedAmountPaid,
      ptPackage: editedPtPackage,
      sessions: editedNbOfSessions,
    };
    disptach(
      editMember({ id: props.editId, editedMemberData: editedMemberData })
    );

    notifyEdited();
    props.onClose();
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleEditMember}>
          <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
            Edit Member
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ marginBottom: "1rem" }}
                  label="Member Name"
                  variant="outlined"
                  value={editedMemberName}
                  onChange={(e) => {
                    setEditedMemberName(e.target.value);
                  }}
                />
                <TextField
                  sx={{ marginBottom: "1rem" }}
                  label="Phone"
                  type="number"
                  variant="outlined"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
                <DatePicker
                  label="Start Date"
                  sx={{ width: "15rem" }}
                  value={editedStartDate}
                  onChange={handleStartDateChange}
                />
                <DatePicker
                  label="End Date"
                  sx={{ width: "15rem", marginTop: "1rem" }}
                  value={editedExpirationDate}
                  onChange={handleExpirationDateChange}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ marginBottom: "1rem" }}
                  label="Amount Paid"
                  variant="outlined"
                  value={editedAmountPaid}
                  type="Number"
                  onChange={(e) => setEditedAmountPaid(e.target.value)}
                />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    PT Package
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={editedPtPackage}
                    onChange={(e) => setEditedPtPackage(e.target.value)}
                  >
                    <FormControlLabel
                      value={Boolean(true)}
                      control={<Radio />}
                      label="Yes"
                      onClick={() => {
                        setEditedDisplaySessionInput(true);
                      }}
                    />
                    <FormControlLabel
                      value={Boolean(false)}
                      control={<Radio />}
                      label="No"
                      onClick={() => {
                        setEditedDisplaySessionInput(false);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
                {editedDisplaySessionInput && (
                  <TextField
                    sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
                    label="Number Of Sessions"
                    type="number"
                    variant="outlined"
                    value={editedNbOfSessions}
                    onChange={(e) => setEditedNbOfSessions(e.target.value)}
                  />
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type="submit" autoFocus>
              Edit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
