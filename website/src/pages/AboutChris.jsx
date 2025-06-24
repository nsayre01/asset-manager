// src/pages/AboutChris.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import api from "../api";

// Collapsible Row component
function Row({ row }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <TableRow
        hover
        sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
        onClick={() => navigate(`/models/${row.id}`)}
      >
        <TableCell onClick={(e) => e.stopPropagation()}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.brand}</TableCell>
        <TableCell>{row.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row.history ?? []).map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.note}</TableCell>
                    </TableRow>
                  ))}
                  {(!row.history || row.history.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={2}>No history available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const AboutChris = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [showDog, setShowDog] = useState(false);
  const audioRef = useRef(null); // For background music
  const dogAudioRef = useRef(null); // For dog sound

  // Set background music volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.03;
    }
  }, []);

  // Set dog bark volume
  useEffect(() => {
    if (dogAudioRef.current) {
      dogAudioRef.current.volume = 0.12;
    }
  }, [showDog]);

  // Mute/unmute background music when dog appears/disappears
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = showDog;
    }
  }, [showDog]);

  // Show dog image on the same schedule as before
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const minutes = now.getMinutes();
      if (minutes % 5 === 0) {
        setShowDog(true);
      } else {
        setShowDog(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch models from backend API
  const fetchModels = async () => {
    try {
      const response = await api.get("/models");
      const modelsWithHistory = response.data.map((model) => ({
        ...model,
        history: [
          { date: "2023-01-10", note: "Inventory Checked" },
          { date: "2024-05-22", note: "OS Updated" },
        ],
      }));
      setModels(modelsWithHistory);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Sorting logic
  const sortedModels = useMemo(() => {
    if (!sortConfig.key) return models;
    const sorted = [...models].sort((a, b) => {
      const aVal = (a[sortConfig.key] || "").toLowerCase();
      const bVal = (b[sortConfig.key] || "").toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [models, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Static profile data
  const chrisData = {
    name: "Chris Barker, Age: Negative, Race: Lizard",
    title: "Student, Major (undetermined)",
    avatarUrl: "/images/imageChrisWorldCup2025.jpg",
    bio: "Hi! I'm Chris, a Senior; I have been pursuing coding for along time, in 2008 I couldn't do html, in 2015 I couldn't do css, well its 2025 and I am still trying to find my niche. I attended Tacoma Community College, University of Washington Tacoma, and now Pacific Luthern University. ",
    interests: ["Programming", "Sports", "Fishing", "Photography", "Dancing"],
  };

  return (
    <Box maxWidth={1000} mx="auto" mt={5} px={2} position="relative">
      {/* background audio */}
      <audio
        ref={audioRef}
        src="/audio/xG-newDance.mp3"
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />

      {/* Dog Image Section */}
      {showDog && (
        <Box
          sx={{
            position: "fixed",
            top: 30,
            right: 30,
            zIndex: 2000,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: "20px",
              boxShadow: "0 2px 8px #000",
              fontSize: 18,
              maxWidth: 180,
              textAlign: "center",
            }}
          >
            <ChatBubbleIcon sx={{ mr: 1, fontSize: 28 }} />
            Woof! I'm Chris's dog! Hope you like this space he has neglected me
            for it!!! All the hours of walkies gone. Wooooohhhfff!!
          </Box>
          <img
            src="/images/chrisDog.png"
            alt="Chris's Dog"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "20px",
              boxShadow: "0 0 30px #000",
              animation: "slideInDog 0.7s cubic-bezier(.68, -0.55, .27, 1.55)",
            }}
          />
          <style>
            {`
              @keyframes slideInDog {
                from {
                  transform: translate(100px, 100px);
                  opacity: 0;
                }
                to {
                  transform: translate(0, 0);
                  opacity: 1;
                }
              }
            `}
          </style>
          <audio
            ref={dogAudioRef}
            src="/audio/dog-Snarling.mp3"
            autoPlay
            loop
            controls={false}
            style={{ display: "none" }}
          />
        </Box>
      )}

      {/* Profile Section */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About Chris
      </Typography>
      <Card sx={{ maxWidth: 500, mx: "auto", mt: 3, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            alt={chrisData.name}
            src={chrisData.avatarUrl}
            sx={{ width: 200, height: 200, mx: "auto", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {chrisData.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {chrisData.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {chrisData.bio}
          </Typography>
          {chrisData.interests.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                Interests:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                flexWrap="wrap"
              >
                {chrisData.interests.map((interest, index) => (
                  <Chip key={index} label={interest} variant="outlined" />
                ))}
              </Stack>
            </>
          )}
        </CardContent>
      </Card>

      {/* Collapsible Table Section */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Device Models
        </Typography>
        {loading ? (
          <Typography>Loading model data...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible model table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    Name{" "}
                    {sortConfig.key === "name"
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("brand")}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    Brand{" "}
                    {sortConfig.key === "brand"
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("type")}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    Type{" "}
                    {sortConfig.key === "type"
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedModels.map((model) => (
                  <Row key={model.id} row={model} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AboutChris;
