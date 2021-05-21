import classes from "./Styling/Login.module.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  let history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    //grab the jwt token from localstorage first
    const JSON_JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
    const JWT_TOKEN = JSON.parse(JSON_JWT_TOKEN);
    //now send the email password along with the token, to verify user
    const url = "https://safe-dawn-63028.herokuapp.com/login";

    if (!JWT_TOKEN) {
      alert("Please Signup first!");
      history.replace("/signup");
    }

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (JWT_TOKEN) {
      const reqData = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT_TOKEN.JWT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(url, reqData)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (data.Authenticated) {
              alert("Login Success");
              history.replace("/userDetails");
            } else if (data.name === "TokenExpiredError") {
              alert("Token Expired");
            } else {
              alert("Wrong Credentials");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes.Login}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <h3>Email : </h3>
          <input type="text" name="email" />
        </div>

        <div>
          <h3>Password : </h3>
          <input type="password" name="password" />
        </div>
        <button className={classes.signupBtn}>New User ? SignUp</button>
        <br />
        <input
          type="submit"
          className={classes.loginBtn}
          name="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
