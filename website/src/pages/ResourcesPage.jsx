import { Container, Typography } from "@mui/material";

export function ResourcesPage() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Resources
      </Typography>
      <Typography>Resources listed below</Typography>
    </Container>
  );
}
