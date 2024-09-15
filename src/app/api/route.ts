import { NextResponse } from 'next/server';

export const GET = async () => {
  // Define the URL to redirect to
  const redirectUrl = 'https://www.youtube.com/';

  // Create a new NextResponse object with a redirect
  return NextResponse.redirect(redirectUrl);
};
