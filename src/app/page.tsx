import { Metadata } from 'next';
import GramlyLandingPage from'@/components/GramlyLandingPage';

export const metadata: Metadata = {
  title: 'Gramly - Automate Your Instagram Conversations Instantly',
  description: 'Turn direct messages into leads without lifting a finger. Gramly responds to keywords, engages with comments, and builds relationships while you focus on what matters. Start from $19/month.',
  keywords: 'instagram automation, instagram bot, direct message automation, social media automation, instagram marketing, ai chatbot, instagram engagement, keyword triggers, automated responses',
  
  openGraph: {
    title: 'Gramly - Automate Your Instagram Conversations Instantly',
    description: 'Turn direct messages into leads without lifting a finger. Gramly responds to keywords, engages with comments, and builds relationships while you focus on what matters. Start from $19/month.',
  }
}

export default function Page() {
  return <GramlyLandingPage />
}