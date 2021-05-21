import "./EditModal.module.css";
import classes from "./EditModal.module.css";

export default function EditModal(props) {
  let modal;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      address: formData.get("address"),
    };

    //grab the jwt token from localstorage first
    const JSON_JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
    let JWT_TOKEN = JSON.parse(JSON_JWT_TOKEN);

    const reqData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN.JWT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const url = "https://safe-dawn-63028.herokuapp.com/editUserDetails";

    fetch(url, reqData)
      .then((res) => res.json())
      .then((data) => {
        JWT_TOKEN = data;
        localStorage.setItem(
          "JWT_TOKEN",
          JSON.stringify({ JWT_TOKEN: JWT_TOKEN })
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (props.show) {
    modal = (
      <div className={classes.modalBackDrop}>
        <button className={classes.closeBtn} onClick={props.closeHandler}>
          x
        </button>
        <div className={classes.modal}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={props.userData.username}
            />
            <br />
            <input
              type="text"
              name="email"
              placeholder="Email"
              defaultValue={props.userData.email}
            />
            <br />
            <textarea
              name="address"
              rows="8"
              cols="30"
              placeholder="Address"
              defaultValue={props.userData.address}
            />
            <br />
            <input type="submit" name="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  } else {
    modal = null;
  }

  return <>{modal}</>;
}
