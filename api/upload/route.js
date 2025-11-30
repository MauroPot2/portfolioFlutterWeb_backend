import fs from "fs";
import path from "path";

export async function POST(request) {
  const uploadDir = path.join(process.cwd(), "storage", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const arrayBuffer = await request.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filename = `upload_${Date.now()}.jpg`;
  const filePath = path.join(uploadDir, filename);

  fs.writeFileSync(filePath, buffer);

  return new Response(JSON.stringify({ message: "File uploaded", filename }), {
    headers: { "Content-Type": "application/json" }
  });
}
