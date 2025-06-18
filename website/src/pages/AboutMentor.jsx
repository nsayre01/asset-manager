import { Box, Typography } from "@mui/material";
import MentorRow from "./components/MentorCards";

export function AboutMentors() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hello, we are your mentors!
      </Typography>
      <MentorRow />
    </Box>
  );
}
