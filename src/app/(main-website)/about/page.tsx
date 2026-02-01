import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
export default function Page() {
  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>เกี่ยวกับเรา</Typography>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <img
          src="/profile.jpg"
          alt="นายณัฐวุฒิ จันทร์สุนทร"
          style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover', border: '5px solid #1976d2' }}
        />

        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            นายณัฐวุฒิ จันทร์สุนทร
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 1 }}>
            รหัสประจำตัว: 68319010015
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            เบอร์โทรศัพท์: 0823637578
          </Typography>
        </div>

        <Button
          component={Link}
          href="/"
          replace={true}
          variant="contained"
          sx={{ mt: 4, borderRadius: '25px', px: 4 }}
        >
          กลับหน้าแรก
        </Button>
      </div>
    </Container>
  );
}