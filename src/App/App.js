import {Container}                              from "@mui/material";
import {observer}                               from "mobx-react-lite";
import {Route, Routes}                          from "react-router-dom";
import {ToastContainer}                         from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-chat-elements/dist/main.css"
import {ROUTE_URL}                              from "../Constants";
import {Chat, Footer, Header, Home, Whoops404,} from "../Modules";
import {isEnteredChat}                          from "../Services";

const App = observer(() => {
  const isCurrentUserEnteredChat = isEnteredChat();
  return (
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route exact path={ROUTE_URL.HOME} element={<Home />} />
          {isCurrentUserEnteredChat && (
              <>
                <Route
                    exact
                    path={ROUTE_URL.CHAT}
                    element={<Chat />}
                />
              </>
          )}
          <Route exact path="*" element={<Whoops404 />} />
        </Routes>
        <Footer />
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      </Container>
  );
});

export default App;
