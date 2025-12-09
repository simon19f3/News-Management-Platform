export type ArticleSource = {
  id: string | null;
  name: string;
  url: string;
  country: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  lang: string;
  category: string; // added for filtering by category
  source: ArticleSource;
};

export const mockNews = {
  totalArticles: 74834,
  articles: [
    {
      id: "091838232a650c850f2cce0586a5dc94",
      title: "AI Radical to Accused Cult Leader",
      description:
        "Lasota’s friends, colleagues, and family talk about how a NASA intern and Google employee wound up at the center of a bizarre string of murders",
      content:
        "Z iz Lasota and Gwen Danielson had reached a stalemate. It was nighttime on the Caleb, the ancient steel-hulled tugboat where they had spent the last five months of 2017...",
      url: "https://www.rollingstone.com/culture/culture-features/ziz-lasota-zizians-ai-cult-1235468289/",
      image:
        "https://www.rollingstone.com/wp-content/uploads/2025/11/Ziz-Killing-final-1.jpg?w=1600&h=900&crop=1",
      publishedAt: "2025-12-02T13:00:00Z",
      lang: "en",
      category: "technology",
      source: {
        id: "90a3acff66edeb0244b1d0b26b580755",
        name: "Rolling Stone",
        url: "https://www.rollingstone.com",
        country: "us",
      },
    },
    {
      id: "621e650b94ee8b7e4a0861414f193221",
      title:
        "Amazon just undercut the Black Friday/Cyber Monday deal on Google Pixel 10 Pro XL, now $350 off (All-time low)",
      description:
        "Today is your last chance at the Google Pixel Black Friday/Cyber Monday deals. Just about all of the best deals...",
      content:
        "Today is your last chance at the Google Pixel Black Friday/Cyber Monday deals. Just about all of the best deals are still live through today...",
      url: "https://9to5toys.com/2025/12/02/amazon-undercut-black-friday-cyber-deal-google-pixel-10-pro/",
      image:
        "https://i0.wp.com/9to5toys.com/wp-content/uploads/sites/5/2025/12/Pixel-10-XL-deals.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
      publishedAt: "2025-12-02T12:33:37Z",
      lang: "en",
      category: "business",
      source: {
        id: "2c66ef23cd21309998bc5edbc0f0db53",
        name: "9to5Toys",
        url: "https://9to5toys.com",
        country: "us",
      },
    },
    {
      id: "42860bdece890dc98fceb86cb319eb4d",
      title: "Code Red At OpenAI: ChatGPT Improvements Coming Soon After Gemini 3 Scare",
      description:
        "Improvements to Google's Gemini 3 Pro AI has resulted in a code red memo at OpenAI to improve ChatGPT's capabilities...",
      content:
        "A discovery in the ChatGPT Android app's beta version a few days ago suggested that OpenAI would soon display ads on ChatGPT's free tier...",
      url: "https://www.bgr.com/2041093/openai-code-red-chatgpt-improvements-coming-soon/",
      image:
        "https://www.bgr.com/img/gallery/code-red-at-openai-chatgpt-improvements-coming-soon-after-gemini-3-scare/l-intro-1764677638.jpg",
      publishedAt: "2025-12-02T12:19:48Z",
      lang: "en",
      category: "technology",
      source: {
        id: "b98becfda029f124cf65538c8af36d20",
        name: "BGR",
        url: "https://www.bgr.com",
        country: "us",
      },
    },

    // Additional mock articles for categories
    {
      id: "sports1",
      title: "Premier League: Arsenal Secures Last-Minute Win",
      description: "A dramatic goal lifts Arsenal to the top of the table.",
      content: "A thrilling match ends with a last-minute goal...",
      url: "#",
      image: "/images/sports1.jpg",
      publishedAt: "2025-01-10T09:00:00Z",
      lang: "en",
      category: "sports",
      source: { id: null, name: "ESPN", url: "https://www.espn.com", country: "us" },
    },
    {
      id: "politics1",
      title: "Global Leaders Meet to Discuss Climate Policy",
      description: "Summit focuses on reducing emissions by 2040.",
      content: "A major international summit convened today...",
      url: "#",
      image: "/images/politics1.jpg",
      publishedAt: "2025-01-05T09:00:00Z",
      lang: "en",
      category: "politics",
      source: { id: null, name: "CNN", url: "https://www.cnn.com", country: "us" },
    },
    {
      id: "health1",
      title: "New Vaccine Shows Promise Against Emerging Virus",
      description: "Early trials indicate strong immune response.",
      content: "A new vaccine developed shows excellent results...",
      url: "#",
      image: "/images/health1.jpg",
      publishedAt: "2025-01-08T09:00:00Z",
      lang: "en",
      category: "health",
      source: { id: null, name: "WHO", url: "https://www.who.int", country: "int" },
    },
    {
      id: "entertainment1",
      title: "New Sci-Fi Movie Breaks Global Box Office Records",
      description: "Critics call it one of the best films of the decade.",
      content: "A blockbuster film dominates the box office...",
      url: "#",
      image: "/images/ent1.jpg",
      publishedAt: "2025-01-07T09:00:00Z",
      lang: "en",
      category: "entertainment",
      source: { id: null, name: "Variety", url: "https://www.variety.com", country: "us" },
    },
     {
      id: "tech-001",
      title: "Google Announces 'Willow' Quantum Chip Success",
      description: "The new quantum processor reportedly solves tasks in minutes that would take supercomputers 10 septillion years.",
      content: "Google's Quantum AI division has unveiled 'Willow', a next-generation quantum chip that drastically reduces error rates...",
      url: "https://blog.google/technology/research/google-quantum-ai-willow-chip/",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-09T14:30:00Z",
      lang: "en",
      category: "technology",
      source: { id: "google-news", name: "Google Blog", url: "https://blog.google", country: "us" },
    },
    {
      id: "tech-002",
      title: "Gemini 2.0 Launches with Multimodal Reasoning",
      description: "The latest AI model from Google DeepMind offers unprecedented speed in code generation and visual understanding.",
      content: "Google has officially rolled out Gemini 2.0 to developers today, promising a 40% reduction in latency for real-time voice agents...",
      url: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-11T09:15:00Z",
      lang: "en",
      category: "technology",
      source: { id: "the-verge", name: "The Verge", url: "https://www.theverge.com", country: "us" },
    },
    {
      id: "tech-003",
      title: "Code Red At OpenAI: ChatGPT Improvements Coming Soon",
      description: "Improvements to Google's Gemini 3 Pro AI has resulted in a code red memo at OpenAI to improve ChatGPT's capabilities...",
      content: "A discovery in the ChatGPT Android app's beta version a few days ago suggested that OpenAI would soon display ads...",
      url: "https://www.bgr.com/2041093/openai-code-red-chatgpt-improvements-coming-soon/",
      image: "https://www.bgr.com/img/gallery/code-red-at-openai-chatgpt-improvements-coming-soon-after-gemini-3-scare/l-intro-1764677638.jpg",
      publishedAt: "2025-12-02T12:19:48Z",
      lang: "en",
      category: "technology",
      source: { id: "bgr", name: "BGR", url: "https://www.bgr.com", country: "us" },
    },

    // --- BUSINESS ---
    {
      id: "biz-001",
      title: "Bitcoin Surges Past $100k Amid New Crypto Regulations",
      description: "The cryptocurrency market hit a historic milestone today as institutional adoption accelerates globally.",
      content: "Bitcoin officially crossed the $100,000 mark this morning, driven by new ETF approvals in Asia and renewed interest from Wall Street...",
      url: "#",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-01-15T08:45:00Z",
      lang: "en",
      category: "business",
      source: { id: "bloomberg", name: "Bloomberg", url: "https://www.bloomberg.com", country: "us" },
    },
    {
      id: "biz-002",
      title: "Amazon Undercuts Black Friday Deals on Pixel 10",
      description: "Today is your last chance at the Google Pixel deals. Just about all of the best deals are still live...",
      content: "Amazon has aggressively lowered prices on the Pixel 10 lineup, signaling a fierce battle for market share in the holiday quarter...",
      url: "https://9to5toys.com/2025/12/02/amazon-undercut-black-friday-cyber-deal-google-pixel-10-pro/",
      image: "https://i0.wp.com/9to5toys.com/wp-content/uploads/sites/5/2025/12/Pixel-10-XL-deals.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
      publishedAt: "2025-12-02T12:33:37Z",
      lang: "en",
      category: "business",
      source: { id: "9to5toys", name: "9to5Toys", url: "https://9to5toys.com", country: "us" },
    },
    {
      id: "biz-003",
      title: "Global Markets Rally as Inflation Data Cools",
      description: "Major indices hit record highs as central banks signal interest rate cuts for early 2025.",
      content: "The S&P 500 and Nasdaq closed at record highs today after the latest CPI report showed inflation falling faster than expected...",
      url: "#",
      image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-02-10T16:20:00Z",
      lang: "en",
      category: "business",
      source: { id: "cnbc", name: "CNBC", url: "https://www.cnbc.com", country: "us" },
    },

    // --- SPORTS ---
    {
      id: "sport-001",
      title: "Verstappen Secures Fifth World Title in Dramatic Finale",
      description: "The Red Bull driver clinched the championship on the final lap of the Abu Dhabi Grand Prix.",
      content: "In a race that mirrored the drama of 2021, Max Verstappen overtook Lando Norris with just three corners remaining to seal his fifth consecutive title...",
      url: "#",
      image: "https://images.unsplash.com/photo-1535136272583-b7161fb4e912?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-08T18:00:00Z",
      lang: "en",
      category: "sports",
      source: { id: "autosport", name: "Autosport", url: "https://www.autosport.com", country: "uk" },
    },
    {
      id: "sport-002",
      title: "NBA: Wemby Drops 60 Points, Breaks Spurs Record",
      description: "Victor Wembanyama continues his alien-like dominance in his sophomore season.",
      content: "The Spurs sensation recorded a historic stat line of 60 points, 15 rebounds, and 8 blocks against the Lakers last night...",
      url: "#",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-01-22T04:00:00Z",
      lang: "en",
      category: "sports",
      source: { id: "espn", name: "ESPN", url: "https://www.espn.com", country: "us" },
    },
    {
      id: "sport-003",
      title: "Premier League: Arsenal Secures Last-Minute Win",
      description: "A dramatic goal lifts Arsenal to the top of the table in a thrilling London derby.",
      content: "Declan Rice scored a thunderous volley in the 96th minute to give Arsenal a crucial 2-1 victory over Chelsea at Stamford Bridge...",
      url: "#",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-01-10T09:00:00Z",
      lang: "en",
      category: "sports",
      source: { id: "bbc-sport", name: "BBC Sport", url: "https://www.bbc.co.uk/sport", country: "uk" },
    },

    // --- ENTERTAINMENT ---
    {
      id: "ent-001",
      title: "'Wicked' Movie Breaks Box Office Records",
      description: "The film adaptation has surpassed $1 billion globally in record time.",
      content: "Universal's adaptation of the hit musical 'Wicked' has become the fastest musical to reach the billion-dollar mark, driven by Ariana Grande and Cynthia Erivo's performances...",
      url: "#",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-28T10:00:00Z",
      lang: "en",
      category: "entertainment",
      source: { id: "variety", name: "Variety", url: "https://www.variety.com", country: "us" },
    },
    {
      id: "ent-002",
      title: "Squid Game Season 2: First Reviews Are In",
      description: "Critics are calling the dark sequel 'more intense and psychological' than the first.",
      content: "Netflix's biggest show returns with Gi-hun re-entering the games. Early reviews suggest a darker tone, focusing on the creators behind the contest...",
      url: "#",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-26T15:30:00Z",
      lang: "en",
      category: "entertainment",
      source: { id: "hollywood-reporter", name: "Hollywood Reporter", url: "https://www.hollywoodreporter.com", country: "us" },
    },
    {
      id: "ent-003",
      title: "Oasis Reunion Tour Sells Out in Seconds",
      description: "Tickets for the 2025 world tour were gone instantly, crashing major ticketing sites.",
      content: "Liam and Noel Gallagher's highly anticipated reunion tour has set a new record for ticket demand, with millions queueing online for a chance to see the band...",
      url: "#",
      image: "https://images.unsplash.com/photo-1493224285561-5974085cb58c?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-02-01T09:00:00Z",
      lang: "en",
      category: "entertainment",
      source: { id: "nme", name: "NME", url: "https://www.nme.com", country: "uk" },
    },

    // --- HEALTH ---
    {
      id: "health-001",
      title: "New AI-Designed Antibiotic Enters Clinical Trials",
      description: "A drug discovered entirely by AI shows promise against drug-resistant superbugs.",
      content: "Researchers at MIT have begun human trials for Halicin-2, a compound identified by deep learning algorithms that effectively kills MRSA...",
      url: "#",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-03-12T11:00:00Z",
      lang: "en",
      category: "health",
      source: { id: "nature", name: "Nature Medicine", url: "https://www.nature.com", country: "uk" },
    },
    {
      id: "health-002",
      title: "WHO Declares Milestone in Malaria Prevention",
      description: "New vaccine rollout in Sub-Saharan Africa reduces cases by 75%.",
      content: "The World Health Organization announced today that the wide-scale deployment of the R21/Matrix-M vaccine has drastically cut malaria transmission rates...",
      url: "#",
      image: "https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-04-05T13:45:00Z",
      lang: "en",
      category: "health",
      source: { id: "who", name: "WHO", url: "https://www.who.int", country: "int" },
    },

    // --- POLITICS ---
    {
      id: "pol-001",
      title: "Global Leaders Summit: Climate Policy Shift",
      description: "The G20 summit concludes with a new binding agreement on carbon pricing.",
      content: "In a surprising turn of events, major economies agreed to a unified carbon tax framework starting in 2026, aiming to accelerate the transition to green energy...",
      url: "#",
      image: "https://images.unsplash.com/photo-1529104661501-58711d943de4?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2025-01-05T09:00:00Z",
      lang: "en",
      category: "politics",
      source: { id: "reuters", name: "Reuters", url: "https://www.reuters.com", country: "uk" },
    },
    {
      id: "pol-002",
      title: "EU Passes Comprehensive AI Regulation Act",
      description: "The new laws set strict guidelines for generative AI and biometric surveillance.",
      content: "The European Parliament has voted to adopt the AI Act, establishing the world's first comprehensive legal framework for artificial intelligence...",
      url: "#",
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=800&q=80",
      publishedAt: "2024-12-15T10:00:00Z",
      lang: "en",
      category: "politics",
      source: { id: "politico", name: "Politico EU", url: "https://www.politico.eu", country: "eu" },
    },
  ],
};

// For HomeClient: simulate async fetch
export const fetchFakeArticles = async (count: number) => {
  return new Promise<Article[]>((resolve) => {
    setTimeout(() => resolve(mockNews.articles.slice(0, count)), 200);
  });
};
