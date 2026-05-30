export const metadata = {
  title: 'Video Wiki',
  description: 'Wiki-style video player with speed controls',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
