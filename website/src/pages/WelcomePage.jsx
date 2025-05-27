import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to our team!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a quick demo of routing and Material UI styling in a React +
        TypeScript app.
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center" mt={4}>
        <Button variant="contained" onClick={() => navigate("/summary")}>
          Go to Summary Page
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/about-mentors")}
        >
          Go to About Page
        </Button>
      </Stack>
    </Container>
  );
}
