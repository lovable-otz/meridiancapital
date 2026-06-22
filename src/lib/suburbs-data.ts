// Meridian Capital — Miami neighborhood pages.
// Unique local content per neighborhood — never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  /** "City of Miami" | "Miami-Dade County" | etc. */
  county: string;
  /** Short tagline / sub-heading. */
  tagline: string;
  /** First paragraph — unique local intro (700+ word pages should expand on this). */
  intro: string;
  /** Local landmarks and notable spots — used in body copy. */
  landmarks: string[];
  /** Notable local industries / business types. */
  industries: string[];
  /** Sample local businesses (fictional but plausible) used in case study callouts. */
  sampleBusinesses: { name: string; type: string; useCase: string }[];
  /** ZIP codes served. */
  zips: string[];
};

export const SUBURBS: Suburb[] = [
  {
    slug: "brickell",
    name: "Brickell",
    county: "City of Miami",
    tagline: "Latin America's Wall Street — financial services, law firms and luxury hospitality",
    intro:
      "Brickell is Miami's financial district and the de facto banking capital of Latin America, with the highest concentration of international bank branches in the United States outside of New York. Brickell Avenue runs from the Miami River south through forests of glass condo towers and Class A office space, anchored by Brickell City Centre, the Four Seasons, and dozens of private wealth, law, and family-office operators. Meridian Capital works with Brickell business owners to finance practice acquisitions, partner buy-ins, build-outs and CRE purchases sized for the district's premium economics.",
    landmarks: ["Brickell Avenue", "Brickell City Centre", "Mary Brickell Village", "Brickell Key", "Four Seasons Miami"],
    industries: ["Banking & finance", "Law firms", "Family offices & wealth management", "Luxury hospitality"],
    sampleBusinesses: [
      { name: "Brickell Avenue Wealth Advisors", type: "Financial services", useCase: "SBA 7(a) for partner buy-in and office build-out" },
      { name: "Mary Brickell Aesthetics", type: "Medical aesthetics", useCase: "Equipment financing for laser & body-contouring suite" },
      { name: "Bayfront Steakhouse", type: "Restaurant", useCase: "Working capital for second concept at Brickell City Centre" },
    ],
    zips: ["33131", "33129"],
  },
  {
    slug: "wynwood",
    name: "Wynwood",
    county: "City of Miami",
    tagline: "Arts, breweries, tech and the creative-class economy of NW 2nd Avenue",
    intro:
      "Wynwood is Miami's creative district: a former garment-and-warehouse neighborhood now built around the Wynwood Walls, dozens of independent galleries, craft breweries, design-forward restaurants and a fast-growing technology cluster anchored by Wynwood Plaza, The Annex and a wave of remote-first venture-backed teams. Meridian Capital finances Wynwood operators with structures that match the district's mix of high-rent creative real estate, hospitality cash flow, and fast-scaling tech revenue.",
    landmarks: ["Wynwood Walls", "NW 2nd Avenue gallery row", "Wynwood Plaza", "The Wynwood Marketplace", "Wynwood Brewing Co. corridor"],
    industries: ["Galleries & creative studios", "Craft breweries & restaurants", "Technology & SaaS", "Boutique retail & lifestyle"],
    sampleBusinesses: [
      { name: "NW 2nd Roastery", type: "Craft coffee & roastery", useCase: "Equipment financing for production roaster + second café" },
      { name: "Wynwood Pixel Studios", type: "Creative tech agency", useCase: "Revenue-based financing for hiring & ad-spend ramp" },
      { name: "Walls District Brewing", type: "Craft brewery & taproom", useCase: "SBA 504 for owner-occupied taproom real estate" },
    ],
    zips: ["33127", "33137"],
  },
  {
    slug: "little-havana",
    name: "Little Havana",
    county: "City of Miami",
    tagline: "Calle Ocho restaurants, cigar makers, family retail and Cuban-American services",
    intro:
      "Little Havana is the cultural and small-business heart of Miami's Cuban-American community, anchored by Calle Ocho (SW 8th Street) and a dense corridor of family-owned restaurants, cigar makers, cafés, music venues and immigrant-led retail. Many businesses here are second- and third-generation operators and the financing patterns reflect that: succession planning, real estate purchases of buildings the family has rented for decades, and equipment financing for restaurants and bakeries. Meridian Capital works with Little Havana owners on SBA-led acquisitions, working capital, and buildouts.",
    landmarks: ["Calle Ocho (SW 8th St)", "Domino Park", "Ball & Chain", "Cuban Memorial Boulevard", "Tower Theater"],
    industries: ["Restaurants & cafés", "Cigar manufacturing & retail", "Family-owned retail", "Music & entertainment venues"],
    sampleBusinesses: [
      { name: "Cafetería La Esquina", type: "Cuban restaurant", useCase: "SBA 7(a) for second-generation family buyout" },
      { name: "Calle Ocho Cigars", type: "Cigar maker & retail", useCase: "Inventory line of credit for premium leaf purchases" },
      { name: "La Pequeña Bakery", type: "Cuban bakery", useCase: "Equipment financing for industrial ovens + commissary expansion" },
    ],
    zips: ["33135", "33125"],
  },
  {
    slug: "coconut-grove",
    name: "Coconut Grove",
    county: "City of Miami",
    tagline: "Bayfront retail, restaurants, marine services and CocoWalk professional offices",
    intro:
      "Coconut Grove is Miami's oldest continuously inhabited neighborhood and its most distinctive bayfront village: a dense, walkable cluster of independent retail, sit-down restaurants, marine services, professional offices and the redeveloped CocoWalk lifestyle center. The customer base mixes long-tenured Grove residents, downtown professionals after work, and visitors arriving by car and by boat through Dinner Key and the Coconut Grove Sailing Club. Meridian Capital structures financing for the Grove's restaurant operators, marine businesses, boutique retailers and professional service firms.",
    landmarks: ["CocoWalk", "Dinner Key Marina", "Vizcaya Museum & Gardens", "Coconut Grove Sailing Club", "The Mutiny Hotel"],
    industries: ["Restaurants & hospitality", "Marine services & charters", "Boutique retail", "Professional services"],
    sampleBusinesses: [
      { name: "Dinner Key Yacht Services", type: "Marine services", useCase: "Equipment loan for lift expansion + working capital" },
      { name: "CocoWalk Bistro & Bar", type: "Restaurant", useCase: "SBA 7(a) for full-service concept acquisition" },
      { name: "Main Highway Boutique", type: "Boutique retail", useCase: "Inventory line for Art Basel + holiday seasons" },
    ],
    zips: ["33133", "33129"],
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    county: "Miami-Dade County",
    tagline: "Miracle Mile professional services, international HQs and luxury hospitality",
    intro:
      "Coral Gables — the City Beautiful — is South Florida's hub for international business: more than 150 multinational corporations operate Latin American or Caribbean headquarters here, alongside a deep bench of law firms, accounting groups, healthcare practices and the University of Miami. Miracle Mile concentrates retail and hospitality into eight Mediterranean-styled blocks; Ponce de Leon and Alhambra Circle carry the bulk of the professional services. Meridian Capital works with Gables owners on SBA-led acquisitions, owner-occupied CRE, and working capital lines sized to the city's premium rents.",
    landmarks: ["Miracle Mile", "Biltmore Hotel", "Venetian Pool", "University of Miami", "Alhambra Circle business corridor"],
    industries: ["International HQs & professional services", "Law & accounting", "Healthcare & medical practices", "Luxury hospitality"],
    sampleBusinesses: [
      { name: "Alhambra Circle Law Group", type: "Law firm", useCase: "Unsecured working capital line for lateral hires" },
      { name: "Miracle Mile Dental Studio", type: "Dental practice", useCase: "SBA 7(a) for practice acquisition + CBCT imaging" },
      { name: "Biltmore Catering Co.", type: "Catering & events", useCase: "Equipment financing + revenue-based growth capital" },
    ],
    zips: ["33134", "33146", "33156"],
  },
  {
    slug: "design-district",
    name: "Miami Design District",
    county: "City of Miami",
    tagline: "Luxury retail, contemporary art galleries and design-forward hospitality",
    intro:
      "The Miami Design District is one of the most concentrated luxury-retail corridors in the United States: Hermès, Louis Vuitton, Cartier, Dior and dozens of contemporary art galleries built into the redeveloped Buena Vista neighborhood north of Wynwood. The district mixes flagship retail tenants paying among the country's highest per-square-foot rents with independent showrooms, design studios, and a fast-growing collection of restaurants from internationally known chefs. Meridian Capital structures financing for independent operators in the district: build-outs, inventory lines, gallery acquisitions and hospitality cash flow.",
    landmarks: ["Palm Court", "Institute of Contemporary Art Miami (ICA)", "Buena Vista Building", "Design District plazas", "NE 39th Street showrooms"],
    industries: ["Luxury retail & flagships", "Contemporary art galleries", "Design studios & showrooms", "Fine-dining restaurants"],
    sampleBusinesses: [
      { name: "Palm Court Gallery", type: "Contemporary art gallery", useCase: "Inventory financing for Art Basel inventory cycle" },
      { name: "NE 39th Design Studio", type: "Interior design firm", useCase: "Working capital line for high-AOV project cycles" },
      { name: "Buena Vista Tasting Room", type: "Fine dining", useCase: "SBA 7(a) for build-out of second concept" },
    ],
    zips: ["33137"],
  },
  {
    slug: "downtown-miami",
    name: "Downtown Miami",
    county: "City of Miami",
    tagline: "Government, courts, financial offices and conference hospitality",
    intro:
      "Downtown Miami concentrates the city's government, court, conference and large-scale hospitality economy into the corridor between the Miami River and the Adrienne Arsht Center. Bayside Marketplace draws cruise-passenger and tourist foot traffic; the Brickell-adjacent CBD towers house law firms, accounting practices, financial services and a deep base of professional service operators; and a growing residential population is reshaping retail and restaurant demand. Meridian Capital works with Downtown owners across all three segments: hospitality, professional services and retail.",
    landmarks: ["Bayside Marketplace", "Adrienne Arsht Center", "Miami-Dade County Courthouse", "PortMiami terminals", "American Airlines Arena (Kaseya Center)"],
    industries: ["Government & legal services", "Conference & hospitality", "Cruise & port-tied services", "Professional services"],
    sampleBusinesses: [
      { name: "Bayfront Tower Cafés", type: "Café group", useCase: "Working capital + equipment line for three downtown locations" },
      { name: "Flagler Street Law Partners", type: "Law firm", useCase: "Unsecured business line for partner draws & growth" },
      { name: "PortMiami Provisioning Co.", type: "Cruise-supply wholesaler", useCase: "Accounts receivable financing for slow-pay terms" },
    ],
    zips: ["33128", "33130", "33132"],
  },
  {
    slug: "edgewater",
    name: "Edgewater & Midtown",
    county: "City of Miami",
    tagline: "Biscayne Boulevard hospitality, mid-rise residential retail and growing tech",
    intro:
      "Edgewater and Midtown Miami form the rapidly-growing residential corridor north of Downtown along Biscayne Bay: dense mid-rise condo development has brought a wave of new restaurants, fitness studios, dental and medical practices, dog-services operators and boutique fitness brands serving the influx of young professionals. The district sits between Wynwood's creative economy and the Design District's luxury retail, and many businesses serve both. Meridian Capital finances Edgewater operators with working capital, equipment loans and SBA-led acquisitions sized to the area's young, growth-driven cash flow.",
    landmarks: ["Margaret Pace Park", "Biscayne Boulevard corridor", "Midtown Miami shops", "Venetian Causeway entrance", "Edgewater waterfront"],
    industries: ["Restaurants & hospitality", "Healthcare & dental practices", "Fitness & wellness", "Personal services"],
    sampleBusinesses: [
      { name: "Margaret Pace Pet Co.", type: "Veterinary & pet services", useCase: "SBA 7(a) for veterinary clinic acquisition" },
      { name: "Biscayne Pilates Studio", type: "Boutique fitness", useCase: "Equipment financing + build-out loan for second studio" },
      { name: "Midtown Family Dental", type: "Dental practice", useCase: "SBA 7(a) for partner buy-in + CBCT imaging" },
    ],
    zips: ["33137", "33132"],
  },
  {
    slug: "doral",
    name: "Doral",
    county: "Miami-Dade County",
    tagline: "Latin American corporate HQs, logistics, aviation services and golf hospitality",
    intro:
      "Doral is the Miami-Dade municipality where the international business and logistics economies meet: home to U.S. headquarters for Carnival Corporation, Univision, Ryder, and dozens of Latin American corporations, plus the dense logistics and freight-forwarding cluster serving Miami International Airport (MIA) and PortMiami. The Trump National Doral resort anchors the golf-hospitality side; the NW 25th Street corridor anchors the warehouse and 3PL side. Meridian Capital finances Doral operators with SBA-backed CRE purchases, equipment loans for fleets, factoring for freight, and working capital for Latin American trade.",
    landmarks: ["Trump National Doral", "Miami International Mall", "NW 25th Street logistics corridor", "MIA cargo gateway", "CityPlace Doral"],
    industries: ["Logistics & freight forwarding", "Latin American corporate HQs", "Aviation & MRO services", "Golf & resort hospitality"],
    sampleBusinesses: [
      { name: "NW 25th Freight Forwarding", type: "Freight forwarder", useCase: "Invoice factoring + SBA 504 for warehouse purchase" },
      { name: "Doral Aviation Services", type: "Aviation MRO", useCase: "Equipment financing for engine + airframe tooling" },
      { name: "CityPlace Restaurant Group", type: "Restaurant group", useCase: "SBA 7(a) for third-location acquisition" },
    ],
    zips: ["33172", "33178", "33122", "33166"],
  },
  {
    slug: "aventura",
    name: "Aventura",
    county: "Miami-Dade County",
    tagline: "Luxury retail, healthcare, condo-tower services and Aventura Mall economy",
    intro:
      "Aventura is the northeastern luxury submarket of Miami-Dade: anchored by Aventura Mall (one of the highest-grossing shopping centers in the United States), Aventura Hospital and Medical Center, the Turnberry condo and resort properties, and a dense cluster of cosmetic medical, dental and personal-services operators serving the area's affluent residents. Cross-border buyers from Latin America make up a meaningful share of the customer base, particularly in luxury retail and medical aesthetics. Meridian Capital finances Aventura owners with SBA practice acquisitions, equipment loans for medical and aesthetic gear, and working capital lines.",
    landmarks: ["Aventura Mall", "Turnberry Isle Resort", "Aventura Hospital & Medical Center", "Founders Park", "Aventura Circle commercial strip"],
    industries: ["Luxury retail", "Medical aesthetics & dermatology", "Dental & medical practices", "Hospitality & condo services"],
    sampleBusinesses: [
      { name: "Aventura Aesthetic Medicine", type: "Medical aesthetics", useCase: "Equipment financing for laser + body-contouring devices" },
      { name: "Turnberry Dental Group", type: "Dental practice", useCase: "SBA 7(a) for two-location practice acquisition" },
      { name: "Aventura Mall Concierge Co.", type: "Concierge & retail services", useCase: "Working capital for staffing during high-season volume" },
    ],
    zips: ["33180", "33160"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
