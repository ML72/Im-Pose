import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import CustomPage from '../components/CustomPage';
import { triplets } from '../util/triplets';
import { parseFiles } from '../util/parseFiles';


const Results: React.FC = () => {

    // let files = parseFiles('../data');
    let imgs = triplets([1, 2, 3, 4, 5], 3);
    
    useEffect(() => {
        
    }, []);
  
  return (
    <CustomPage>
        <br />
        {(imgs.length === 0) ? 
            <Typography variant='h4' align='center'>
                No images found.
            </Typography>
            :
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {imgs.map((row, rowKey) => {
                    return (
                        <Box sx={{ 
                                display: 'flex', 
                                width: '100vw', 
                                justifyContent: 'space-evenly', 
                                alignContent: 'center',

                            }}>
                            {row.map((img, key) => {
                                return (
                                    <Box sx={{ 
                                            border: '1px solid black', 
                                            padding: 1, 
                                            justifyContent: 'center', 
                                            alignItems: 'center' 
                                        }}>
                                        <Typography>{img}</Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
            </Box>
        }
    </CustomPage>
  )
};

export default Results;