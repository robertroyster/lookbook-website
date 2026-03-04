var PAGE_CONTENT = {
  siteTitle: "Analytics \u2014 LookbookMenu",
  siteDescription: "Know what guests crave and what they ignore. See what gets attention across Google, QR, and links.",

  navBrand: "LookbookMenu",
  navCta: "Scan Your Menu",

  heroTitle: "Know what guests crave (and what they ignore).",
  heroSubtitle: "See what gets attention across Google, QR, and links \u2014 then use it to sell more of what you want.",

  loadSections: function (set) {
    set('.section-metrics-title', 'The signals that matter');

    set('.section-actions-title', 'What to do with it');
  },

  metrics: [
    { title: "Item taps", desc: "See which dishes get the most attention \u2014 and which ones guests scroll past." },
    { title: "Category interest", desc: "Know what people browse before choosing: appetizers, desserts, cocktails, or specials." },
    { title: "Traffic source", desc: "See whether guests come from Google, QR codes, or shared links." },
    { title: "Store comparison", desc: "Compare browsing patterns across locations to spot what\u2019s working." },
    { title: "Trends over time", desc: "Track what\u2019s rising and falling so you can feature the winners." }
  ],

  actions: [
    "Reorder categories to match actual browsing behavior",
    "Promote high-margin items that already get attention",
    "Swap photos on ignored dishes to see if visuals make the difference",
    "Feature seasonal items backed by real engagement data",
    "Identify menu bloat \u2014 simplify what nobody browses"
  ],

  sampleMetrics: [
    { label: "Top dish", value: "Spicy Chicken Sandwich \u2014 312 taps" },
    { label: "Top category", value: "Wings \u2014 41% of browses" },
    { label: "Top source", value: "Google \u2014 63% of visits" }
  ],

  faqs: [
    { q: "Is this Google Analytics?", a: "No. Google Analytics tracks page views and sessions. LookBook tracks menu behavior directly \u2014 which dishes get taps, which categories get browsed, and where traffic comes from. They\u2019re complementary." },
    { q: "Do I need to set up tags or UTMs?", a: "No. LookBook has built-in attribution tracking. UTM parameters are supported but optional \u2014 tracking works out of the box." },
    { q: "Does this work for QR and Google?", a: "Yes. Both QR scans and Google traffic are tracked as core sources, so you can see how guests arrive and what they browse." },
    { q: "Can I compare stores?", a: "Yes. Multi-location brands can compare browsing patterns and top dishes across stores." },
    { q: "What about privacy?", a: "LookBook tracks aggregated interaction signals \u2014 taps, browses, and sources. No personal data is collected or stored." }
  ]
};
