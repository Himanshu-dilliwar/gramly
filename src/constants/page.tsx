import {
  Home,
  Users,
  Activity,
  Rocket,
  Settings,
} from "lucide-react";

export const PAGE_BREAD_CRUMBS: string[] = [
  "contacts",
  "automations",
  "integrations",
  "settings",
];

export type Page = (typeof PAGE_BREAD_CRUMBS)[number];

export const PAGE_ICON: Record<Page, React.ReactNode> = {
  home: <Home size={22} />,
  contacts: <Users size={22} />,
  automations: <Activity size={22} />,
  integrations: <Rocket size={22} />,
  settings: <Settings size={22} />,
};

export const PAGE_LABEL: Record<Page, string> = {
  home: "Home",
  contacts: "Contacts",
  automations: "Automations",
  integrations: "Integrations",
  settings: "Settings",
};

export const PLANS = [
    {
      id: 1,
      name: 'Starter plan',
      description: 'Perfect for testing',
      monthly: '₹799',
       yearly: "₹7,999",
      features: [
        'Keyword triggered responses',
        'Basic AI message generation',
        'Up to fifty keywords',
      ],
    },
    {
      id: 2,
      name: 'Growth plan',
      description: 'For serious engagement',
      monthly: '₹1,999',
      yearly: "₹19,999",
      features: [
        'Everything in Starter',
        'Advanced AI personalization',
        'Comment automation included',
        'Up to two hundred keywords',
      ],
    },
    {
      id: 3,
      name: 'Pro plan',
      description: 'For high volume accounts',
      monthly: '₹3,999',
      yearly: "₹39,999",
      features: [
        'Everything in Growth',
        'Lead qualification automation',
        'Priority support access',
        'Unlimited keywords',
        'Custom integrations available',
      ],
    },
  ];