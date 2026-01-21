import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import eyeopen from "./../../assests/view.png";
import eyeclose from "./../../assests/hide.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [succMessage, setSuccMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [submited, setSubmit] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  const [checkUsername, setCheckUsername] = useState(null);

  // regex for password & email
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9@]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // handle input change
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // clear all fields
  const clearFormData = () => {
    setFormData({ username: "", email: "", password: "" });
    setCheckUsername(null);
  };

  // reset form after submit
  useEffect(() => {
    if (submited) {
      clearFormData();
      setSubmit(false);
    }
  }, [submited]);

  // live username check with debounce
  useEffect(() => {
    if (!formData.username || formData.username.length < 3) {
      setCheckUsername(null);
      return;
    }

    const timer = setTimeout(() => {
      checkUname(formData.username);
    }, 500); // wait 500ms after typing

    return () => clearTimeout(timer);
  }, [formData.username]);

  // password validation message
  const passwordError =
    formData.password && !passwordRegex.test(formData.password)
      ? "Password must be 8–16 chars, include upper, lower, number, symbol, and no @"
      : "";

  // email validation message
  const emailError =
    formData.email && !emailRegex.test(formData.email)
      ? "Invalid email format"
      : "";

  // username availability message (checkUsername is set by API)
  const usernameError =
    checkUsername && checkUsername !== "Username is available"
      ? checkUsername
      : "";

  // check if all fields are valid for enabling submit
  const isValidField =
    formData.username.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    passwordRegex.test(formData.password) &&
    emailRegex.test(formData.email) &&
    checkUsername === "Username is available";


  /* { Register User } */
  const registerUser = async (data) => {
    // frontend double-check
    if (!isValidField) {
      setErrorMessage("Please fix all errors before submitting");
      setMessageType(false);
      setMessageBox(true);
      setTimeout(() => setMessageBox(false), 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        data
      );

      setSuccMessage(response.data.message || "User created successfully");
      setMessageType(true);
      setMessageBox(true);
      setSubmit(true);

      setTimeout(() => setMessageBox(false), 3000);

    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "User creation failed"
      );
      setMessageType(false);
      setMessageBox(true);
      setTimeout(() => setMessageBox(false), 3000);
    }
  };

  /* { Check Username Availability } */
  const checkUname = async (username) => {
    if (username.trim().length < 8) {
      setCheckUsername("");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/auth/existuser",
        { params: { username } }
      );

      setCheckUsername(response.data.message || "Username is available");
    } catch (error) {
      if (error.response?.status === 409) {
        setCheckUsername(error.response.data.message);
      } else {
        setCheckUsername("");
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: "#cecece" }}>
      <Grid sx={{ width: "60%", minHeight: "70vh", borderRadius: "20px", background: "linear-gradient(to bottom, #061b28 0%, #0c376c 100%)", boxShadow: "0px 10px 40px rgba(0,0,0,0.8)", display: "flex" }}>

        {/* LEFT SIDE */}
        <Grid sx={{ width: "60%", borderRadius: "20px 50px 0 20px", background: "linear-gradient(to bottom, #4da3ff 0%, #0a2f5f 100%)", paddingTop: "5%" }}>
          <Typography sx={{ fontSize: 35, textAlign: "center", marginBottom: "20px" }}>Sign up</Typography>

          {/* Global Message Box */}
          {messageBox && (
            <Box sx={{ width: "65%", margin: "auto", textAlign: "center", borderRadius: '10px', padding: '10px', marginBottom: '10px', backgroundColor: messageType ? 'blue' : 'red' }}>
              <Typography component={'label'} sx={{ color: "darkblue", textDecoration: "none" }}>
                {messageType ? succMessage : errorMessage}
              </Typography>
            </Box>
          )}

          {/* USERNAME */}
          <Box sx={{ width: "65%", display: "flex", alignItems: "center", margin: "auto", marginBottom: checkUsername === null ? '20px' : '10px', border: "1px solid black", borderRadius: "25px", padding: "10px 20px", boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }}>
            <Typography sx={{ width: "25%" }}>Username :</Typography>
            <Input disableUnderline name="username" value={formData.username} onChange={handleFormData} sx={{ width: "75%" }} />
          </Box>

          {/* USERNAME ERROR */}
          {checkUsername && (
            <Box sx={{ width: "65%", margin: "auto", textAlign: "left", marginBottom: "10px" }}>
              <Typography sx={{ color: usernameError ? 'darkred' : 'darkgreen', fontSize: 12 }}>{checkUsername}</Typography>
            </Box>
          )}

          {/* EMAIL */}
          <Box sx={{ width: "65%", display: "flex", alignItems: "center", margin: "auto", marginBottom: checkUsername === null ? '20px' : '10px', border: "1px solid black", borderRadius: "25px", padding: "10px 20px", boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }}>
            <Typography sx={{ width: "25%" }}>E-mail :</Typography>
            <Input disableUnderline type="email" name="email" value={formData.email} onChange={handleFormData} sx={{ width: "75%" }} />
          </Box>

          {/* EMAIL ERROR */}
          {emailError && (
            <Box sx={{ width: "65%", margin: "auto", textAlign: "left", marginBottom: "10px" }}>
              <Typography sx={{ color: 'darkred', fontSize: 12 }}>{emailError}</Typography>
            </Box>
          )}

          {/* PASSWORD */}
          <Box sx={{ width: "65%", display: "flex", alignItems: "center", margin: "auto", marginBottom: "5px", border: "1px solid black", borderRadius: "25px", padding: "10px 20px", boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }}>
            <Typography sx={{ width: "25%" }}>Password :</Typography>
            <Box sx={{ width: "75%", display: "flex", alignItems: "center" }}>
              <Input disableUnderline type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleFormData} sx={{ width: "90%" }} />
              <Box component="img" src={showPassword ? eyeopen : eyeclose} alt="toggle" onClick={() => setShowPassword(!showPassword)} sx={{ width: 22, height: 22, cursor: "pointer" }} />
            </Box>
          </Box>

          {/* PASSWORD ERROR */}
          {passwordError && (
            <Box sx={{ width: "65%", margin: "auto", textAlign: "left", marginBottom: "10px" }}>
              <Typography sx={{ color: 'darkred', fontSize: 12 }}>{passwordError}</Typography>
            </Box>
          )}

          {/* BUTTONS */}
          <Box sx={{ width: "65%", display: "flex", justifyContent: "space-between", margin: "30px auto" }}>
            <Button disabled={!isValidField} sx={{ width: "40%", border: "2px solid black", borderRadius: "10px", backgroundColor: isValidField ? "red" : "#aaa", color: "black", boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }} onClick={() => registerUser(formData)}>Sign up</Button>
            <Button onClick={clearFormData} sx={{ width: "40%", border: "2px solid black", borderRadius: "10px", backgroundColor: "gray", color: "black", boxShadow: "0px 8px 20px rgba(0,0,0,0.25)" }}>Clear</Button>
          </Box>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid container justifyContent="center" alignItems="center" sx={{ width: "40%", borderRadius: "0 20px 20px 50px", background: "linear-gradient(to bottom, #061b28 0%, #2f6f96 100%)" }}>
          <Typography sx={{ fontSize: 25, color: "white", textAlign: "center" }}>
            Already have an Account?
            <Typography component={Link} to="/login" sx={{ display: "block", color: "darkblue", textDecoration: "none", fontSize: 25 }}>Sign in</Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
