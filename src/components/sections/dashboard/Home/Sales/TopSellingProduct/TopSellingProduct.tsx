import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import {
  Divider,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  debounce,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from './CustomPagination';

interface TopSellingProductProps {
  columns: GridColDef[];
  rows: any[];
  title?: string;
  searchPlaceholder?: string;
  pageSizeOptions?: number[];
  loading?: boolean;
}

const TopSellingProduct = ({
  columns,
  rows,
  title = "Top Selling Product",
  searchPlaceholder = "Search...",
  pageSizeOptions = [5],
  loading = false, // Add loading prop
}: TopSellingProductProps): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState('');
  const isMobile = useMediaQuery('(max-width:800px)');

  const visibleColumns = useMemo(
    () =>
      columns
        .filter((column) => column.field !== 'id')
        .map((column) => {
          if (column.field === 'refunds') {
            return {
              ...column,
              getApplyQuickFilterFn: undefined,
              filterable: false,
            };
          }
          return column;
        }),
    [columns],
  );

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue) => {
      apiRef.current.setQuickFilterValues(
        searchValue.split(' ').filter((word: any) => word !== ''),
      );
    }, 250);
  }, [apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  const renderCardView = () => (
    <Stack spacing={2} padding={2}>
      {rows.map((row) => (
        <Card key={row.user_id} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <Avatar>{row.name.charAt(0)}</Avatar>
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="h6">#{row.id}</Typography>
              <Typography variant="body1">{row.name}</Typography>
            </Box>
          </Box>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body1" color="text.primary">
              {row.email}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {row.phone_number}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="success">
              <Typography variant="body1">{row.is_active ? 'Active' : 'Inactive'}</Typography>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stack
        bgcolor="background.paper"
        borderRadius={5}
        width={1}
        boxShadow={(theme) => theme.shadows[4]}
        height={1}
      >
        <Stack
          direction={{ sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          padding={3.75}
          gap={3.75}
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          <TextField
            variant="filled"
            placeholder={searchPlaceholder}
            id="search-input"
            name="table-search-input"
            onChange={handleChange}
            value={search}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                  <IconifyIcon icon="mdi:search" width={1} height={1} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Divider />
        <Stack height={1}>
          {isMobile ? (
            renderCardView() 
          ) : (
            <DataGrid
              apiRef={apiRef}
              columns={visibleColumns}
              rows={rows}
              loading={loading} 
              getRowId={(row) => row.driver_id || row.id}
              hideFooterSelectedRowCount
              disableColumnResize
              disableColumnSelector
              disableRowSelectionOnClick
              rowSelection={false}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              autoHeight
              pageSizeOptions={pageSizeOptions}
              slots={{
                loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
                pagination: CustomPagination,
                noRowsOverlay: () => <section>No rows available</section>,
              }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopSellingProduct;
