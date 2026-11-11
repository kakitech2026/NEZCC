export type CulturalAchievementHighlight = {
  title: string;
  description: string;
};

export type CulturalAchievementSummary = {
  summary: string;
  highlights: CulturalAchievementHighlight[];
};

export const culturalAchievementSummaries: Record<string, CulturalAchievementSummary> = {
  '2014-2015': {
    summary: 'NEZCC organised 119 programmes with about 5,355 artistes across the North East.',
    highlights: [
      { title: 'Maati Ki Rang 2015', description: 'A five-day national festival brought together around 900 artistes, artisans and cuisine experts.' },
      { title: 'Dimapur and Kisama festivals', description: 'Spring music events and Hornbill’s North East Day showcased regional artists.' },
    ],
  },
  '2015-2016': {
    summary: 'NEZCC organised and joined 120 programmes with around 11,000 artistes and participants.',
    highlights: [
      { title: 'Hornbill and OCTAVE', description: 'Artists from the eight states performed at festivals in Nagaland and across India.' },
      { title: 'Shilpgram and outreach', description: 'Crafts, workshops and border programmes brought traditions to more communities.' },
    ],
  },
  '2016-2017': {
    summary: 'NEZCC delivered 110 programmes involving 10,753 artistes and participants.',
    highlights: [
      { title: 'Discover North East and OCTAVE', description: 'Performers shared regional traditions in Arunachal Pradesh and Ajmer.' },
      { title: 'International cultural exchange', description: 'NEZCC supported Festival of India events in Kenya, Tanzania and Myanmar.' },
    ],
  },
  '2017-2018': {
    summary: 'NEZCC took part in 118 programmes spanning festivals, workshops, crafts and cultural exchange.',
    highlights: [
      { title: 'Shilpgram and OCTAVE festivals', description: 'Folk dance, music, crafts and cuisine featured in Assam and Goa.' },
      { title: 'Community outreach', description: 'Border programmes and cultural exchange reached remote communities.' },
    ],
  },
  '2018-2019': {
    summary: 'NEZCC conducted 128 programmes involving around 6,500 artists and participants.',
    highlights: [
      { title: 'Gandhi 150 programmes', description: 'Painting and theatre activities marked Mahatma Gandhi’s 150th birth anniversary.' },
      { title: 'Festivals and outreach', description: 'Hornbill, Umang, Discover North East and border programmes showcased regional traditions.' },
    ],
  },
  '2019-2020': {
    summary: 'NEZCC conducted 128 programmes and events involving about 8,476 artists and participants.',
    highlights: [
      { title: 'Festival of India in Croatia', description: 'A Manipuri dance troupe represented the region at an international event.' },
      { title: 'Shilpgram and OCTAVE', description: 'Festivals presented regional music, dance, crafts and cuisine.' },
    ],
  },
  '2020-2021': {
    summary: 'NEZCC conducted 128 programmes with around 7,200 artistes, including virtual cultural exchanges.',
    highlights: [
      { title: 'Ek Bharat Shreshtha Bharat', description: 'Online cultural programmes connected artists and audiences during the pandemic.' },
      { title: 'Festival and commemoration', description: 'NEZCC marked Gandhi 150 and presented a four-day Festival of the North East.' },
    ],
  },
  '2021-2022': {
    summary: 'NEZCC organised 200 programmes engaging around 12,000 artists and participants.',
    highlights: [
      { title: 'Festivals and exchange', description: 'Artists joined Hornbill, North East Festival and Shilp Mahotsav.' },
      { title: 'Inclusive programmes', description: 'Women’s weaving activities and Umang for Divyangjan supported skills and participation.' },
    ],
  },
  '2022-2023': {
    summary: 'NEZCC conducted 263 programmes with around 15,000 participating artistes.',
    highlights: [
      { title: 'National festivals', description: 'Artists joined Hornbill and Madhavpur Ghed under Ek Bharat Shreshtha Bharat.' },
      { title: 'Shilpgram and OCTAVE', description: 'Regional festivals shared folk dance, music, crafts and cultural traditions.' },
    ],
  },
  '2023-2024': {
    summary: 'NEZCC conducted 91 programmes involving around 7,500 artistes.',
    highlights: [
      { title: 'Vande Bharatam Nritya Utsav', description: 'State and zonal dance competitions brought performers together in the North East.' },
      { title: 'Cultural outreach', description: 'Tribal Fashion Show, Vibrant Village and community campaigns shared regional traditions across India.' },
    ],
  },
  '2024-2025': {
    summary: 'NEZCC conducted 151 programmes and events with around 7,228 artistes.',
    highlights: [
      { title: 'Hornbill Festival 2024', description: 'Troupes from the North East presented folk and tribal dances at Kisama.' },
      { title: 'Shilpgram and national showcases', description: 'Events featured crafts and performances at Guwahati, Maha Kumbh, OCTAVE and Bharatiya Kala Mahotsav.' },
    ],
  },
  '2025-2026': {
    summary: 'NEZCC conducted 163 programmes with around 34,851 artistes.',
    highlights: [
      { title: 'WAVES India Festival', description: 'North Eastern cultural heritage featured at the Mumbai festival.' },
      { title: 'Hornbill, OCTAVE and workshops', description: 'Performances and Bihu, choir and Bharatanatyam workshops showcased regional traditions.' },
    ],
  },
  '2026-2027': {
    summary: 'The first North East Tribal Spring Festival brought about 513 participants to Shilpgram, Guwahati.',
    highlights: [
      { title: 'Performances from eight states', description: 'Traditional dance, music, bands and choir represented the region’s communities.' },
      { title: 'Arts, crafts and cuisine', description: 'An exhibition, live painting, handloom, handicrafts and Bihu awards celebrated regional traditions.' },
    ],
  },
};
