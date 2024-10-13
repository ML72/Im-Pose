import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import CustomPage from "../components/CustomPage";
import { slicer } from "../util/slicer";
import { parseFiles } from "../util/parseFiles";
import { useSelector } from "react-redux";
import { selectPicsState } from "../store/slices/pics";

const Stats: React.FC = () => {
  const res = useSelector(selectPicsState);
  let imgs = slicer([1, 2, 3, 4, 5, 6, 7, 8, 9], 4);

  useEffect(() => {}, []);

  return (
    <CustomPage>
      <br />
      {imgs.length === 0 ? (
        <Typography variant="h4" align="center">
          No images found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {imgs.map((row, rowKey) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  width: "100vw",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                }}
              >
                {row.map((img, key) => {
                  return (
                    <Box
                      sx={{
                        border: "1px solid black",
                        padding: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{img}</Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      )}
    </CustomPage>
  );
};

export default Stats;
