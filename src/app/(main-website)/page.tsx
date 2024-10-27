import { Container } from "@mui/material";
import AppLogo from "./components/AppLogo";

async function getData(){
  const response = await fetch('https://dummyjson.com/users')

  if(!response.ok){
        throw new Error("ไม่สามารถ Fetch Data ได้")
  }
  return response.json()
}
export default async function Home(){
  const response  = await getData()
  return(
    <Container>
      <h1>{JSON.stringify(response.users)}</h1>
      <AppLogo title="Logo One" colors="green"/>
      <AppLogo title="Logo Two" colors="blue"/>
    </Container>
  );
}