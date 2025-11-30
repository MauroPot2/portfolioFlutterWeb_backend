import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "storage", "cv", "cv.pdf");

  if (!fs.existsSync(filePath)) {
    return new Response(JSON.stringify({ error: "CV not found" }), {
      status: 404
    });
  }

  const buffer = fs.readFileSync(filePath);

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=cv.pdf"
    }
  });
}
