import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={`${inter.className} ${jetbrains.className} antialiased`}>
    {children}
  </body>
</html>
  );
}
