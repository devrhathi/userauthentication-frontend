import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import UserDetails from "./Authentication/UserDetails";
import classes from "./Authentication/Styling/App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <Router>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/userDetails">
          <UserDetails />
        </Route>
        <Route exact path="/">
          <div className="App">
            <h1 style={{ textAlign: "center" }}>
              User Authentication Using JWT, By Dev Hathi
            </h1>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>

            <li>
              <Link to="/userDetails">User Details</Link>
            </li>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default App;
