import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {observer}                                     from "mobx-react";
import React                                          from "react";
import {useNavigate}                                  from "react-router-dom";
import {EnterChatModal, LeaveChatButton,}             from "../../Components/";
import {ROUTE_URL}                                    from "../../Constants";
import {isEnteredChat}                                from "../../Services";
import "./Styles/Header.scss";
import ChatIcon
                                                      from '@mui/icons-material/Chat';

export const Header = observer(() => {
  const navigate = useNavigate();
  const isCurrentUserEnteredChat = isEnteredChat();
  const handleBrandClick = () => navigate(ROUTE_URL.HOME);
  const handleChatClick = () => {
    navigate(ROUTE_URL.CHAT);
  }
  return (
      <AppBar position="sticky" className="header-bar"
              sx={{backgroundColor: 'mediumpurple'}}>
        <Toolbar>
          <Typography
              variant="h5"
              noWrap
              onClick={handleBrandClick}
              className="brand"
          >
            Task 5
          </Typography>
          <Box className="main-buttons">

          </Box>
          <Box className="sign-group">
            {isCurrentUserEnteredChat ? (
                <>
                  <IconButton
                      color="inherit"
                      size="medium"
                      onClick={handleChatClick}
                  >
                    <ChatIcon fontSize="large" />
                  </IconButton>
                  <LeaveChatButton />
                </>
            ) : (
                <EnterChatModal />
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
});
