import { Container } from "@mui/material";
import AppLogo from "./components/AppLogo";

export default function Home(){
  return(
    <Container>
      <h1>Home page</h1>
      <AppLogo title="Logo One" colors="green"/>
      <AppLogo title="Logo Two" colors="blue"/>
    </Container>
  );
}