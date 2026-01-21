import { Grid, Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Nvabar/Navbar";
import axios from "axios";

const DashboardForm = () => {
  const navigate = useNavigate();
  const [usercount, setUserCount] = useState(null);

  /* 🔐 TOKEN VERIFICATION */
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await axios.get(
          "http://localhost:3001/api/v1/user/tokenverify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    verifyToken();
  }, [navigate]);

  /* 👥 USER COUNT FETCH */
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/user/usercount"
        );
        setUserCount(response.data.usercount);
      } catch (error) {
        console.log("User count fetch error", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
          p: 3,
          mt: "64px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography color="text.secondary">Total Users</Typography>
              <Typography variant="h5" fontWeight="bold">
                {usercount === null ? "Loading..." : usercount}
              </Typography>
            </Paper>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography color="text.secondary">Active Sessions</Typography>
              <Typography variant="h5" fontWeight="bold">342</Typography>
            </Paper>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography color="text.secondary">Revenue</Typography>
              <Typography variant="h5" fontWeight="bold">$8,540</Typography>
            </Paper>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography color="text.secondary">New Orders</Typography>
              <Typography variant="h5" fontWeight="bold">56</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardForm;
