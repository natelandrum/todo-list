import { NextResponse } from 'next/server';
import { toggleTaskCompletion } from '@/lib/actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, completed } = body;
    await toggleTaskCompletion(id, completed);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error toggling task completion:', error);
    return NextResponse.json({ error: 'Failed to toggle task completion' }, { status: 500 });
  }
}