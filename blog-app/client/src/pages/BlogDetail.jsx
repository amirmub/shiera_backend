import React, { useState, useEffect } from "react";
import axios from "../utils/axios"; // Adjust the import path as necessary
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

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
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <v>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          // border={1}
          borderRadius={5}
          px={3}
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
            padding={3}
            color="gray"
          >
            Update A Post
          </Typography>
          <InputLabel
            sx={{ fontSize: "20px", fontWeight: "bold", margin: "10px 0 6px 0"  }}
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
            sx={{ fontSize: "20x", fontWeight: "bold", margin: "30px 0 6px 0"  }}
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
            sx={{ fontSize: "20px", fontWeight: "bold", margin: "30px 0 6px 0"  }}
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
          <Button type="submit" color="warning" variant="contained" style={{ margin: "20px 0" ,borderRadius: "10px"}}>
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;
