import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import eyeopen from "./../../assests/view.png";
import eyeclose from "./../../assests/hide.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isValidField =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.email.trim() !== "";

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearFormData = () => {
    setFormData({ username: "", email: "", password: "" });
  };

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
              marginBottom: "30px",
            }}
          >
            Sign up
          </Typography>

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

          {/* Email */}
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
            <Typography sx={{ width: "25%" }}>E-mail :</Typography>
            <Input
              disableUnderline
              type="email"
              name="email"
              value={formData.email}
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
            >
              Sign up
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
          <Typography sx={{ fontSize: 25, color: "white", textAlign: "center" }}>
            Already have an Account?
            <Typography
              component={Link}
              to="/login"
              sx={{
                display: "block",
                color: "darkblue",
                textDecoration: "none",
                fontSize: 25,
              }}
            >
              Sign in
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;