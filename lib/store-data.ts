export type DepartmentId =
  | "entrance"
  | "bakery"
  | "flowers"
  | "prepared-foods"
  | "seafood"
  | "butchery"
  | "wine"
  | "checkout"

export type AttachedCategory = {
  name: string
  lift: number // basket lift multiplier
  attachRate: number // percent of baskets
}

export type Department = {
  id: DepartmentId
  name: string
  category: string
  adjacencyScore: number // 0-100
  trend: number // pct change vs last period
  weeklyBasketShare: number // percent of baskets touching this zone
  attached: AttachedCategory[]
  optimizationNotes: string[]
  recommendedMoves: string[]
  // grid placement on the map (col / row span)
  grid: { col: number; row: number; colSpan: number; rowSpan: number }
}

export const departments: Department[] = [
  {
    id: "entrance",
    name: "Entrance",
    category: "Arrival & Impulse",
    adjacencyScore: 71,
    trend: 2.4,
    weeklyBasketShare: 100,
    attached: [
      { name: "Seasonal Produce", lift: 1.8, attachRate: 42 },
      { name: "Flowers", lift: 1.6, attachRate: 31 },
      { name: "Grab & Go Coffee", lift: 1.4, attachRate: 24 },
    ],
    optimizationNotes: [
      "First 20 ft of the entrance sets basket tone; current produce wall converts well.",
      "Impulse coffee kiosk underperforms before 9am — staffing gap.",
    ],
    recommendedMoves: [
      "Add a rotating seasonal feature table 15 ft past the threshold.",
      "Pull flowers slightly forward on weekends to capture arrival traffic.",
    ],
    grid: { col: 1, row: 1, colSpan: 2, rowSpan: 1 },
  },
  {
    id: "bakery",
    name: "Bakery",
    category: "Fresh Bakery",
    adjacencyScore: 84,
    trend: 5.1,
    weeklyBasketShare: 47,
    attached: [
      { name: "Flowers", lift: 2.1, attachRate: 38 },
      { name: "Coffee & Tea", lift: 1.9, attachRate: 34 },
      { name: "Prepared Foods", lift: 1.7, attachRate: 29 },
    ],
    optimizationNotes: [
      "Aroma-forward placement drives a strong halo on adjacent categories.",
      "Weekend morning peaks show flowers + bakery co-purchase spikes.",
    ],
    recommendedMoves: [
      "Place a flowers satellite display beside bakery on Fri–Sun.",
      "Cross-merchandise artisan coffee bags at the bakery counter.",
    ],
    grid: { col: 1, row: 2, colSpan: 1, rowSpan: 1 },
  },
  {
    id: "flowers",
    name: "Flowers",
    category: "Floral & Gifting",
    adjacencyScore: 68,
    trend: 8.3,
    weeklyBasketShare: 22,
    attached: [
      { name: "Bakery", lift: 2.1, attachRate: 38 },
      { name: "Wine", lift: 1.8, attachRate: 27 },
      { name: "Greeting Cards", lift: 1.5, attachRate: 19 },
    ],
    optimizationNotes: [
      "Highest growth trend in the store, but placement limits discovery.",
      "Gifting baskets (flowers + wine) are under-merchandised.",
    ],
    recommendedMoves: [
      "Relocate flowers adjacent to bakery on weekends for a sensory entry moment.",
      "Build a flowers + wine gifting endcap near the wine department.",
    ],
    grid: { col: 2, row: 2, colSpan: 1, rowSpan: 1 },
  },
  {
    id: "prepared-foods",
    name: "Prepared Foods",
    category: "Deli & Prepared",
    adjacencyScore: 62,
    trend: -1.7,
    weeklyBasketShare: 35,
    attached: [
      { name: "Wine", lift: 2.0, attachRate: 33 },
      { name: "Bakery", lift: 1.7, attachRate: 29 },
      { name: "Seafood", lift: 1.5, attachRate: 21 },
    ],
    optimizationNotes: [
      "Visibility drops during the 11:30–1:30 lunch window due to queue obstruction.",
      "Strong wine attach suggests an untapped meal-pairing opportunity.",
    ],
    recommendedMoves: [
      "Add a lunch-hour grab-and-go island with clear sightlines from the aisle.",
      "Pair prepared meals with single-bottle wine recommendations.",
    ],
    grid: { col: 3, row: 1, colSpan: 2, rowSpan: 1 },
  },
  {
    id: "seafood",
    name: "Seafood",
    category: "Fresh Seafood",
    adjacencyScore: 59,
    trend: 1.2,
    weeklyBasketShare: 18,
    attached: [
      { name: "Wine", lift: 1.9, attachRate: 26 },
      { name: "Prepared Foods", lift: 1.5, attachRate: 21 },
      { name: "Produce", lift: 1.4, attachRate: 17 },
    ],
    optimizationNotes: [
      "Counter service drives quality perception but slows browse-through.",
      "White wine pairing signage is missing at the case.",
    ],
    recommendedMoves: [
      "Install pairing cards (seafood + white wine) at the service case.",
      "Co-locate fresh herbs and citrus within arm's reach of the case.",
    ],
    grid: { col: 3, row: 2, colSpan: 1, rowSpan: 1 },
  },
  {
    id: "butchery",
    name: "Butchery",
    category: "Premium Meats",
    adjacencyScore: 66,
    trend: 3.5,
    weeklyBasketShare: 24,
    attached: [
      { name: "Wine", lift: 2.4, attachRate: 41 },
      { name: "Produce", lift: 1.6, attachRate: 23 },
      { name: "Bakery", lift: 1.3, attachRate: 15 },
    ],
    optimizationNotes: [
      "Strongest wine attach rate in the store — pairing intent is high.",
      "Wine is currently two aisles away, breaking the purchase journey.",
    ],
    recommendedMoves: [
      "Move a curated red wine selection directly adjacent to butchery.",
      "Train staff to suggest a pairing at the counter handoff.",
    ],
    grid: { col: 4, row: 2, colSpan: 1, rowSpan: 1 },
  },
  {
    id: "wine",
    name: "Wine",
    category: "Wine & Spirits",
    adjacencyScore: 73,
    trend: 6.8,
    weeklyBasketShare: 29,
    attached: [
      { name: "Butchery", lift: 2.4, attachRate: 41 },
      { name: "Prepared Foods", lift: 2.0, attachRate: 33 },
      { name: "Flowers", lift: 1.8, attachRate: 27 },
    ],
    optimizationNotes: [
      "Anchor destination category with the highest cross-department lift.",
      "Located far from butchery despite the strongest co-purchase signal.",
    ],
    recommendedMoves: [
      "Relocate wine closer to butchery to capture the pairing basket.",
      "Add a prepared-foods meal-pairing wine endcap near the deli.",
    ],
    grid: { col: 5, row: 1, colSpan: 1, rowSpan: 2 },
  },
  {
    id: "checkout",
    name: "Checkout",
    category: "Front End",
    adjacencyScore: 64,
    trend: 0.6,
    weeklyBasketShare: 100,
    attached: [
      { name: "Confectionery", lift: 1.7, attachRate: 36 },
      { name: "Beverages", lift: 1.4, attachRate: 28 },
      { name: "Magazines", lift: 1.1, attachRate: 9 },
    ],
    optimizationNotes: [
      "Queue length directly correlates with impulse confectionery attach.",
      "Premium impulse items outperform standard candy by 2.3x margin.",
    ],
    recommendedMoves: [
      "Curate a premium single-serve impulse lane for express checkout.",
      "Rotate seasonal confectionery to maintain novelty at the belt.",
    ],
    grid: { col: 1, row: 3, colSpan: 5, rowSpan: 1 },
  },
]

