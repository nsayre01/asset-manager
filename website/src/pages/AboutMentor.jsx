import { Container, Typography } from "@mui/material";
import MentorRow from "./components/MentorCards";

export function AboutMentors() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Hello, we are your mentors!
      </Typography>
      <MentorRow />
    </Container>
  );
}
