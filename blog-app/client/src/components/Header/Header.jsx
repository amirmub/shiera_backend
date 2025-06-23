import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../../assets/logo.png"; // Adjust the path as necessary
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 0px  solid",
          padding: "5px 0",
        }}
      >
        <Toolbar>
          <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            <Typography
              variant="h4"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontStyle: "italic",
                // fontFamily: `'Playfair Display', serif`, // Choose a stylish font
                color: "#1565C0",
                letterSpacing: 1.5,
              }}
            >
              Blog
              <Box component="span" sx={{ fontWeight: 300, marginLeft: "4px" , color : "#1565C0"}}>
                App
              </Box>
              <Box
                component="span"
                sx={{ fontWeight: 100, marginLeft: "4px" }}
              ></Box>
            </Typography>
          </Box>

          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  label="Blogs"
                  LinkComponent={Link}
                  to="/blogs"
                  sx={{ color: "#1565C0", fontWeight: "600", fontSize: "13px" }}
                />
                <Tab
                  label="My Blogs"
                  LinkComponent={Link}
                  to="/my-blogs"
                  sx={{ color: "#1565C0", fontWeight: "600", fontSize: "13px" }}
                />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                  sx={{ color: "#1565C0", fontWeight: "600", fontSize: "13px" }}
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "#1565C0", fontWeight : "600" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "#1565C0" , fontWeight: "600"}}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleLogout}
                sx={{ margin: 1, color: "#1565C0", fontWeight: "bold" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
