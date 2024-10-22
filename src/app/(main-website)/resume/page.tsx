import Link from "next/link"

export default function Page() {
  return (
    <main>
      <h1>Resume Wirote</h1>
      <Link href={"../"}>Main Page</Link>
      {'  '}<br></br>
      <Link href={"../abount"}>Go to Abount</Link>
    </main>
  );
}