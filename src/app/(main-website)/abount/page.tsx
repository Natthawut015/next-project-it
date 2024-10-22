import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
export default function Page() {
  return (
    <Container>
      <Typography variant="h5" sx={{color: 'warning.main', bgcolor: 'blue'}}>เกี่ยวกับเรา</Typography>
      <div>
        <Button component={Link} href="/" replace={true} variant="contained" color="success">กลับหน้าแรก</Button>
      </div>
    </Container>
  );
}