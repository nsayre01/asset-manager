import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AboutMentors() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Hello we are mentors!
      </Typography>
      <Button sx={{ mt: 4 }} variant="outlined" onClick={() => navigate("/")}>
        Back to Welcome
      </Button>
    </Container>
  );
}
