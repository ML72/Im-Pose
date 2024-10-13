import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import CustomPage from "../components/CustomPage";
import { slicer } from "../util/slicer";
import { parseFiles } from "../util/parseFiles";
import { useSelector } from "react-redux";
import { selectPicsState } from "../store/slices/pics";

const Results: React.FC = () => {

  

  return (
    <CustomPage>
      <Container maxWidth="sm" sx={{ 
        background: 'linear-gradient(45deg, #e0f7fa, #fce4ec)',
        height: "100%",
      }}
      >        
      </Container>

    </CustomPage>
  );
};

export default Results;
