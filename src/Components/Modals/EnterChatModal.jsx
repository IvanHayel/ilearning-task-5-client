import {AccountCircle}            from "@mui/icons-material";
import LoginIcon                  from "@mui/icons-material/Login";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
}                                 from "@mui/material";
import {Form, Formik}             from "formik";
import {observer}                 from "mobx-react-lite";
import React, {useState}          from "react";
import * as Yup                   from "yup";
import {enterChat, isEnteredChat} from "../../Services";
import {Copyright}                from "../index";
import "./Styles/Modal.scss";

const validationSchema = Yup.object({
  username: Yup.string("Enter your username")
  .min(3, "Username must be at least 3 characters!")
  .required("Username is required!")
});

export const EnterChatModal = observer(() => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleEnterChat = async (values) => {
    await enterChat(values.username);
    isEnteredChat() && handleModalClose();
  };
  return (
      <>
        <IconButton onClick={handleModalOpen} size="medium" color="inherit">
          <LoginIcon fontSize="large" />
        </IconButton>
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
        >
          <Box className="modal-main-box">
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                textAlign="center"
                fontWeight="bold"
            >
              ENTER CHAT
            </Typography>
            <Formik
                initialValues={{username: ""}}
                onSubmit={handleEnterChat}
                validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                  <Form className="modal-form">
                    <TextField
                        type="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        required={true}
                        onChange={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        className="modal-input-field"
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                          ),
                        }}
                    />
                    {errors.username && touched.username && (
                        <Typography variant="caption"
                                    className="modal-error-message">
                          {errors.username.toString()}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="outlined"
                        color="success"
                        endIcon={<LoginIcon />}
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="modal-confirm-button"
                    >
                      ENTER
                    </Button>
                  </Form>
              )}
            </Formik>
            <Copyright />
          </Box>
        </Modal>
      </>
  );
});
