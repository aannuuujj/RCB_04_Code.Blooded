import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Mock extraction process
    // In reality, you would send this PDF to an OCR/Parsing service or LLM
    return NextResponse.json({
      resume_text: "Mock parsed text from the PDF: Experienced software engineer with React and Node.js..."
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
