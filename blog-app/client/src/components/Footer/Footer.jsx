import { Box, Typography, Link } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Google,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ marginTop : "20px", bgcolor: "#1565C0", color: "white", pt: 4, pb: 2 }}>
      {/* Social Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={iconStyle}><Facebook /></Box>
        <Box sx={iconStyle}><Instagram /></Box>
        <Box sx={iconStyle}><Twitter /></Box>
        <Box sx={iconStyle}><Google /></Box>
        <Box sx={iconStyle}><YouTube /></Box>
      </Box>

      {/* Navigation Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mb: 3,
          typography: "subtitle1",
          color: "#ccc",
          "& a": {
            textDecoration: "none",
            color: "#ccc",
            "&:hover": { color: "#fff" },
          },
        }}
      >
        <Link href="#">Home</Link>
        <Link href="#">News</Link>
        <Link href="#">About</Link>
        <Link href="#">Contact Us</Link>
        <Link href="#">Our Team</Link>
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          bgcolor: "#1565C0",
          textAlign: "center",
          py: 1,
          fontSize: "14px",
          color: "#ccc",
        }}
      >
        <Typography variant="body2" >
          <span style={{fontWeight : "700",color : "#ccc"}}>Copyright ©2025; {" "}</span>
          <Typography component="span" sx={{ fontWeight: "bold", color: "#fff" }}>
            Sheira_Developers
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

// Circle icon style
const iconStyle = {
  bgcolor: "white",
  color: "#111",
  borderRadius: "50%",
  padding: "8px",
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    bgcolor: "#ccc",
    cursor: "pointer",
  },
};

export default Footer;
