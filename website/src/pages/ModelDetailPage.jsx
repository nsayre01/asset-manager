import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const ModelDetailPage = () => {
  const { id } = useParams();

  return (
    <Box maxWidth={600} mx="auto" mt={5} px={2} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Model Details
      </Typography>
      <Typography variant="h6">ID: {id}</Typography>

      <Button component={Link} to="/about-chris" variant="outlined" sx={{ mt: 3 }}>
        Back to About Chris
      </Button>
    </Box>
  );
};

export default ModelDetailPage;
