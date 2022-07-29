import {
  Autocomplete,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
}                                                  from "@mui/material";
import {observer}                                  from "mobx-react";
import React, {useEffect, useState}                from "react";
import "./Styles/Chat.scss";
import PublicIcon
                                                   from '@mui/icons-material/Public';
import {useStores}                                 from "../../Hooks";
import AddIcon
                                                   from '@mui/icons-material/Add';
import {connectToSocket, getAllUsers, sendMessage} from "../../Services";
import SendIcon
                                                   from '@mui/icons-material/Send';
import {Form, Formik}                              from "formik";
import {MessageList}                               from "react-chat-elements";
import PersonIcon
                                                   from '@mui/icons-material/Person';
import {SOCKET}                                    from "../../Constants";

export const Chat = observer(() => {
  const {userStore, chatStore} = useStores();
  const [selectedChat, setSelectedChat] = useState(SOCKET.PUBLIC);
  const data = chatStore.getMessageList(selectedChat);
  const userNames = userStore.getUserNames();
  const currentUserContacts = chatStore.getCurrentUserContacts();
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  }
  const handleAddChat = (values, {resetForm}) => {
    console.log(values);
    if (userNames.includes(values.chat) && !currentUserContacts.includes(
        values.chat)) {
      chatStore.addContact(values.chat);
    }
    resetForm({values: ''});
  }
  const handleSendMessage = (values, {resetForm}) => {
    sendMessage(values, selectedChat);
    resetForm({values: ''});
  }
  useEffect(() => {
    connectToSocket();
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData().catch(console.error);
  });
  return (
      <Box className="chat">
        <Typography variant="h4" className="chat-greeting">
          CHAT
        </Typography>
        <Box className="chat-box">
          <List className="chat-box-left" disablePadding>
            <Formik
                onSubmit={handleAddChat}
                initialValues={{chat: SOCKET.PUBLIC}}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                  <Form className="chat-box-search">
                    <Autocomplete
                        freeSolo
                        disableClearable
                        onInputChange={(event, value) => {
                          values.chat = value;
                        }}
                        renderInput={(params) => {
                          return (
                              <TextField {...params}
                                         type="text"
                                         name="chat"
                                         label="Search"
                                         variant="outlined"
                                         onChange={handleChange("chat")}
                                         onBlur={handleBlur("chat")}
                                         fullWidth
                                         InputProps={{
                                           ...params.InputProps,
                                           endAdornment: (
                                               <IconButton
                                                   type="submit"
                                                   size={"large"}
                                                   onClick={handleSubmit}
                                               >
                                                 <AddIcon fontSize="inherit" />
                                               </IconButton>
                                           )
                                         }}
                              />
                          );
                        }}
                        options={userNames}
                    />
                  </Form>
              )}
            </Formik>
            <ListItemButton className="chat-button" dense
                            onClick={() => handleSelectChat("Public")}
            >
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Public" />
            </ListItemButton>
            {
              currentUserContacts.map((contact) => (
                  <ListItemButton key={contact} className="chat-button" dense
                                  onClick={() => handleSelectChat(contact)}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={contact} />
                  </ListItemButton>
              ))
            }
          </List>
          <Box className="chat-box-right">
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={data}
            />
            <Formik
                initialValues={{message: ""}}
                onSubmit={handleSendMessage}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                  <Form className="chat-box-bottom">
                    <TextField
                        type="text"
                        name="message"
                        label={`Message to ${selectedChat}`}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange("message")}
                        onBlur={handleBlur("message")}
                        value={values.message}
                        InputProps={{
                          endAdornment: (
                              <IconButton
                                  type="submit"
                                  size={"large"}
                                  onClick={handleSubmit}
                              >
                                <SendIcon fontSize="inherit" />
                              </IconButton>
                          )
                        }}
                    />
                  </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
  );
});
