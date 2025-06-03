import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function SummaryPage() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Project Summary
      </Typography>
      <Typography>
        This project aims to serve as an asset management tool to help I&TS
        workers at PLU locate electronic assets around campus, log changes made
        to them, and view asset history. Our goal is to provide a website with
        the capabilities to explore each building on campus from a floor plan
        view. There users can interact with each room and click to view/edit any
        existing assets inside. Users can also view a history of the room to see
        what has existed in the room before.
      </Typography>
    </Container>
  );
}
