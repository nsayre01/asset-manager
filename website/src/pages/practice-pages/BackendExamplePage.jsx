import { use, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import api from "../../api";
import DataTable from "../components/DataTable";

export function BackendExamplePage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches models from the backend API and updates state.
   *
   * @async
   * @function fetchModels
   * @returns {Promise<void>}
   */
  const fetchModels = async () => {
    try {
      const response = await api.get("/models");
      console.log("Fetched models:", response.data);
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch models when the component mounts
  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <Box width={1000}>
      <Typography variant="h4" gutterBottom>
        Models from Backend
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <DataTable
            data={models}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          />
          <List>
            {models.map((model, idx) => (
              <ListItem key={model.id ?? idx}>
                <ListItemText
                  primary={model.name ?? `Model ${model.id ?? idx}`}
                  secondary={JSON.stringify(model)}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
