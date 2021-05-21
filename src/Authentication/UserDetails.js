import { useEffect, useState } from "react";
import EditModal from "./Modals/EditModal";
import classes from "./Styling/UserDetails.module.css";
import { useHistory } from "react-router-dom";

export default function UserDetails() {
  const [userData, setUserData] = useState();
  const [showModal, setShowModal] = useState(false);

  let history = useHistory();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    alert("User Logged Out");
    history.replace("/login");
  };

  useEffect(() => {
    //grab token and send a get req along with the token to veify the user first, then show ONLY user's details in table,
    //*ONLY showing user details is done in backend*
    const JSON_JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
    if (!JSON_JWT_TOKEN) {
      alert("No Users Found, Please Signup again");
    }
    const JWT_TOKEN = JSON.parse(JSON_JWT_TOKEN);
    const url = "https://safe-dawn-63028.herokuapp.com/userDetails";

    //send a get request along with the token
    if (JWT_TOKEN) {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JWT_TOKEN.JWT_TOKEN}`,
        },
      })
        .then((JSONres) => {
          if (JSONres.status === 401) {
            alert("TOKEN EXPIRED, Please sign up again");
          }
          return JSONres.json();
        })
        .then((res) => {
          if (res) {
            console.log(res);
            let data = {
              username: res.username,
              email: res.email,
              address: res.address,
            };
            setUserData(data);
          }
        })
        .catch((err) => {
          console.log("reached");
        });
    }
  }, []);

  return (
    <div className={classes.UserDetails}>
      <EditModal
        show={showModal}
        closeHandler={closeModal}
        userData={userData}
      />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData && userData.username}</td>
            <td>{userData && userData.email}</td>
            <td>{userData && userData.address}</td>
            <td>
              <button onClick={() => setShowModal(true)}>Edit</button>
            </td>
            <td>
              <button
                onClick={() => {
                  localStorage.clear();
                  alert("User Deleted, Please Sign Up Again");
                  history.replace("/signup");
                }}
              >
                Delete
              </button>
            </td>
            <td>
              <button className={classes.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
