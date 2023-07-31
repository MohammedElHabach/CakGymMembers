import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteMember } from "../../features/Members/membersSlice";



export default function DeleteDialog(props) {
  

  const notifyDeleted = () => toast.success("Deleted Successfully");
  const dispatch = useDispatch();

 

  const handleDeleteMember = (e) => {
    e.preventDefault();
    dispatch(deleteMember(props.deleteId))
    notifyDeleted()
    props.onClose()
  }
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleDeleteMember}>
          <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
           Are You Sure ?
          </DialogTitle>
          <DialogContent>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button sx={{color:"red"}} type="submit" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
