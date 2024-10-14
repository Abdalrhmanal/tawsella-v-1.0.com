import { Box, Typography, Avatar, Divider, Skeleton, Grid, Button } from '@mui/material';
import { useReportGET } from './hooks/hook-r';
import CustomPieChart from './components/PieChart';
import logo from 'assets/logo/elegant-logo.png';
import Image from 'components/base/Image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';

function DriversReports() {
  const { data, isLoading, isError } = useReportGET();
  const reportRef = useRef(null);
  const [showDownloadButton, setShowDownloadButton] = useState(true);

  const downloadPDF = () => {
    setShowDownloadButton(false);

    setTimeout(() => {
      const reportElement = reportRef.current!;
      html2canvas(reportElement, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add date and time to the PDF
        const currentDate = new Date().toLocaleString();
        pdf.setFontSize(10);
        pdf.text(`Exported on: ${currentDate}`, pdfWidth - 60, 10); // Add date in the top-right corner

        pdf.addImage(imgData, 'PNG', 0, 15, pdfWidth, pdfHeight);
        pdf.save('drivers-report.pdf');
        setShowDownloadButton(true);
      });
    }, 100);
  };

  if (isLoading) return <Skeleton variant="rounded" width="96%" height="90%" />;

  if (isError) return <p>Error loading driver calculations</p>;

  return (
    <>

      <Box
        sx={{
          padding: 2,
          maxWidth: '700px',
          width: '90%',
          margin: 'auto',
          textAlign: 'center',
          border: '1px solid #ddd',
          borderRadius: 2,
          direction: 'ltr' // Ensure left-to-right direction
        }}
        ref={reportRef}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image src={logo} width="100px" sx={{ p: 0 }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} container justifyContent="flex-end">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Tawsella
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <CustomPieChart
              completed={data?.data?.numberOfCompletedMovements || 0}
              rejected={data?.data?.numberOfRejectedMovements || 0}
              canceled={data?.data?.numberOfCanceledMovements || 0}
            />
          </Box>

          <Box textAlign="left" sx={{ width: { xs: '100%', md: '50%' }, mt: { xs: 2, md: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total Trips: <span style={{ color: '#FFC107' }}>{data?.data?.numberOfMovements}</span>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              Completed Trips: {data?.data?.numberOfCompletedMovements}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
              Rejected Trips: {data?.data?.numberOfRejectedMovements }
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F44336' }}>
              Canceled Trips: {data?.data?.numberOfCanceledMovements}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              Total Amount Due: {data?.data?.totalAmount} LT
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderBottomWidth: 2 }} />

        <Typography variant="h6" textAlign="left" sx={{ fontWeight: 'bold', mb: 2 }}>
          Drivers:
        </Typography>
        {data?.data?.driversMovements.map((driver, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between" my={1} sx={{ textAlign: 'left' }}>
            <Box display="flex" alignItems="center">
              <Avatar src={driver.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Driver: {driver.name}</Typography>
            </Box>
            <Typography variant="body2">Trips: {driver.movementsCount}</Typography>
            <Typography variant="body2">Amount Received: {driver.totalAmount} LT</Typography>
          </Box>
        ))}
        {showDownloadButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={downloadPDF}
            sx={{ mt: 3 }}
          >
            Export as PDF
          </Button>
        )}
      </Box>
    </>
  );
}

export default DriversReports;
