// src/pages/AboutChris.jsx
import React, { useEffect, useState } from "react";
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

import api from "../api"; // Adjust the path if needed

// Row component for collapsible table rows
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
            onClick={() => setOpen(!open)}
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
                  {(row.history ?? []).map((item, index) => (
                    <TableRow key={index}>
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

  // Fetch models from backend API
  const fetchModels = async () => {
    try {
      const response = await api.get("/models");
      // Add sample history to each model (replace or remove as needed)
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

  // Static profile data
  const chrisData = {
    name: "Chris Barker, Age 31",
    title: "Student, Major (undetermined)",
    avatarUrl: "/images/imageChrisWorldCup2025.jpg",
    bio: "Hi! I'm Chris, a Senior; I am not so good at programming and trying to find my niche in the industry. I am a transfer student, got an AA from TCC and went to UWT for a year before coming to PLU.",
    interests: ["Programming", "Sports", "Lake", "Photography", "Dancing"],
  };

  return (
    <Box maxWidth={1000} mx="auto" mt={5} px={2}>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models.map((model) => (
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
