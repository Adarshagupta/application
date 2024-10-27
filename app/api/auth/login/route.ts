import { NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';

const MOCK_USER = {
  id: '1',
  email: 'demo@example.com',
  password: 'password123',
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const token = await createToken({ userId: MOCK_USER.id });
      return NextResponse.json({ token });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}