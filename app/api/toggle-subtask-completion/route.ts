import { NextResponse } from 'next/server';
import { toggleSubtaskCompletion } from '@/lib/actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subtaskId, completed } = body;
    await toggleSubtaskCompletion(subtaskId, completed);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error toggling subtask completion:', error);
    return NextResponse.json({ error: 'Failed to toggle subtask completion' }, { status: 500 });
  }
}