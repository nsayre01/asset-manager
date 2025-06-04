import { Container, Typography } from "@mui/material";

export function WelcomePage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to our team!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a quick demo of routing and Material UI styling in a React +
        JavaScript/TypeScript app.
      </Typography>
    </Container>
  );
}
