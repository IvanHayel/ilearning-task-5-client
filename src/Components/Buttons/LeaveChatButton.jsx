import LogoutIcon    from "@mui/icons-material/Logout";
import {IconButton}  from "@mui/material";
import React         from "react";
import {useNavigate} from "react-router-dom";
import {leaveChat}   from "../../Services";
import {ROUTE_URL}   from "../../Constants";

export const LeaveChatButton = () => {
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    leaveChat();
    navigate(ROUTE_URL.HOME);
  };
  return (
      <IconButton
          variant="outlined"
          color="inherit"
          size="medium"
          onClick={handleLeaveChat}
      >
        <LogoutIcon fontSize="large" />
      </IconButton>
  );
};
