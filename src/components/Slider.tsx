import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

interface Props {
    hour: number;
    setHour: (value: number) => void;
}

export default function ContinuousSlider({hour, setHour}: Props) {

  const handleChange = (event: Event, newValue: number) => {
    console.log(newValue);
    setHour(newValue);
  };

  return (
    <div>
        <p>{hour} hours ago</p>
        <Box sx={{ width: 200 }}>
        <Stack spacing={2} direction="row" sx={{ alignItems: 'center'}}>
            <p>Change Hour:</p>
            <Slider aria-label="Volume" value={hour} onChange={handleChange} max={23} min = {0}/>
        </Stack>
        </Box>
    </div>
    
  );
}
