import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const [playlist, setPlaylist] = useState(loadFromLocalStorage('playlist') || []);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    
    );
  }, [searchTerm]);

  const addToPlaylist = (video) => {
    if(playlist.includes(video.id.videoId)) return;
    const newPlaylist = [...playlist, video.id.videoId];
    setPlaylist(newPlaylist);
    saveToLocalStorage('playlist', newPlaylist);
  };

  const removeFromPlaylist = (videoId) => {
    const newPlaylist = playlist.filter(id => id !== videoId);
    setPlaylist(newPlaylist);
    saveToLocalStorage('playlist', newPlaylist);
  };

  return (
    <Box p={2} minHeight="95vh">
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
      >
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos
          videos={videos}
          addToPlaylist={addToPlaylist}
          removeFromPlaylist={removeFromPlaylist}
          playlist={playlist}
        />
      </Box>
    </Box>
  );
};

export default SearchFeed;
