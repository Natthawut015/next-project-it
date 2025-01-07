import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Image from "next/image";
import { getProduct } from './services/product-service';


export default async function BasicTable() {
  const response  = await getProduct()
  return (
    <Container>
   {
        response.products && (
          <>
          <Grid container spacing={2} sx={{mt: 10}}>
            {
              response.products.map((item: any) =>{
                return(<Grid item key={item.id} lg={3} xs={6}>
                  <Paper>
                    <Image src={item.thumbnail} alt={item.detail} width={150} height={150} />
                    <Divider/>
                    <Typography>{item.title}</Typography>
                  </Paper>
                </Grid>)
              })
            }
          </Grid>
          </>
        )
      }
    </Container>
  );
}