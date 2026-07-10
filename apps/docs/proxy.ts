import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';

const { rewrite: rewriteLLM } = rewritePath('/docs/*path', '/llms.mdx/*path');
const { rewrite: rewriteMdx } = rewritePath('/docs{/*path}.mdx', '/llms.mdx{/*path}');

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // Detect if the hostname has the "onboard" subdomain.
  // This matches "onboard.shubhamgundu.vercel.app", "onboard.localhost:3000", etc.
  const isOnboardSubdomain = host.startsWith('onboard.');

  // 1. If it's the onboard subdomain:
  if (isOnboardSubdomain) {
    // If they go to "/" or "/onboarding" on the subdomain, rewrite to "/onboarding"
    if (url.pathname === '/' || url.pathname === '/onboarding') {
      url.pathname = '/onboarding';
      return NextResponse.rewrite(url);
    }
    // If they go to "/admin", rewrite to "/admin"
    if (url.pathname === '/admin') {
      url.pathname = '/admin';
      return NextResponse.rewrite(url);
    }
    
    // Allow static files, api routes, next assets, etc. to pass through
    if (
      url.pathname.startsWith('/_next') ||
      url.pathname.includes('.') ||
      url.pathname.startsWith('/api')
    ) {
      return NextResponse.next();
    }

    // Redirect any other path on the onboard subdomain to the main domain
    const mainHost = host.replace(/^onboard\./, '');
    const protocol = request.headers.get('x-forwarded-proto') || (url.protocol ? url.protocol.replace(':', '') : 'https');
    return NextResponse.redirect(`${protocol}://${mainHost}${url.pathname}`);
  }

  // 2. If it's the main domain (e.g., shubhamgundu.vercel.app or localhost:3000)
  // Redirect /onboarding or /admin request to the onboard subdomain
  if (url.pathname === '/onboarding') {
    const protocol = request.headers.get('x-forwarded-proto') || (url.protocol ? url.protocol.replace(':', '') : 'https');
    return NextResponse.redirect(`${protocol}://onboard.${host}/`);
  }
  if (url.pathname === '/admin') {
    const protocol = request.headers.get('x-forwarded-proto') || (url.protocol ? url.protocol.replace(':', '') : 'https');
    return NextResponse.redirect(`${protocol}://onboard.${host}/admin`);
  }

  // 3. Fallback to existing Fumadocs proxy logic
  const result = rewriteMdx(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}

