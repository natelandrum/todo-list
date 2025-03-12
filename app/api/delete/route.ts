import { NextResponse } from 'next/server';
import { deleteTask } from '@/lib/actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const addedTask = await deleteTask(body.id);
    return NextResponse.json({ task: addedTask }, { status: 200 });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}