export function getDepartment(id: DepartmentId) {
  return departments.find((d) => d.id === id)
}

export const kpis = [
  { label: "Avg. Adjacency Score", value: "68.4", unit: "/100", trend: 4.2 },
  { label: "Baskets Analyzed", value: "184,302", unit: "this wk", trend: 6.1 },
  { label: "Avg. Basket Value", value: "$74.20", unit: "", trend: 2.8 },
  { label: "Cross-Dept Attach", value: "31.6%", unit: "", trend: -1.3 },
]

export const adjacencyTrend = [
  { week: "W1", score: 61, basket: 68.1 },
  { week: "W2", score: 63, basket: 69.4 },
  { week: "W3", score: 62, basket: 70.2 },
  { week: "W4", score: 65, basket: 71.8 },
  { week: "W5", score: 67, basket: 72.6 },
  { week: "W6", score: 66, basket: 73.1 },
  { week: "W7", score: 68, basket: 74.2 },
]

export const topPairs = [
  { a: "Butchery", b: "Wine", lift: 2.4, baskets: 7820, status: "Underexposed" },
  { a: "Bakery", b: "Flowers", lift: 2.1, baskets: 6410, status: "Optimize" },
  { a: "Prepared Foods", b: "Wine", lift: 2.0, baskets: 5990, status: "Underexposed" },
  { a: "Seafood", b: "Wine", lift: 1.9, baskets: 3120, status: "Optimize" },
  { a: "Flowers", b: "Wine", lift: 1.8, baskets: 2870, status: "Opportunity" },
  { a: "Entrance", b: "Seasonal Produce", lift: 1.8, baskets: 9640, status: "Healthy" },
]

