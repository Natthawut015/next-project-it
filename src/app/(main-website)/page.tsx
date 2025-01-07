import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import AppLogo from "./components/AppLogo";
import Image from "next/image";

async function getData(){
  const response = await fetch('https://dummyjson.com/products',{cache: 'no-store'})

  if(!response.ok){
        throw new Error("ไม่สามารถ Fetch Data ได้")
  }
  return response.json()
}
export default async function Home(){
  const response  = await getData()
  return(
    <Container>
      <h1>Product</h1>
      {
        response.products && (
          <>
          <Grid>
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
      <AppLogo title="Logo One" colors="green"/>
      <AppLogo title="Logo Two" colors="blue"/>
    </Container>
  );
}