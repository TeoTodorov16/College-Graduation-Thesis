import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Select, MenuItem } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [sortOrder, setSortOrder] = useState("default"); // default, rating-asc, rating-desc
  const [playlist, setPlaylist] = useState(loadFromLocalStorage('playlist') || []);

  useEffect(() => {
    setVideos(null);

    const fetchVideos = async () => {
      // Fetch the initial list of videos
      if(selectedCategory !== "Playlist") {
        const data = await fetchFromAPI(`search?part=snippet&q=${selectedCategory}`);
        const videoIds = data.items.map(item => item.id.videoId).join(',');
  
          // Fetch video details including statistics
          const detailsData = await fetchFromAPI(`videos?part=snippet,statistics&id=${videoIds}`);
          let sortedVideos = detailsData.items;
          if (sortOrder === "rating-asc") {
            sortedVideos = sortedVideos.sort((a, b) => a.statistics.likeCount - b.statistics.likeCount);
          } else if (sortOrder === "rating-desc") {
            sortedVideos = sortedVideos.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount);
          }
  
          // Map sorted video details back to the original data structure
          //const sortedItems = sortedVideos.map(video => data.items.find(item => item.id.videoId === video.id));
  
          setVideos(sortedVideos);
      }
      else{
        const videoIdsString = playlist.join(',');
        const detailsData = await fetchFromAPI(`videos?part=snippet,statistics&id=${videoIdsString}`);
        let sortedVideos = detailsData.items;

        // Sort by rating if needed
        if (sortOrder === "rating-asc") {
          sortedVideos = sortedVideos.sort((a, b) => a.statistics.likeCount - b.statistics.likeCount);
        } else if (sortOrder === "rating-desc") {
          sortedVideos = sortedVideos.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount);
        }
  
        setVideos(sortedVideos);
      }

      
      
    };

    fetchVideos();
  }, [selectedCategory, sortOrder]);

  const addToPlaylist = (video) => {
    if(playlist.includes(video.id)) return;
    const newPlaylist = [...playlist, video.id];
    setPlaylist(newPlaylist);
    saveToLocalStorage('playlist', newPlaylist);
  };

  const removeFromPlaylist = (videoId) => {
    const newPlaylist = playlist.filter(id => id !== videoId);
    setPlaylist(newPlaylist);
    saveToLocalStorage('playlist', newPlaylist);
  };

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
          </Typography>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ color: "white", borderColor: "white" }}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="rating-asc">Sort by Rating Ascending</MenuItem>
            <MenuItem value="rating-desc">Sort by Rating Descending</MenuItem>
          </Select>
        </Stack>

        <Videos videos={videos} sortOrder={sortOrder} addToPlaylist={addToPlaylist} removeFromPlaylist={removeFromPlaylist} playlist={playlist} />
      </Box>
    </Stack>
  );
};

export default Feed;
