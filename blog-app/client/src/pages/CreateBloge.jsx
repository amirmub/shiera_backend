import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          // border={1}
          borderRadius={5}
          px={4}
          margin="auto"
          boxShadow={"1px 1px 2px #ccc"}
          backgroundColor="#fff"
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            pt={3}
            color="gray"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ fontSize: "20px", fontWeight: "bold" , margin: "20px 0 6px 0" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
          <InputLabel
            sx={{ fontSize: "20px", fontWeight: "bold", margin: "30px 0 6px 0" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            
            variant="outlined"
            required
            sx={{
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
          <InputLabel
            sx={{  fontSize: "20px", fontWeight: "bold", margin: "30px 0 6px 0" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            variant="outlined"
            required
            sx={{
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
          <Button type="submit" color="primary" variant="contained" style={{ margin: "20px 0" ,borderRadius: "10px"}}>
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
