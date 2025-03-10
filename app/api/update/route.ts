import { NextResponse } from 'next/server';
import { updateTask } from '@/lib/actions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { localTask } = body;
    const addedTask = await updateTask(localTask);
    return NextResponse.json({ task: addedTask }, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}