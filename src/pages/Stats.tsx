import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import CustomPage from "../components/CustomPage";
import { slicer } from "../util/slicer";
import { parseFiles } from "../util/parseFiles";
import { useSelector } from "react-redux";
import { selectPicsState } from "../store/slices/pics";


const Stats: React.FC = () => {
//   const initialState: any = {
//     compareType: null, // Either "pics" or "vids"
//     demo: null,
//     target: null,
//     result: null
//   };

  // const res = useSelector(selectPicsState);
//   let res = [
    // '../data/img.jpg',
    // '../data/img1.jpg',
    // '../data/img2.jpg',
    // '../data/img3.jpg',
    // '../data/img4.jpg',
    // '../data/img5.jpg',
    // '../data/img6.jpg',
    // '../data/img7.jpg',
//   ];

  // let res = [
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  //   'https://picsum.photos/100',
  // ];

  let imgs = slicer([], 3);

  return (
    <CustomPage>
      <Container maxWidth="sm" sx={{ 
        background: 'linear-gradient(45deg, #e0f7fa, #fce4ec)',
        height: "100%",
      }}
      >
        <br />
        {imgs.length === 0 ? (
          <Typography variant="h4" align="center">
            No Images Now
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {imgs.map((row, rowKey) => {
              return (
                <Box
                  sx={{
                    key: rowKey,
                    display: "flex",
                    width: "90vw",
                    justifyContent: (row.length === 2)? 'space-evenly' : 'space-between',
                    alignContent: "center",
                  }}
                >
                  {row.map((img, key) => {
                    return (
                      <Box
                        sx={{
                          key: key,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* <img
                          src={img}
                          style={{ width: "7rem", height: "7rem" }}
                        /> */}
                        <Typography>{img}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </CustomPage>
  );
};

export default Stats;
