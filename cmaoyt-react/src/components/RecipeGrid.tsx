import { FC, useEffect, useState } from "react";
import { Metadata, RecipeType } from "../types/recipe";
import RecipeThumbnail from "./RecipeThumbnail";
import { api } from "../api/axiosConfig";
import { Box, Grid } from "@mui/material";
import { dummies } from "./dummies";

const RecipeGrid: FC<{ type: RecipeType }> = ({ type }) => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  useEffect(() => {
    api(type)
      .get("/all")
      .then((result) => setMetadata(result.data))
      .catch(() => {
        setMetadata(dummies);
      });
    // .catch((reason) => console.error(reason));
  }, []);

  return (
    <Grid width={"100%"} container spacing={3}>
      {metadata.map((m, i) => (
        <Grid key={i} item xs={12} sm={6} md={4}>
          <RecipeThumbnail metadata={m} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeGrid;
