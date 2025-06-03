import React from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  CardMedia,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MentorRow from "./components/MentorCards";

const mentors = [
  {
    id: 1,
    name: "Natalie",
    title: "Software Engineer",
    img: "",
    age: 23,
    interests: ["Video games", "Baseball", "Reading", "My dog Remy"],
    intro:
      "Heyy everyone! My name is Natalie, and I am currently a software engineer at Infoblox, a cybersecurity company. I am on the threat intelligence team, and I help build a lot of internal tools our researchers use to hunt for threats. I am excited to get to know everyone and build something fun together :)",
  },
  {
    id: 3,
    name: "Kioni",
    title: "Software Engineer",
    img: "../public/images/kai-pic.jpg",
    age: 23,
    interests: [
      "Kendrick",
      "light novels/reading",
      "Workaholism",
      "YouTube essays",
    ],
    intro:
      "Hi!! I'm kioni, I'm gonna be late but if you need any help reach out anytime and I will try my best. I specialize in backend for saas",
  },
  {
    id: 3,
    name: "Ehukai",
    title: "Software Developer",
    img: "",
    age: 22,
    interests: ["Video Games", "TV Shows", "Anime/Manga", "Birding"],
    intro:
      "Aloha, 'Track yo tech' team! I'm Ehukai, a Junior Software Developer working at Codepoint Technologies. I work almost entirely front-end building web/mobile applications that interface with Codepoint IoT devices. Don't worry I will be there to help with those pesky web dev bugs!",
  },
];

export function AboutMentors() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Hello we are mentors!
      </Typography>
      <MentorRow />
    </Container>
  );
}
