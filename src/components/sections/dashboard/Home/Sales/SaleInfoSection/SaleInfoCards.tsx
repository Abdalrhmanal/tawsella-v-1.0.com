import { Stack } from '@mui/material';
import SaleInfo from './SaleInfo';
type propesale = {
  requests?: Number;
  totalTaxi?: Number;
  totalDrivers?: Number;
}
function SaleInfoCards({ requests, totalTaxi, totalDrivers }: propesale) {
  return (
    <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75} sx={{ pl: { xs:1, sm: 3.75 } }}>
      <SaleInfo
        totalDrivers={totalDrivers}
        totalTaxi={totalTaxi}
        requests={requests} />
    </Stack>
  );
};

export default SaleInfoCards;
