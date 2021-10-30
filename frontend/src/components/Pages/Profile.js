import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import { ChromePicker } from "react-color";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { UserContext } from "../../App";

function Profile() {
  // owndetail
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const [updatemode, setUpdatemode] = useState(false);

  const [name, setName] = useState(state?.name);
  const [email, setEmail] = useState(state?.email);
  const updateDetails = () => {
    fetch(`/api/auth/updatedetails/${state._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("localstorage update aba");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, name: data.name, email: data.email })
        );
        dispatch({
          type: "UPDATEDETAILS",
          payload: { name: data.name, email: data.email },
        });
        setUpdatemode(false);
      })
      .catch((err) => console.log(err));
  };

  const [color, setColor] = useState("#fff");
  const colorCopy = (e) => {
    let clickedColor = e.target.innerText;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(clickedColor);
      // navigator.clipboard.readText()
      toast.success(`${clickedColor} Copied to Clipboard`, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  // upload your fav. color
  const [color_name, setColorName] = useState(null);

  const UploadColor = (e) => {
    setColorName("");
    fetch("/api/colors/addcolor", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        color_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // get all the uploaded color
  const [Colordata, setCData] = useState([]);
  useEffect(() => {
    fetch("/api/colors/my", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setCData(result.mycolors);
      });
  }, [color_name]);

  // delete added colour
  const deleteAColor = (colorId) => {
    // console.log("delete garne ho yo post")

    fetch(`/api/colors/delete/${colorId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newcData = Colordata.filter((each) => {
          return each._id != result._id;
        });
        setCData(newcData);
      });
  };

  return (
    <div className="profilecontainer">
      <div>
        <div className="innerup">
          <div className="profileru">
            <img
              src={
                "https://icons.iconarchive.com/icons/icons8/ios7/256/Users-User-Male-2-icon.png"
              }
              style={{ borderRadius: "50%", height: 200, width: 200 }}
            />
            {updatemode ? (
              <TextField
                style={{ margin: " 30px 0px" }}
                id="standard-basic"
                name="name"
                label="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            ) : (
              <Typography
                style={{
                  fontSize: 20,
                  borderBottom: "2px solid black",
                  margin: " 30px 0px",
                  fontWeight: "bold",
                }}
              >
                {state ? state.name : "loading"}
              </Typography>
            )}
            {updatemode ? (
              <>
                <TextField
                  style={{ marginBottom: 30 }}
                  id="standard-basic"
                  name="email"
                  value={email}
                  label="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <Button
                  onClick={updateDetails}
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: 30 }}
                >
                  Update Profile
                </Button>
              </>
            ) : (
              <Typography
                style={{
                  fontSize: 20,
                  borderBottom: "2px solid black",
                  fontWeight: "bold",
                  marginBottom: 30,
                }}
              >
                {state ? state.email : "loading"}
              </Typography>
            )}
          </div>

          <EditIcon
            className="editformobile"
            style={{color:"black"}}
            onClick={() => setUpdatemode(true)}
          />

          <div className="upperpartside">
            {/* upper part */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="flexpart">
                <div>
                  <ChromePicker
                    color={color}
                    onChange={(newColor) => setColor(newColor.hex)}
                  />
                </div>
                <h2>
                  <ArrowForwardIcon style={{ fontSize: 100, color: "black" }} />
                </h2>
                <div
                  className="downsingle"
                  onClick={colorCopy}
                  style={{
                    height: 150,
                    width: 280,
                    alignItems: "center",
                    boxShadow: "5px 0px 5px #000",
                    borderRadius: "20px",
                    background: color,
                  }}
                >
                  <h2
                    style={{
                      paddingTop: 60,
                      textAlign: "center",
                      filter: "invert(100%)",
                    }}
                  >
                    {color}
                  </h2>
                </div>
              </div>
            </div>

            {/* lower part */}
            <div className="lowerpartps">
              <div className="uploadbox">
                <h2
                  style={{
                    fontSize: 25,
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  Post your favourite color
                </h2>
                <div className="uploadinputsign">
                  <TextField
                    //   className={classes.txtfld}
                    style={{ margin: 30, width: "80%" }}
                    id="standard-basic"
                    variant="outlined"
                    name="color"
                    value={color_name}
                    label="Put color "
                    onChange={(e) => setColorName(e.target.value)}
                    autoFocus
                    fullWidth
                  />
                  <Button variant="contained" onClick={() => UploadColor()}>
                    <PublishIcon style={{ fontSize: 30 }} />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <h1 style={{ textTransform: "uppercase", textAlign: "center" }}>
          Your color Palette
        </h1>
        <div className="row">
          {Colordata.map((color) => {
            return (
              <>
                <div className="each">
                  <div
                    className="innereach"
                    key={color.color_name}
                    style={{ background: color.color_name }}
                    onClick={colorCopy}
                  >
                    <div>{color.color_name}</div>
                  </div>
                </div>
                <DeleteForeverIcon
                  onClick={() => deleteAColor(color._id)}
                  style={{
                    position: "relative",
                    marginLeft: -10,
                    cursor: "pointer",
                    color: "black",
                  }}
                  className="deleteicon"
                />
                <Button
                className="mobileshow"
                  variant="contained"
                  onClick={() => deleteAColor(color._id)}
                >REMOVE</Button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
