// Import necessary dependencies
import ToastifyProvider from '@/context/ToastifyProvider';
import { ThemeProvider } from '@/context/theme-provider';
import { getSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { userSessionType } from '@/typings';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
// Using minimal CSS to avoid UI issues with toast overlay
import 'react-toastify/ReactToastify.minimal.css';
import './globals.css';

// Configure font
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Define metadata
export const metadata: Metadata = {
  title: 'Vegetable Flow Data Entry',
  description:
    'Data entry & Visualization for vegetables flow by different roles',
};

// Root layout component with strict type checking and security measures
export default async function RootLayout({
  children,
  admin,
  procurement_team,
  sales_manager,
  salesman,
  login,
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  procurement_team: React.ReactNode;
  sales_manager: React.ReactNode;
  salesman: React.ReactNode;
  login: React.ReactNode;
}>) {
  // Get session with type safety
  const session = await getSession<userSessionType>();

  // Determine which parallel route to render based on user role
  // Using toLowerCase() for case-insensitive comparison
  // Added null check and strict equality comparison
  const parallelRouteToRender = !session
    ? login
    : session.userInfo.userRole.toLowerCase() === 'admin'
    ? admin
    : session.userInfo.userRole.toLowerCase() === 'pt'
    ? procurement_team
    : session.userInfo.userRole.toLowerCase() === 'sm'
    ? sales_manager
    : session.userInfo.userRole.toLowerCase() === 'sr'
    ? salesman
    : null;

  return (
    // Added lang attribute and hydration warning suppression
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative', // Added relative positioning
          fontSans.variable
        )}
      >
        {/* Theme provider with forced light theme for consistency */}
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          forcedTheme='light'
        >
          {/* 
            ToastifyProvider wraps the app to provide toast notifications
            - Uses minimal CSS to prevent overlay issues
            - Toast container is positioned relative to viewport
            - Z-index is managed to prevent overlay conflicts
          */}
          <ToastifyProvider>
            {/* Render parallel route or children with null coalescing */}
            {parallelRouteToRender ?? children}
          </ToastifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
