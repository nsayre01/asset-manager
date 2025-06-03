import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ResourcesPage() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Resources
      </Typography>
      <Typography>Resources listed below</Typography>
    </Container>
  );
}
