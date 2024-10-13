import React, { useEffect } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import CustomPage from "../components/CustomPage";
import { slicer } from "../util/slicer";
import { parseFiles } from "../util/parseFiles";
import { useSelector } from "react-redux";
import { selectPicsState } from "../store/slices/pics";

const Results: React.FC = () => {
  
	let res = [];

  return (
    <CustomPage>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box>
					{Math.random() * 100}%!
				</Box>
				<Box>
					Score: {Math.random() * 100}
				</Box>
				<Box>
					{Math.random() * 100 > 50? 
						<Box>
							
						</Box>
						:
						<Box>
							
						</Box>
					}
				</Box>
			</Box>
    </CustomPage>
  );
};

export default Results;
