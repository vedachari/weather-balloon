import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {
  hour: number;
  setHour: (value: number) => void;
}

export default function HourControl({ hour, setHour }: Props) {
  const increment = () => {
    if (hour < 24) setHour(hour + 1);
  };

  const decrement = () => {
    if (hour > 0) setHour(hour - 1);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {hour >0 && (<p>Map showing {hour} hours ago</p>)}
      {hour === 0 && (<p>Current Map</p>)}
      <Stack direction="row" spacing={2} alignItems="center">
        {hour > 0 &&(<Button variant="contained" onClick={decrement}>
          -
        </Button>)}
        <span style={{ minWidth: 50, textAlign: 'center' }}>{hour} h ago</span>
        {hour<25 && (<Button variant="contained" onClick={increment}>
          +
        </Button>)}
      </Stack>
    </Box>
  );
}
