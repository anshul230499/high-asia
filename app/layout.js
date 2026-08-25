import './globals.css'

export const metadata = {
  title: 'High Asia — Mountain Atlas',
  description: 'An interactive atlas of the Himalaya, Karakoram, Transhimalaya and the great mountains of High Asia.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
