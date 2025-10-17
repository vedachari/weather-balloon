import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

type AltProps = {
    alt: number,
}

const AltitudeGauge: React.FC<AltProps> = ({ alt }) => (
  <div>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={alt} valueMin={5} valueMax={100} startAngle={-110} endAngle={110}/>
    </Stack>
  </div>
);

export default AltitudeGauge;