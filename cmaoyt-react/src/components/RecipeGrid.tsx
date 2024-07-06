import { FC, useEffect, useState } from "react";
import { Metadata, RecipeType } from "../types/recipe";
import RecipeThumbnail from "./RecipeThumbnail";
import { Grid } from "@mui/material";
import { fetchAllMetadata } from "../firebase/database";
import Loading from "./Loading";

const RecipeGrid: FC<{ type: RecipeType; category?: string }> = ({
  type,
  category,
}) => {
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllMetadata(type, setMetadata, setLoading, setError, category);
  }, []);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <Grid
          width={"100%"}
          container
          rowSpacing={3}
          columnSpacing={{ sm: 5, lg: 6 }}
        >
          {metadata.map((m, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} maxHeight={"480px"}>
              <RecipeThumbnail metadata={m} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default RecipeGrid;
