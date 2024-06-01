import React from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction, addToPlaylist, removeFromPlaylist, playlist }) => {
  if (!videos?.length) return <Loader />;
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
          {item.statistics && (
            <>
              {item.statistics.likeCount && (
                <Typography variant="span" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                  Likes: <span style={{ color: "#FC1503" }}>{item.statistics.likeCount}</span>
                </Typography>
              )}
              {item.statistics.commentCount && (
                <Typography variant="span" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                  <br />
                  Comments: <span style={{ color: "#FC1503" }}>{item.statistics.commentCount}</span> <br />
                </Typography>
              )}
            </>
          )}
          {playlist.includes(item.id.videoId ?? item.id) ? (
            <Button variant="contained" color="secondary" onClick={() => removeFromPlaylist(item.id.videoId ?? item.id)}>
              Remove from Playlist
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => addToPlaylist(item)}>
              Add to Playlist
            </Button>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
