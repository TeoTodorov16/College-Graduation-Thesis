import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import packageInfo from "./UTPLogo.jpeg";
import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background: "#000",
      top: 0,
      justifyContent: "space-between",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={45} />
    </Link>
    .<SearchBar />
    <img src={packageInfo} alt="utplogo" height={80} />
  </Stack>
);

export default Navbar;
