export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
    //  className="flex flex-col items-center justify-center min-h-screen py-6 bg-background"
    >
      {children}
    </div>
  );
}
