import './globals.css';

export const metadata = {
  title: 'HealGut | IBS & GERD Care',
  description: 'Food safety, meal planning, symptom tracking, and education for IBS and GERD patients.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
