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
import { addMember } from "../../features/Members/membersSlice";
import dayjs from "dayjs";

export default function AddDialog(props) {
  const [displaySessionInput, setDisplaySessionInput] = React.useState(false);
  const [memberName, setMemberName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [startDate, setStartDate] = React.useState();
  const [expirationDate, setExpirationDate] = React.useState();
  const [amountPaid, setAmountPaid] = React.useState();
  const [ptPackage, setPtPackage] = React.useState();
  const [nbOfSessions, setNbOfSessions] = React.useState("");
  const [trainer, setTrainer] = React.useState("");


  const notifyError = () => toast.error("Enter All Required Fields");
  const notifyAdded = () => toast.success("Added Successfully");
  const disptach = useDispatch();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleExpirationDateChange = (date) => {
    setExpirationDate(date);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
   
    if (
      memberName.trim() === "" ||
      phone.trim() === "" ||
      startDate === null ||
      expirationDate === null ||
      amountPaid.trim() === "" ||
      ptPackage === null || trainer.trim()===''
    ) {
      notifyError();
      return;
    }

    const dateFormat = "YYYY-MM-DD"; // Choose the desired date format

    const memberData = {
      name: memberName,
      phone,
      startDate: dayjs(startDate).format(dateFormat),
      expirationDate: dayjs(expirationDate).format(dateFormat),
      amountPaid,
      ptPackage,
      sessions: nbOfSessions,
      trainer
    };
    setMemberName("");
    setPhone("");
    setStartDate();
    setExpirationDate();
    setAmountPaid("");
    setPtPackage();
    setNbOfSessions("");
    setTrainer("")
    disptach(addMember(memberData));
    setDisplaySessionInput(false);
    
      notifyAdded();
    
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
        <form onSubmit={handleAddMember}>
          <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
            Add Member
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
                  required
                  sx={{ marginBottom: "1rem" }}
                  label="Member Name"
                  variant="outlined"
                  value={memberName}
                  onChange={(e) => {
                    setMemberName(e.target.value);
                    console.log(memberName);
                  }}
                />
                <TextField
                  required
                  sx={{ marginBottom: "1rem" }}
                  label="Phone"
                  type="number"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <DatePicker
                  label="Start Date"
                  sx={{ width: "15rem" }}
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End Date"
                  sx={{ width: "15rem", marginTop: "1.5rem" }}
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  renderInput={(params) => <TextField {...params} />}
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
                  required
                  sx={{ marginBottom: "1rem" }}
                  label="Amount Paid"
                  variant="outlined"
                  value={amountPaid}
                  type="Number"
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    PT Package
                  </FormLabel>
                  <RadioGroup
                    row
                    required
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={ptPackage}
                    onChange={(e) => setPtPackage(e.target.value)}
                  >
                    <FormControlLabel
                      value={Boolean(true)}
                      control={<Radio />}
                      label="Yes"
                      onClick={() => {
                        setDisplaySessionInput(true);
                      }}
                    />
                    <FormControlLabel
                      value={Boolean(false)}
                      control={<Radio />}
                      label="No"
                      onClick={() => {
                        setDisplaySessionInput(false);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
                {displaySessionInput && (
                  <TextField
                    sx={{ marginBottom: "1rem", marginTop: "0.45rem" }}
                    label="Number Of Sessions"
                    type="number"
                    variant="outlined"
                    value={nbOfSessions}
                    onChange={(e) => setNbOfSessions(e.target.value)}
                  />
                )}
                <TextField
                  required
                  sx={{ marginTop: "0.5rem" }}
                  label="Trainer"
                  variant="outlined"
                  value={trainer}
                  type="text"
                  onChange={(e) => setTrainer(e.target.value)}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type="submit" autoFocus>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
