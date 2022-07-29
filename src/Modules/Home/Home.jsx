import {Box, Typography} from "@mui/material";
import {observer}        from "mobx-react";
import React             from "react";
import {useStore}        from "../../Hooks";
import "./Styles/Home.scss";
import {isEnteredChat}   from "../../Services";

export const Home = observer(() => {
  const chatStore = useStore("chatStore");
  const isCurrentUserEnteredChat = isEnteredChat();
  const currentUserName = chatStore.getCurrentUserName();
  return (
      <Box className="home">
        <Typography variant="h3" className="home-greeting">
          Welcome{isCurrentUserEnteredChat && (`, ${currentUserName}`)}!
        </Typography>
      </Box>
  );
});
