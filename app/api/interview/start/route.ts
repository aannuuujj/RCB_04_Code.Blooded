import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { role, company_type } = await req.json();

    // Mock AI Question Generation
    return NextResponse.json({
      question: `As a ${role} engineer at a ${company_type}, how would you approach optimizing the load time of a very large data grid component?`
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to start interview" }, { status: 500 });
  }
}
