import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to our team!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a quick demo of routing and Material UI styling in a React +
        TypeScript app.
      </Typography>
    </Container>
  );
}
