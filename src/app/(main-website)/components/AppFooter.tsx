"use client";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props: any) {

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"ลิขสิทธิ์ © "}
      <Link color="inherit" href="/">
        IT Natthawut {new Date().getFullYear()}
      </Link>{" "}
    </Typography>
  );
}

const footers = [
  {
    title: "บริษัท",
    description: ["ทีมงาน", "ประวัติความเป็นมา", "สถานที่ตั้ง"],
  },
  {
    title: "ฟีเจอร์",
    description: [
      "สิ่งที่น่าสนใจ",
      "ฟีเจอร์สุ่ม",
      "ฟีเจอร์ทีม",
      "สำหรับนักพัฒนา",
      "อื่นๆ",
    ],
  },
  {
    title: "แหล่งข้อมูล",
    description: [
      "ทรัพยากร",
      "ชื่อทรัพยากร",
      "ทรัพยากรอื่นๆ",
      "ทรัพยากรสุดท้าย",
    ],
  },
  {
    title: "กฎหมาย",
    description: ["นโยบายความเป็นส่วนตัว", "ข้อกำหนดการใช้งาน"],
  },
];

export default function AppFooter() {
  return (
    <>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </>
  );
}

