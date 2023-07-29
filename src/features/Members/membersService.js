import axios from "axios";

const membersURL = process.env.REACT_APP_URL + "/members";
const expDateURL = membersURL+"/expDate"
// Get Members
const getMembers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(membersURL, config);

  return response.data;
};

// Add Member
const addMember = async (memberData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(membersURL,memberData,config);

  return response.data;
};

// Delete Member
const deleteMember = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(membersURL+"/"+id,config);

  return response.data;
};

// Edit Member
const editMember = async (id,editedMemberData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.put(membersURL+"/"+id,editedMemberData,config);
  
    return response.data;
  };

  //Get expiration date by phone number
  const getExpirationDateByPhone = async (phone) => {
    const response = await axios.post(expDateURL,{phone});
  
    return response.data;
  };

  //take attendance
  const takeAttendance = async (attendanceData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.post(membersURL+"/attendance",attendanceData,config);
  
    return response.data;
  };


const membersService = {
  getMembers,
  addMember,
  deleteMember,
  editMember,
  getExpirationDateByPhone,
  takeAttendance
};
export default membersService;
