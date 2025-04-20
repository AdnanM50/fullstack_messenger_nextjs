import { connectDB } from '@/db/dbConfig';
import { User } from '@/models/userModel';
import Otp from '@/models/Otp';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  await connectDB();
  const { email, otp } = await req.json();

  const existingOtp = await Otp.findOne({ email });
  if (!existingOtp || existingOtp.otp !== otp) {
    return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
  }

  await User.updateOne({ email }, { isVerified: true });
  await Otp.deleteOne({ email });

  return NextResponse.json({ message: 'OTP verified successfully' });
}
