import classes from "./Styling/SignUp.module.css";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  let history = useHistory();

  const handleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      address: formData.get("address"),
    };

    const reqData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const url = "http://localhost:3001/signup";
    let JWT_TOKEN;

    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("Passwords Do Not Match");
    } else {
      fetch(url, reqData)
        .then((res) => res.json())
        .then((data) => {
          JWT_TOKEN = data;
          localStorage.setItem(
            "JWT_TOKEN",
            JSON.stringify({ JWT_TOKEN: JWT_TOKEN })
          );
          alert("SUCCESS");
          history.replace("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={classes.SignUp}>
      <h1>Sign Up</h1>
      <button
        className={classes.loginBtn}
        onClick={() => {
          history.replace("/login");
        }}
      >
        Already Registered? Login
      </button>

      <form onSubmit={handleSignUp}>
        <div>
          <h3>Username : </h3>
          <input type="text" name="username" />
        </div>

        <div>
          <h3>Email : </h3>
          <input type="email" name="email" />
        </div>

        <div>
          <h3>Password : </h3>
          <input type="password" name="password" />
        </div>

        <div>
          <h3>Confirm Password : </h3>
          <input type="text" name="confirmPassword" />
        </div>

        <div>
          <h3>Address : </h3>
          <textarea name="address" rows="8" cols="30" />
        </div>

        <input type="submit" name="submit" value="Sign Up" />
      </form>
    </div>
  );
}
