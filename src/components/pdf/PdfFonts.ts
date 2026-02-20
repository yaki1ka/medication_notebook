import { Font } from '@react-pdf/renderer';
import NotoSansJPRegular from '../../assets/fonts/NotoSansJP-Regular.woff';
import NotoSansJPBold from '../../assets/fonts/NotoSansJP-Bold.woff';

Font.register({
  family: 'NotoSansJP',
  fonts: [
    { src: NotoSansJPRegular as string, fontWeight: 400 },
    { src: NotoSansJPBold as string, fontWeight: 700 },
  ],
});

// Prevent incorrect hyphenation of Japanese text
Font.registerHyphenationCallback((word) => [word]);
