import './globals.css'

export const metadata = {
  title: 'Vouch - Guaranteed Resale Platform',
  description: 'Premium authenticated resale marketplace for high-value branded items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}