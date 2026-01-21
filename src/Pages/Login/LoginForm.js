import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import eyeopen from "./../../assests/view.png";
import eyeclose from "./../../assests/hide.png";
import axios from "axios";

const LoginForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [succMessage, setSuccMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState(false);
  const [submited, setSubmit] = useState(true);
  const [messageBox, setMessageBox] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9@]).{8,16}$/;

    // password validation message
  const passwordError =
    formData.password && !passwordRegex.test(formData.password)
      ? "Password must be 8–16 chars, include upper, lower, number, symbol, and no @"
      : "";

  const isValidField =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    passwordRegex.test(formData.password);

  useEffect(() => {
    if (submited) {
      setFormData({
        username: "",
        password: ""
      });
    }
  }, [submited]);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearFormData = () => {
    setFormData({ username: "", password: "" });
  };

  const LoginUser = async(data) => {

    try {
      
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/login',
        data
      )

      setSuccMessage(response?.data?.message);
      setSubmit(true);
      setMessageType(true);
      setMessageBox(true);

      localStorage.setItem("token", response.data.token);

      setTimeout(() => setMessageBox(false), 3000);

      navigate('/dashboard');

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message || "User Login failed"
      );
      setMessageType(false);
      setMessageBox(true);
      setTimeout(() => setMessageBox(false), 3000);

    }
  }


  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#cecece" }}
    >
      {/* Main Card */}
      <Grid
        sx={{
          width: "60%",
          minHeight: "70vh",
          borderRadius: "20px",
          background: "linear-gradient(to bottom, #061b28 0%, #0c376c 100%)",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.8)",
          display: "flex",
        }}
      >
        {/* LEFT */}
        <Grid
          sx={{
            width: "60%",
            borderRadius: "20px 50px 0 20px",
            background:
              "linear-gradient(to bottom, #4da3ff 0%, #0a2f5f 100%)",
            paddingTop: "5%",
          }}
        >
          <Typography
            sx={{
              fontSize: 35,
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Sign in
          </Typography>

          {/* Message box */}
          {
            messageBox &&
              <Box 
                sx={{ 
                  width: "65%", 
                  margin: "auto", 
                  textAlign: "center", 
                  borderRadius: '10px',
                  padding: '5px',
                  backgroundColor: messageType ? 'blue' : 'red',
                  marginBottom: '20px',
                }}
              >
                <Typography
                  component={'label'}
                  sx={{ color: "darkblue", textDecoration: "none", }}
                >
                  { messageType ? succMessage : errorMessage }
                </Typography>
              </Box>
          }

          {/* Username */}
          <Box
            sx={{
              width: "65%",
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginBottom: "20px",
              border: "1px solid black",
              borderRadius: "25px",
              padding: "10px 20px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <Typography sx={{ width: "25%" }}>Username :</Typography>
            <Input
              disableUnderline
              name="username"
              value={formData.username}
              onChange={handleFormData}
              sx={{ width: "75%" }}
            />
          </Box>

          {/* Password */}
          <Box
            sx={{
              width: "65%",
              display: "flex",
              alignItems: "center",
              margin: "auto",
              marginBottom: "10px",
              border: "1px solid black",
              borderRadius: "25px",
              padding: "10px 20px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            }}
          >
            <Typography sx={{ width: "25%" }}>Password :</Typography>

            <Box
              sx={{
                width: "75%",
                display: "flex",
                alignItems: "center",
                
              }}
            >
              <Input
                disableUnderline
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleFormData}
                sx={{ width: "90%" }}
              />

              <Box
                component="img"
                src={showPassword ? eyeopen : eyeclose}
                alt="toggle"
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>

          {/* PASSWORD ERROR */}
          {passwordError && (
            <Box sx={{ width: "65%", margin: "auto", textAlign: "left", marginBottom: "10px" }}>
              <Typography sx={{ color: 'darkred', fontSize: 12 }}>{passwordError}</Typography>
            </Box>
          )}

          {/* Forgot Password */}
          <Box sx={{ width: "65%", margin: "auto", textAlign: "right" }}>
            <Typography
              component={Link}
              to="/forgetpassword"
              sx={{ color: "darkblue", textDecoration: "none", }}
            >
              Forget Password
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              width: "65%",
              display: "flex",
              justifyContent: "space-between",
              margin: "30px auto",
            }}
          >
            <Button
              disabled={!isValidField}
              sx={{
                width: "40%",
                border: "2px solid black",
                borderRadius: "10px",
                backgroundColor: isValidField ? "red" : "#aaa",
                color: "black",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
              }}
              onClick={() => LoginUser({
                username: formData.username, 
                password: formData.password
              })}
            >
              Sign in
            </Button>

            <Button
              onClick={clearFormData}
              sx={{
                width: "40%",
                border: "2px solid black",
                borderRadius: "10px",
                backgroundColor: "gray",
                color: "black",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
              }}
            >
              Clear
            </Button>
          </Box>
        </Grid>

        {/* RIGHT */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "40%",
            borderRadius: "0 20px 20px 50px",
            background:
              "linear-gradient(to bottom, #061b28 0%, #2f6f96 100%)",
          }}
        >
          <Typography sx={{ fontSize: 25, color: "white" }}>
            If you haven't an Account?
            <Typography
              component={Link}
              to="/register"
              sx={{
                display: "block",
                color: "darkblue",
                textAlign: "center",
                textDecoration: "none",
                fontSize: 25,
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
