import { Noto_Sans_Arabic } from 'next/font/google'
import localFont from 'next/font/local'

/**
 * Two families, one variable each:
 *
 *   --font-doha   Doha 2036, the brand face. Latin only — used for all English text.
 *   --font-noto   Noto Sans Arabic, used for all Arabic text.
 *
 * `app/globals.css` maps these onto the semantic tokens (`--font-display`,
 * `--font-body`, `--font-arabic`) that components actually reference, so a
 * family swap happens in exactly one place.
 */

const doha = localFont({
  src: [
    { path: '../assets/fonts/Doha2036-Light.ttf', weight: '300', style: 'normal' },
    { path: '../assets/fonts/Doha2036-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Doha2036-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-doha',
  display: 'swap',
  // Doha 2036 has no Arabic coverage; Arabic glyphs fall through to Noto.
  fallback: ['system-ui', 'sans-serif'],
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
})

export const fontVariables = `${doha.variable} ${notoArabic.variable}`
