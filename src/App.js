import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import PrivateRoute from "./componentRoutes/PrivateRoutes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import RaiseFund from "./pages/RaiseFund";
import DetailDonations from "./pages/DetailDonations";
import FormFund from "./pages/FormFund";
import FormUpdate from "./pages/FormUpdate";
import ViewFund from "./pages/ViewFund";
import ChatClient from "./pages/ChatClient";
import ChatAdmin from "./pages/ChatAdmin";

import { API, setAuthToken } from "./config/api"

function App() {
    const his = useHistory();
    console.log(his)

    // Init user context here ...
    const [state, dispatch] = useContext(UserContext)
    console.log(state)

    // Redirect Auth here ...
    // useEffect(() => {
    //     if (state.isLogin === false) {
    //         // history.push("/")
    //         <Link to="/" />
    //     } else {
    //         if (state.user.status === "admin") {
    //             // history.push("/raisefund")
    //             <Link to="/raisefund" />
    //         } else if (state.user.status === "user") {
    //             // history.push('/')
    //             <Link to="/" />
    //         }
    //     }
    // }, [state, history])

    useEffect(() => {
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
    
        // Redirect Auth
        if (state.isLogin === false) {
            <Link to="/" />
        } else {
          if (state.user.status === "admin") {
            <Link to="/raisefund" />
          } else if (state.user.status === "user") {
            // history.push("/");
          }
        }
      }, [state, his]);


    // Create function for check user token
    const checkUser = async () => {
        try {
            const response = await API.get('/check-auth')

            // console.log(response.data)

            if (response.status === 404) {
                return dispatch({
                    type: "AUTH_ERROR"
                })
            }

            let payload = response.data.data.user
            payload.token = localStorage.token

            dispatch({
                type: "USER_SUCCESS",
                payload
            })

        } catch (error) {
            console.log(error);
        }
    }

    // Call function check user with useEffect didMoun
    useEffect(() => {
        checkUser()
    }, []);

  return (
    <Router>
      <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/user" component={User} />
            <Route exact path="/raisefund" component={RaiseFund} />
            <PrivateRoute exact path="/detaildonations/:id" component={DetailDonations} />
            <PrivateRoute exact path="/formfund" component={FormFund} />
            <PrivateRoute exact path="/formfund/:id" component={FormFund} />
            <PrivateRoute exact path="/formupdate/:id" component={FormUpdate} />
            <PrivateRoute exact path="/viewfund/:id" component={ViewFund} />
            <Route exact path="/chatadmin" component={ChatAdmin} />
            <Route exact path="/chatclient" component={ChatClient} />

        </Switch>
    </Router>

  )
}

export default App;