export type Insight = {
  id: string
  title: string
  category: string
  impact: "High" | "Medium" | "Low"
  confidence: number
  summary: string
  detail: string
  projectedLift: string
}

export const insights: Insight[] = [
  {
    id: "wine-butchery",
    title: "Move wine closer to butchery",
    category: "Layout",
    impact: "High",
    confidence: 92,
    summary:
      "Butchery and wine show the strongest co-purchase lift (2.4x) in the store, yet sit two aisles apart.",
    detail:
      "41% of butchery baskets already include wine despite the distance. Relocating a curated red selection adjacent to the butchery counter shortens the purchase journey and is projected to convert hesitant pairing shoppers. Pair with counter-staff suggestion prompts at handoff.",
    projectedLift: "+$9.40 avg. basket on butchery trips",
  },
  {
    id: "flowers-bakery",
    title: "Place flowers near bakery on weekends",
    category: "Merchandising",
    impact: "High",
    confidence: 86,
    summary:
      "Flowers is the fastest-growing category and shows a 2.1x lift with bakery, peaking on weekend mornings.",
    detail:
      "Weekend arrival traffic responds strongly to a sensory entry moment. A flowers satellite display beside the bakery on Friday through Sunday captures impulse gifting baskets and increases flowers discovery, which is currently limited by its standard placement.",
    projectedLift: "+18% flowers attach on weekends",
  },
  {
    id: "prepared-visibility",
    title: "Improve prepared foods visibility at lunch",
    category: "Operations",
    impact: "Medium",
    confidence: 79,
    summary:
      "Prepared foods visibility drops during the 11:30–1:30 lunch window due to queue obstruction.",
    detail:
      "The only category trending down this period. A dedicated lunch-hour grab-and-go island with clear aisle sightlines removes the queue bottleneck. Combine with single-bottle wine pairings to recover the strong prepared-foods + wine attach (2.0x).",
    projectedLift: "Recover ~3.2% lunch-window baskets",
  },
  {
    id: "checkout-premium",
    title: "Curate a premium express impulse lane",
    category: "Front End",
    impact: "Medium",
    confidence: 74,
    summary:
      "Premium impulse items outperform standard confectionery by 2.3x margin at checkout.",
    detail:
      "Express checkout queues convert well on impulse but are stocked with standard candy. A curated premium single-serve lane lifts margin per impulse unit and aligns the front end with the store's premium positioning.",
    projectedLift: "+11% front-end impulse margin",
  },
]

/* ------------------------------------------------------------------ */
/* Local Assortment Intelligence                                       */
/* ------------------------------------------------------------------ */

export type SkuExpansion = {
  category: string
  rationale: string
}

export type ProductTest = {
  name: string
  note: string
}

export type AssortmentStore = {
  id: string
  name: string
  neighborhood: string
  city: string
  initials: string
  profile: string
  segment: string
  segmentDetail: string
  basketsPerWeek: number
  avgBasket: number // SGD
  localizationScore: number // 0-100, how tailored the assortment is today
  overIndexing: { category: string; index: number }[] // index vs chain avg (100 = avg)
  skuExpansions: SkuExpansion[]
  productsToTest: ProductTest[]
  risks: string[]
}

