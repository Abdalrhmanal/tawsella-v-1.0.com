import { Grid, Skeleton } from "@mui/material"

function Loding() {
    return (
        <>
            <Grid container columns={12} spacing={3.75}  >
                <Grid item xs={12} md={12} lg={12} >
                    <Grid container columns={12} spacing={1}  >
                        <Grid item xs={3} md={3} lg={3} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                        <Grid item xs={3} md={3} lg={3} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12} >
                    <Grid container columns={12} spacing={1}  >
                        <Grid item xs={4} md={4} lg={4} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                        <Grid item xs={8} md={8} lg={8} >
                            <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Loding