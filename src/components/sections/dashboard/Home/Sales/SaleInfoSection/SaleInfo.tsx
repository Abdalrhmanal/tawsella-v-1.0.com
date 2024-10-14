import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeMiniIcon from '@mui/icons-material/HomeMini';

type SaleInfoProps = {
  requests?: Number;
  totalTaxi?: Number;
  totalDrivers?: Number;
};

const SaleInfo = ({ requests, totalTaxi, totalDrivers }: SaleInfoProps): ReactElement => {
  return (<>
    <Card
      sx={(theme) => ({ boxShadow: theme.shadows[4], width: 1, height: 'auto', })}
    >
      <CardMedia
        sx={{ maxWidth: 70, maxHeight: 70, }}
      >
        <AssignmentReturnedIcon sx={{ color: '#ff8e29' }} />
      </CardMedia>
      <CardContent
        sx={{ flex: '1 1 auto', padding: 0, ':last-child': { paddingBottom: 0, }, }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            Requests
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {requests?.toString() || 0}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
    <Card
      sx={(theme) => ({ boxShadow: theme.shadows[4], width: 1, height: 'auto', })}
    >
      <CardMedia
        sx={{ maxWidth: 70, maxHeight: 70, }}
      >
        <DirectionsCarIcon sx={{ color: '#ff8e29' }} />
      </CardMedia>
      <CardContent
        sx={{ flex: '1 1 auto', padding: 0, ':last-child': { paddingBottom: 0, }, }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            Total Taxi
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {totalTaxi?.toString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
    <Card
      sx={(theme) => ({ boxShadow: theme.shadows[4], width: 1, height: 'auto', })}
    >
      <CardMedia
        sx={{ maxWidth: 70, maxHeight: 70, }}
      >
        <HomeMiniIcon sx={{ color: '#ff8e29' }} />
      </CardMedia>
      <CardContent
        sx={{ flex: '1 1 auto', padding: 0, ':last-child': { paddingBottom: 0, }, }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
            Total Drivers
          </Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            {totalDrivers?.toString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </>);
};
export default SaleInfo;