export const assortmentStores: AssortmentStore[] = [
  {
    id: "tanglin",
    name: "Tanglin Mall Flagship",
    neighborhood: "Tanglin",
    city: "Singapore 247933",
    initials: "TM",
    profile:
      "Affluent central district near Orchard Road with international residents, embassies, and luxury retail neighbours. Low price sensitivity, high expectation of provenance, imported specialty goods, and presentation.",
    segment: "Premium Cosmopolitan",
    segmentDetail: "Affluent professionals & expatriate residents",
    basketsPerWeek: 41200,
    avgBasket: 86.5,
    localizationScore: 82,
    overIndexing: [
      { category: "Fine Wine & Champagne", index: 184 },
      { category: "Prepared Gourmet Meals", index: 162 },
      { category: "Imported Cheese", index: 148 },
      { category: "Cut Flowers", index: 137 },
    ],
    skuExpansions: [
      {
        category: "Grower Champagne",
        rationale:
          "Champagne over-indexes at 184; a curated grower-producer set captures trade-up demand the core range misses.",
      },
      {
        category: "Caviar & Premium Tinned Fish",
        rationale:
          "Concierge and entertaining baskets pull luxury seafood; currently under-ranged versus neighbourhood demand.",
      },
      {
        category: "Artisan Patisserie",
        rationale:
          "High prepared-food attach supports a chilled patisserie counter with daily-bake provenance.",
      },
    ],
    productsToTest: [
      { name: "Single-estate olive oil flight", note: "Gifting & entertaining" },
      { name: "Chilled oyster bar (weekend)", note: "Footfall theatre" },
      { name: "Pre-composed canapé platters", note: "Concierge channel" },
    ],
    risks: [
      "Premium SKUs carry higher spoilage if footfall dips in August low season.",
      "Tourist-driven demand is volatile; avoid over-committing shelf to seasonal luxury.",
    ],
  },
  {
    id: "tiong-bahru",
    name: "Tiong Bahru Market",
    neighborhood: "Tiong Bahru",
    city: "Singapore 168898",
    initials: "TB",
    profile:
      "Dense, design-conscious heritage neighbourhood of young professionals and growing families. Strong weeknight scratch-cooking culture and high engagement with sustainability and provenance messaging.",
    segment: "Urban Professional Families",
    segmentDetail: "Dual-income households, ages 30–45",
    basketsPerWeek: 36800,
    avgBasket: 64.8,
    localizationScore: 74,
    overIndexing: [
      { category: "Plant-Based & Vegan", index: 171 },
      { category: "Meal-Kit Components", index: 153 },
      { category: "Natural Wine", index: 144 },
      { category: "Kids Organic Snacks", index: 129 },
    ],
    skuExpansions: [
      {
        category: "Chef-Partner Meal Kits",
        rationale:
          "Meal-kit components index 153; a branded weeknight kit programme converts component shoppers into full-solution baskets.",
      },
      {
        category: "Low/No Alcohol",
        rationale:
          "Natural-wine engagement signals openness to premium adult soft drinks among health-leaning households.",
      },
      {
        category: "Refill & Zero-Waste Pantry",
        rationale:
          "Sustainability-driven segment supports a refill station as a footfall and loyalty differentiator.",
      },
    ],
    productsToTest: [
      { name: "20-minute weeknight kits", note: "Dual-income demand" },
      { name: "Local microbrewery rotation", note: "Provenance story" },
      { name: "Compostable lunch range", note: "Office-commuter trips" },
    ],
    risks: [
      "Plant-based churn is high; rotate SKUs aggressively to avoid dead stock.",
      "Price-aware families will resist premium kit pricing above S$20 per serving.",
    ],
  },
  {
    id: "holland-village",
    name: "Holland Village",
    neighborhood: "Holland Village",
    city: "Singapore 278628",
    initials: "HV",
    profile:
      "Established affluent residential area with older, settled households and a strong expatriate presence. Loyal, routine-driven shoppers who value consistency, service, and quality staples.",
    segment: "Established Affluent",
    segmentDetail: "Older settled households, ages 50+",
    basketsPerWeek: 28400,
    avgBasket: 78.2,
    localizationScore: 69,
    overIndexing: [
      { category: "Traditional Butchery", index: 158 },
      { category: "Loose Tea & Coffee", index: 141 },
      { category: "Classic British Cheese", index: 133 },
      { category: "Fresh Bakery (Daily)", index: 126 },
    ],
    skuExpansions: [
      {
        category: "Dry-Aged & Heritage Cuts",
        rationale:
          "Butchery indexes 158; a service counter with heritage-breed and dry-aged cuts deepens the strongest local category.",
      },
      {
        category: "Specialty Loose-Leaf Tea",
        rationale:
          "Loose tea over-indexes among settled households; expand single-origin and afternoon-tea ranges.",
      },
      {
        category: "Traditional Preserves & Condiments",
        rationale:
          "Complements the classic-British basket and lifts attach at the bakery and cheese counters.",
      },
    ],
    productsToTest: [
      { name: "Manned butchery counter", note: "Service-led trade-up" },
      { name: "Afternoon-tea gift sets", note: "Gifting occasions" },
      { name: "Estate-bottled sherry & port", note: "Older affluent palate" },
    ],
    risks: [
      "Routine-driven shoppers resist range changes; phase in additions slowly.",
      "Service counters raise labour cost; validate throughput before full rollout.",
    ],
  },
  {
    id: "katong",
    name: "Katong i12",
    neighborhood: "Katong",
    city: "Singapore 428802",
    initials: "KT",
    profile:
      "High-energy lifestyle district with a young, trend-seeking population and rich Peranakan heritage food culture. Heavy lunchtime and evening grab-and-go demand and rapid adoption of food trends and viral products.",
    segment: "Young Trend-Seekers",
    segmentDetail: "Creatives & young professionals, ages 22–34",
    basketsPerWeek: 33100,
    avgBasket: 42.1,
    localizationScore: 71,
    overIndexing: [
      { category: "Grab & Go Lunch", index: 188 },
      { category: "Specialty Coffee & Energy", index: 167 },
      { category: "Global Street Food", index: 152 },
      { category: "Functional Drinks", index: 139 },
    ],
    skuExpansions: [
      {
        category: "Hot Food-to-Go Counter",
        rationale:
          "Grab-and-go indexes 188; a hot counter captures the dominant weekday lunch occasion currently leaking to QSR.",
      },
      {
        category: "Specialty & Cold-Brew Coffee",
        rationale:
          "Coffee/energy over-indexing supports a barista-grade and RTD cold-brew range as a footfall driver.",
      },
      {
        category: "Viral / Limited-Drop Snacks",
        rationale:
          "Trend-led segment responds to scarcity; a rotating limited-drop bay drives repeat visits and social reach.",
      },
    ],
    productsToTest: [
      { name: "Bao & dumpling hot bar", note: "Global street food" },
      { name: "RTD cold-brew flight", note: "Afternoon energy occasion" },
      { name: "Monthly viral-snack drop", note: "Social-led footfall" },
    ],
    risks: [
      "Lowest average basket; protect margin against high-cost food-to-go labour.",
      "Trend SKUs decay fast — limit commitments and exit quickly on stalls.",
    ],
  },
  {
    id: "bukit-timah",
    name: "Bukit Timah Greenwood",
    neighborhood: "Bukit Timah",
    city: "Singapore 289649",
    initials: "BT",
    profile:
      "Leafy, family-oriented landed-housing suburb with large homes and weekend leisure culture. Big-basket weekly shops, strong outdoor-entertaining demand, and high engagement with pets, kids, and premium produce.",
    segment: "Suburban Family Affluent",
    segmentDetail: "Homeowner families with children & pets",
    basketsPerWeek: 31500,
    avgBasket: 106.4,
    localizationScore: 66,
    overIndexing: [
      { category: "Family Bulk & Multipack", index: 149 },
      { category: "BBQ & Outdoor Dining", index: 143 },
      { category: "Premium Pet", index: 138 },
      { category: "Local Seasonal Produce", index: 131 },
    ],
    skuExpansions: [
      {
        category: "BBQ & Grilling Programme",
        rationale:
          "Outdoor-dining indexes 143; a seasonal grilling destination (marinades, premium cuts, sides) lifts the highest-value baskets.",
      },
      {
        category: "Premium & Fresh Pet Food",
        rationale:
          "Pet over-indexes among homeowner families; expand fresh/refrigerated and breed-specific lines.",
      },
      {
        category: "Family Multipack Value Tier",
        rationale:
          "Big weekly shops reward a curated multipack tier that defends share against warehouse-club leakage.",
      },
    ],
    productsToTest: [
      { name: "Weekend grill-box bundles", note: "Outdoor entertaining" },
      { name: "Local farm produce box", note: "Provenance & freshness" },
      { name: "Kids' lunchbox subscription", note: "Term-time routine" },
    ],
    risks: [
      "Highest average basket but seasonal — BBQ demand collapses Oct–Mar.",
      "Bulk value tier can cannibalise premium margin if priced too aggressively.",
    ],
  },
]
