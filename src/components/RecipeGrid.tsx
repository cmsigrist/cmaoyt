// React
import { FC, useEffect, useState } from "react";
// MUI
import { Grid, Typography, useTheme } from "@mui/material";
// Components
import RecipeThumbnail from "./RecipeThumbnail";
import Loading from "./Loading";
// Hooks
// Utils
import { fetchAllMetadata } from "../firebase/database";
// Types
import { Metadata, RecipeType } from "../types/recipe";
// Icons

const RecipeGrid: FC<{ type: RecipeType; categoryId?: string }> = ({
  type,
  categoryId,
}) => {
  const theme = useTheme();
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMetadata(type, setMetadata, setTitle, setLoading, categoryId);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography
            color={theme.palette.primary.main}
            textAlign="center"
            marginBottom={6}
            variant="h2"
          >
            {categoryId === undefined
              ? type[0].toUpperCase() + type.substring(1)
              : title}
          </Typography>
          <Grid
            width={"100%"}
            container
            rowSpacing={3}
            columnSpacing={{ sm: 5, lg: 6 }}
          >
            {metadata.map((m, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} height={{xs: "500px", lg: "600px"}}>
                <RecipeThumbnail metadata={m} categoryId={categoryId} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default RecipeGrid;
