// src/pages/AboutChris.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";

const AboutChris = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [models, setModels] = useState([]); //refer to storing the data being fetched locally

  /**
   * Fetches models(stuff/data) from the backend API and updates state.
   * anything like data i want to pull from the backend fetch anything
   *
   * @async
   * @function fetchModels
   * @returns {Promise<void>}
   */
  const fetchModels = async () => {
    try {
      const response = await api.get("/models"); //this is what is being fetched
      console.log("Fetched models:", response.data);
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };
  // static write here:
  const chrisData = {
    name: "Chris Barker",
    title: "Student, Major (undetermined)",
    avatarUrl: "/images/imageChrisWorldCup2025.jpg",
    bio: "Hi! I'm Chris, a Senior; I am not so good at programming and trying to find my niche in the industry. I am a transfer student, got an AA from TCC and went to UWT for a year before coming to PLU",
    interests: ["Programming", "Sports", "Lake", "Photography", "Dancing"],
  };
  //pulling out data and putting where it typed (makes easier for objects)
  //const {name, title, avatarUrl, bio, interests} = chrisData

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/about-chris")
  //     .then((res) => res.json())
  //     .then((fetchedData) => {
  //       setData(fetchedData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  if (loading) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 8 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" mt={5} px={2} textAlign="center">
      <Typography variant="h3" component="h1" gutterBottom>
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
    </Box>
  );
};

export default AboutChris;
