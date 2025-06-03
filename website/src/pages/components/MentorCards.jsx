import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const mentors = [
  {
    id: 1,
    name: "Natalie",
    title: "Software Engineer",
    img: "/images/remy.jpg",
    age: 23,
    interests: ["Video games", "Baseball", "Reading", "My dog Remy"],
    intro:
      "Heyy everyone! My name is Natalie, and I am currently a software engineer at Infoblox, a cybersecurity company. I am on the threat intelligence team, and I help build a lot of internal tools our researchers use to hunt for threats. I am excited to get to know everyone and build something fun together :)",
  },
  {
    id: 2,
    name: "Kioni",
    title: "Software Engineer",
    img: "/images/kioni.jpg",
    age: 23,
    interests: [
      "Kendrick",
      "light novels/reading",
      "Workaholism",
      "YouTube essays",
    ],
    intro:
      "Hi!! I'm Kioni, I'm gonna be late but if you need any help reach out anytime and I will try my best. I specialize in backend for saas",
  },
  {
    id: 3,
    name: "Ehukai",
    title: "Software Developer",
    img: "/images/kai.jpg",
    age: 22,
    interests: ["Video Games", "TV Shows", "Anime/Manga", "Birding"],
    intro:
      "Aloha, 'Track yo tech' team! I'm Ehukai, a Junior Software Developer working at Codepoint Technologies. I work almost entirely front-end, building web/mobile applications that interface with Codepoint IoT devices. Don't worry I will be there to help with those pesky web dev bugs!",
  },
];

const MentorCard = ({ mentor }) => (
  <Card sx={{ width: 300, minWidth: 300, mr: 3, flexShrink: 0 }}>
    <CardMedia
      component="img"
      sx={{
        width: "100%", // ensures it fills the card width
        height: 350, // fixed height for consistency
        objectFit: "cover", // or 'contain' or 'fill' depending on desired behavior
      }}
      image={mentor.img}
      alt={mentor.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h6">
        {mentor.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {mentor.title}, Age {mentor.age}
      </Typography>
      <Box sx={{ mt: 1, mb: 1 }}>
        {mentor.interests.map((interest, index) => (
          <Chip
            key={index}
            label={interest}
            size="small"
            color="primary"
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ))}
      </Box>
      <Typography variant="body2">{mentor.intro}</Typography>
    </CardContent>
  </Card>
);

const MentorRow = () => (
  <Box
    sx={{
      display: "flex",
      overflowX: "auto",
      pb: 2,
    }}
  >
    {mentors.map((mentor) => (
      <MentorCard key={mentor.id} mentor={mentor} />
    ))}
  </Box>
);

export default MentorRow;
