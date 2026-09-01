export type ManagedImage = {
  alt?: string | null
  url?: string | null
}

export type MemberStateContent = {
  name: string
  slug: string
  tagline: string
  summary: string
  heroImage?: string | ManagedImage | null
  heroImageURL?: string | null
  heroImageAlt?: string | null
  primaryLink?: { label?: string | null; url?: string | null } | null
  secondaryLink?: { label?: string | null; url?: string | null } | null
  overview?: {
    description: string
    eyebrow?: string | null
    icon?: string | null
    id?: string | null
    image?: string | ManagedImage | null
    imageAlt?: string | null
    imageURL?: string | null
    link?: { label?: string | null; url?: string | null } | null
    title: string
  }[] | null
  highlightsHeading?: string | null
  highlightsDescription?: string | null
  highlights?: {
    category?: string | null
    description: string
    icon?: string | null
    id?: string | null
    image?: string | ManagedImage | null
    imageAlt?: string | null
    imageURL?: string | null
    link?: { label?: string | null; url?: string | null } | null
    title: string
  }[] | null
}

export const memberStateFallbacks: Record<string, MemberStateContent> = {
  'arunachal-pradesh': {
    name: 'Arunachal Pradesh',
    slug: 'arunachal-pradesh',
    tagline: 'The Land of the Rising Sun',
    summary: 'A vibrant tapestry of 26 major tribes and over 100 sub-tribes, with living traditions shaped by mountains, forests, faith, and community life.',
    heroImageURL: '/images/arunachal.webp',
    heroImageAlt: 'Arunachal Pradesh cultural landscape',
    primaryLink: { label: 'Explore Culture', url: '#highlights' },
    secondaryLink: { label: 'State Initiatives', url: '#overview' },
    overview: [
      {
        title: 'Geography and People',
        icon: 'public',
        description: 'Arunachal Pradesh shares international borders with Bhutan, Tibet, and Myanmar. Its varied topography, from snow-capped peaks to sub-tropical forests, has shaped the distinctive lifestyles of communities including the Monpa, Tani, Mishmi, and Naga tribes.',
      },
      {
        title: 'Spirituality and Tradition',
        icon: 'auto_stories',
        description: 'A harmonious blend of Donyi-Polo traditions, Buddhism, and other faiths informs festivals, architecture, music, dances, and the deep respect for nature that runs through everyday life.',
      },
    ],
    highlightsDescription: 'The living traditions and artistic expressions of the state.',
    highlights: [
      { category: 'Traditional Festivals', title: 'Losar and Solung', icon: 'festival', imageURL: '/images/losar.webp', imageAlt: 'Losar festival', description: 'Losar marks the Monpa New Year with prayers and masked dances, while Solung is the harvest festival of the Adis, celebrated with Ponung dance and community rituals.' },
      { category: 'Indigenous Crafts', title: 'Thangka and Weaving', icon: 'brush', description: 'The Monpas are renowned for sacred Buddhist Thangka scrolls, while tribal weaving traditions create intricate patterns that serve as symbols of identity.' },
      { category: 'Folk Performances', title: 'Aji Lhamu Dance', icon: 'theater_comedy', description: 'A traditional folk dance of the Monpa and Sherdukpen tribes, performed with vibrant masks and elaborate costumes during major festivals.' },
    ],
  },
  assam: {
    name: 'Assam',
    slug: 'assam',
    tagline: 'The Land of the Red River and Blue Hills',
    summary: 'The gateway to the North East, where ancient traditions flow as endlessly as the Brahmaputra.',
    primaryLink: { label: 'Explore Culture', url: '#highlights' },
    overview: [
      { title: 'Geography and People', icon: 'public', description: 'Positioned as the vital gateway to the North East, Assam is defined by the sweeping Brahmaputra valley and a multi-ethnic social fabric where indigenous tribes and plains communities coexist.' },
      { title: 'Heritage and Craft', icon: 'account_balance', description: 'Rooted in the Ahom legacy, Assam is known for Majuli, tea culture, Sualkuchi weaving, and the celebrated traditions of Muga and Eri silk.' },
    ],
    highlightsDescription: 'Living traditions, classical arts, and artisan knowledge from Assam.',
    highlights: [
      { category: 'Festival', title: 'Bihu Festival', icon: 'celebration', description: 'The heartbeat of Assamese culture, encompassing Rongali, Kongali, and Bhogali Bihu through seasonal music, dance, feasting, and community gathering.' },
      { category: 'Artisan Craft', title: 'Muga and Eri Silk', icon: 'interests', description: 'Golden Muga silk and warm Eri silk continue through indigenous weaving practices centered in communities such as Sualkuchi.' },
      { category: 'Classical Art', title: 'Sattriya Dance', icon: 'theater_comedy', description: 'A major Indian classical dance form that originated in Vaishnavite Sattras, preserving spiritual narratives through graceful movement.' },
    ],
  },
  manipur: {
    name: 'Manipur',
    slug: 'manipur',
    tagline: 'The Jewel of India',
    summary: 'A land of rich cultural traditions and natural beauty, with artistic excellence and ecological wonder at the heart of its identity.',
    heroImageURL: '/images/manipur.webp',
    primaryLink: { label: 'Explore Heritage', url: '#highlights' },
    overview: [
      { title: 'Geography and People', icon: 'public', description: 'Positioned in the heart of Northeast India, Manipur is home to diverse ethnic communities including the Meitei, Naga, and Kuki peoples, whose traditions shape a rich shared cultural landscape.' },
      { title: 'Art and Culture', icon: 'palette', description: 'Manipur preserves classical and folk forms rooted in spiritual devotion, martial practice, music, dance, and storytelling.' },
    ],
    highlightsDescription: 'Explore the distinct elements that constitute Manipur\'s contribution to India\'s heritage.',
    highlights: [
      { category: 'Classical Heritage', title: 'Raas Leela Dance', icon: 'theater_comedy', description: 'The epitome of Manipuri classical dance, depicting the divine love of Radha and Krishna through graceful, fluid movement and traditional attire.' },
      { category: 'Textiles', title: 'Handlooms and Textiles', icon: 'interests', description: 'World-renowned designs such as Phanek and Enaphi reflect expert craftsmanship passed down through generations.' },
      { category: 'Ecological Heritage', title: 'Loktak Lake and Phumdis', icon: 'water', description: 'The largest freshwater lake in Northeast India, known for unique floating islands and deep ecological importance.' },
    ],
  },
  meghalaya: {
    name: 'Meghalaya',
    slug: 'meghalaya',
    tagline: 'Abode of Clouds',
    summary: 'A land of mist-covered hills, cascading waterfalls, and indigenous wisdom, where nature and culture remain closely interwoven.',
    primaryLink: { label: 'Explore Culture', url: '#highlights' },
    overview: [
      { title: 'Geography and People', icon: 'landscape', description: 'Known for some of the world\'s heaviest rainfall, Meghalaya is home to the Khasi, Jaintia, and Garo communities, with landscapes of rolling hills, deep gorges, and sacred groves.' },
      { title: 'Heritage and Tradition', icon: 'auto_stories', description: 'Matrilineal traditions, vibrant festivals, living root bridges, and rhythmic celebrations form a distinctive cultural fabric.' },
    ],
    highlightsDescription: 'Celebrations, ecological craft, and community traditions of Meghalaya.',
    highlights: [
      { category: 'Festival', title: 'Wangala Festival', icon: 'festival', description: 'The 100 Drums Festival is the major harvest festival of the Garo tribe, marked by dance, music, and gratitude to the Sun God.' },
      { category: 'Indigenous Knowledge', title: 'Living Root Bridges', icon: 'park', description: 'A masterpiece of bio-engineering grown from Ficus elastica roots by Khasi and Jaintia communities over generations.' },
      { category: 'Festival', title: 'Shad Suk Mynsiem', icon: 'theater_comedy', description: 'The Dance of the Grateful Heart celebrates harvest and life through traditional attire, drums, and tangmuri melody.' },
    ],
  },
  mizoram: {
    name: 'Mizoram',
    slug: 'mizoram',
    tagline: 'Land of the Hill People',
    summary: 'A vibrant tapestry of tribal heritage, close-knit communities, and deep-rooted traditions set among lush hills and valleys.',
    primaryLink: { label: 'Explore Heritage', url: '#highlights' },
    overview: [
      { title: 'The Lushai Hills and Its People', icon: 'terrain', description: 'Mizoram is characterized by rolling hills, deep valleys, and pristine rivers. Various Mizo tribes are unified by shared history, language, and connection to the land.' },
      { title: 'The Spirit of Zawlbuk', icon: 'account_balance', description: 'The traditional Zawlbuk fostered discipline, community service, and shared responsibility. Its spirit of Tlawmngaihna remains central to modern Mizo social life.' },
    ],
    highlightsDescription: 'Festivals, dances, and textile traditions from Mizoram.',
    highlights: [
      { category: 'Festival', title: 'Chapchar Kut Festival', icon: 'festival', description: 'A major spring festival celebrated after clearing forests for Jhum cultivation, marked by singing, dancing, and communal feasting.' },
      { category: 'Dance', title: 'Cheraw Dance', icon: 'theater_comedy', description: 'Known globally as the Bamboo Dance, Cheraw showcases timing, intricate footwork, and vibrant traditional attire.' },
      { category: 'Craft', title: 'Mizo Handlooms', icon: 'interests', description: 'Mizo women create symbolic patterns on traditional looms, with ceremonial shawls central to cultural identity.' },
    ],
  },
  nagaland: {
    name: 'Nagaland',
    slug: 'nagaland',
    tagline: 'Land of Festivals',
    summary: 'Home to 16 major tribes, Nagaland is a mosaic of vibrant traditions where ancient heritage and communal festivals preserve a profound cultural legacy.',
    primaryLink: { label: 'Explore Heritage', url: '#highlights' },
    overview: [
      { eyebrow: 'Geography and Demographics', title: 'The Rugged Terrain and The Naga Tribes', icon: 'terrain', description: 'Nagaland is a mountainous state bordering Myanmar, with deep valleys, lofty mountains, dense forests, and distinct tribal identities shaped by its terrain.' },
      { title: 'The Morung Tradition', icon: 'gite', description: 'The Morung served as a communal educational institution where elders transmitted folklore, ancestral wisdom, martial skills, and social values.' },
      { eyebrow: 'Ancestral Legacy', title: 'Warrior Heritage and Artisanal Mastery', icon: 'swords', description: 'Naga martial history influenced social structure, wood carving, textile weaving, symbolic shawls, and the strong visual language of tribal identity.' },
    ],
    highlightsDescription: 'Celebrations and symbolic artistry that define Naga cultural identity.',
    highlights: [
      { category: 'Living Traditions', title: 'Hornbill Festival', icon: 'celebration', description: 'Known as the Festival of Festivals, Hornbill brings Naga tribes together each December for dance, music, crafts, and shared celebration.' },
      { category: 'Attire', title: 'Traditional Naga Attire', icon: 'checkroom', description: 'Distinctive shawls, headgear, beads, shells, and ornaments communicate social standing, tribal affiliation, and achievement.' },
      { category: 'Festival', title: 'Sekrenyi Festival', icon: 'festival', description: 'Celebrated by the Angami Nagas, Sekrenyi is a festival of purification, renewal, health, and prosperity.' },
    ],
  },
  sikkim: {
    name: 'Sikkim',
    slug: 'sikkim',
    tagline: 'Land of Peace and Purity',
    summary: 'A Himalayan sanctuary of spiritual heritage and natural beauty, where ancient traditions harmonize with pristine landscapes.',
    primaryLink: { label: 'Explore Heritage', url: '#highlights' },
    overview: [
      { title: 'Heritage and Spiritual Legacy', icon: 'auto_stories', description: 'Sikkim\'s cultural tapestry is deeply woven with Buddhist traditions, monasteries, sacred rituals, Thangka paintings, and mask dances.' },
      { title: 'India\'s First Organic State', icon: 'eco', description: 'Sikkim is recognized for environmental sustainability and biodiversity, with cultural life intertwined with valleys, alpine meadows, and organic farming practices.' },
    ],
    highlightsDescription: 'Unity in diversity across Lepcha, Bhutia, and Nepali communities.',
    highlights: [
      { category: 'Festival', title: 'Pang Lhabsol', icon: 'festival', description: 'A unique festival paying homage to Mount Kanchenjunga, revered as the guardian deity of Sikkim.' },
      { category: 'Festival', title: 'Losar', icon: 'celebration', description: 'The Tibetan New Year, celebrated with traditional feasting, cultural performances, and spiritual reflection.' },
      { category: 'Craft', title: 'Arts and Crafts', icon: 'brush', description: 'Wood carving, carpet weaving, Thangka painting, and jewelry traditions highlight Sikkimese craftsmanship.' },
    ],
  },
  tripura: {
    name: 'Tripura',
    slug: 'tripura',
    tagline: 'Land of Royal Heritage and Tribal Splendor',
    summary: 'A rich cultural landscape where the Manikya Dynasty legacy intertwines with the living traditions of nineteen tribal communities.',
    primaryLink: { label: 'Explore Heritage', url: '#highlights' },
    overview: [
      { title: 'The Royal Legacy', icon: 'account_balance', description: 'The Manikya Dynasty shaped Tripura\'s architecture and cultural life for centuries, leaving monuments, records, and royal traditions of historical significance.' },
      { title: 'Unakoti: The Lost Hill of Faces', icon: 'landscape', description: 'Unakoti is a remarkable Shaivite pilgrimage site with rock-cut panels and stone idols set amid lush hills, among Northeast India\'s most striking archaeological sites.' },
    ],
    highlightsDescription: 'Vibrant expressions of life through art, dance, and craft.',
    highlights: [
      { category: 'Festival', title: 'Garia Puja', icon: 'festival', description: 'An essential tribal festival celebrating prosperity and well-being, marked by traditional rituals and rhythmic drumming.' },
      { category: 'Performing Arts', title: 'Hojagiri Dance', icon: 'theater_comedy', description: 'The folk dance of the Reang community, known for balance, precision, and graceful movement.' },
      { category: 'Crafts', title: 'Handlooms and Bamboo', icon: 'interests', description: 'Tripura is known for cane and bamboo work along with indigenous weaving traditions.' },
    ],
  },
}

export const memberStateSlugs = Object.keys(memberStateFallbacks)
