import fs from 'node:fs';
import path from 'node:path';

const videosDir = path.resolve('src/content/videos');
const galleriesDir = path.resolve('src/content/galleries');

const videosData = [
  {
    title: 'Avengers: Doomsday — Hall H Cast & Directors Reveal',
    slug: 'avengers-doomsday-hall-h-reveal',
    description: 'Marvel Studios President Kevin Feige introduces directors Anthony and Joe Russo and stuns San Diego Comic-Con as Robert Downey Jr. is unmasked as Doctor Doom.',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'San Diego Comic-Con Hall H stage illuminated by green Doom choral lighting',
    videoUrl: 'https://www.youtube.com/watch?v=sdcc-doomsday-reveal',
    youtubeId: 'sdcc-doomsday-reveal',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '04:12',
    publishedAt: '2024-07-28T04:15:00.000Z',
    category: 'SPECIAL_EVENT',
    relatedArticles: ['avengers-doomsday-robert-downey-jr-doctor-doom', 'avengers-doomsday-russo-brothers-return'],
    relatedMovies: ['avengers-doomsday', 'avengers-secret-wars'],
    characters: ['doctor-doom']
  },
  {
    title: 'The Fantastic Four: First Steps — Official SDCC First Look & Teaser',
    slug: 'fantastic-four-first-steps-sdcc-look',
    description: 'Exclusive first footage from The Fantastic Four: First Steps featuring Pedro Pascal, Vanessa Kirby, Joseph Quinn, and Ebon Moss-Bachrach in their 1960s retro-futuristic Baxter Building.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Retro-futuristic Fantasticar soaring over 1960s Queens and Manhattan',
    videoUrl: 'https://www.youtube.com/watch?v=f4-first-steps-teaser',
    youtubeId: 'f4-first-steps-teaser',
    source: 'Marvel Studios Official YouTube',
    provider: 'youtube',
    duration: '02:45',
    publishedAt: '2024-07-28T05:30:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['fantastic-four-first-steps-release-date', 'fantastic-four-first-steps-cast-details'],
    relatedMovies: ['fantastic-four-first-steps'],
    characters: ['mr-fantastic', 'invisible-woman', 'human-torch', 'the-thing', 'galactus']
  },
  {
    title: 'The Fantastic Four: First Steps — Official Studio Teaser Trailer',
    slug: 'fantastic-four-first-steps-official-teaser',
    description: 'The world\'s first official look at Matt Shakman\'s The Fantastic Four: First Steps, teasing the arrival of the Silver Surfer and the shadow of Galactus.',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Four astronauts in blue 1960s space suits gazing at a cosmic aurora',
    videoUrl: 'https://www.youtube.com/watch?v=f4-first-steps-official-teaser',
    youtubeId: 'f4-first-steps-official-teaser',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:18',
    publishedAt: '2025-02-10T15:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['fantastic-four-first-steps-mcu-integration'],
    relatedMovies: ['fantastic-four-first-steps'],
    characters: ['mr-fantastic', 'invisible-woman', 'silver-surfer']
  },
  {
    title: 'Spider-Man: Brand New Day — Production Launch & Teaser Dossier',
    slug: 'spiderman-brand-new-day-teaser-dossier',
    description: 'Sony Pictures and Marvel Studios announce the start of production on Spider-Man: Brand New Day with director Destin Daniel Cretton and star Tom Holland in New York City.',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Spider-Man suit fabric texture illuminated by police cruiser emergency lights',
    videoUrl: 'https://www.youtube.com/watch?v=spiderman-brand-new-day-announcement',
    youtubeId: 'spiderman-brand-new-day-announcement',
    source: 'Sony Pictures Entertainment YouTube',
    provider: 'youtube',
    duration: '01:52',
    publishedAt: '2025-06-18T18:00:00.000Z',
    category: 'TEASER',
    relatedArticles: ['spiderman-brand-new-day-official-announcement', 'spiderman-brand-new-day-cast-breakdown'],
    relatedMovies: ['spiderman-brand-new-day'],
    characters: ['spider-man', 'daredevil']
  },
  {
    title: 'Spider-Man: Brand New Day — Official Theatrical Trailer',
    slug: 'spiderman-brand-new-day-official-trailer',
    description: 'Peter Parker navigates a fractured New York City without Stark resources or Avengers backup, clashing with Tombstone and Mac Gargan in a brutal street-level conflict.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Spider-Man swinging between narrow Queens tenement fire escapes at night',
    videoUrl: 'https://www.youtube.com/watch?v=spiderman-bnd-trailer-1',
    youtubeId: 'spiderman-bnd-trailer-1',
    source: 'Sony Pictures / Marvel Entertainment',
    provider: 'youtube',
    duration: '02:34',
    publishedAt: '2026-03-24T16:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['spiderman-brand-new-day-trailer-breakdown'],
    relatedMovies: ['spiderman-brand-new-day'],
    characters: ['spider-man', 'daredevil', 'tombstone', 'scorpion']
  },
  {
    title: 'Captain America: Brave New World — Official Teaser Trailer',
    slug: 'captain-america-brave-new-world-teaser',
    description: 'Anthony Mackie takes flight as Captain America in the high-stakes political thriller that pits Sam Wilson against global conspiracies and President Thaddeus Ross.',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Sam Wilson in white and blue Captain America flight suit deflecting bullets with vibranium shield',
    videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmKMY',
    youtubeId: '1pHDWnXmKMY',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '01:48',
    publishedAt: '2024-07-12T13:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['captain-america-brave-new-world-red-hulk-reveal'],
    relatedMovies: ['captain-america-brave-new-world'],
    characters: ['captain-america-sam-wilson', 'hulk']
  },
  {
    title: 'Captain America: Brave New World — Official Trailer',
    slug: 'captain-america-brave-new-world-trailer',
    description: 'Harrison Ford transforms into the ferocious Red Hulk as Sam Wilson fights to protect global peace from celestial adamantium wars.',
    thumbnail: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Red Hulk roaring and slamming his fists onto the White House South Lawn',
    videoUrl: 'https://www.youtube.com/watch?v=73_1biulkYk',
    youtubeId: '73_1biulkYk',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:38',
    publishedAt: '2024-11-09T18:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['captain-america-brave-new-world-adamantium-lore'],
    relatedMovies: ['captain-america-brave-new-world'],
    characters: ['captain-america-sam-wilson', 'hulk']
  },
  {
    title: 'Thunderbolts* — Official Teaser Trailer',
    slug: 'thunderbolts-official-teaser',
    description: 'Florence Pugh, Sebastian Stan, and David Harbour lead Marvel\'s most dysfunctional covert team of assassins and operatives in a lethal black-ops assignment.',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Yelena Belova firing twin suppressed handguns in underground concrete research vault',
    videoUrl: 'https://www.youtube.com/watch?v=-sAO9AHAZmw',
    youtubeId: '-sAO9AHAZmw',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '03:19',
    publishedAt: '2024-09-23T13:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['thunderbolts-asterisk-meaning-kevin-feige', 'thunderbolts-trailer-viewership-milestone'],
    relatedMovies: ['thunderbolts'],
    characters: ['yelena-belova', 'bucky-barnes']
  },
  {
    title: 'Daredevil: Born Again — Official Trailer & NYCC First Look',
    slug: 'daredevil-born-again-trailer',
    description: 'Charlie Cox and Vincent D\'Onofrio reignite their legendary rivalry as Matt Murdock and Mayor Wilson Fisk clash on the streets of New York City.',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Daredevil in battle-damaged red cowl holding signature weighted billy club',
    videoUrl: 'https://www.youtube.com/watch?v=daredevil-born-again-trailer-nycc',
    youtubeId: 'daredevil-born-again-trailer-nycc',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:05',
    publishedAt: '2024-10-19T21:30:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['daredevil-born-again-creative-overhaul', 'punisher-jon-bernthal-return-confirmed'],
    relatedMovies: ['daredevil-born-again'],
    characters: ['daredevil', 'punisher', 'tombstone']
  },
  {
    title: 'Deadpool & Wolverine — Official Teaser Trailer',
    slug: 'deadpool-and-wolverine-teaser',
    description: 'The record-breaking Super Bowl 2024 teaser introducing Wade Wilson to the Time Variance Authority and teasing the return of Hugh Jackman\'s Wolverine.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Deadpool turning to camera in TVA interrogation room holding gold birthday candle',
    videoUrl: 'https://www.youtube.com/watch?v=uJMCNP2IpFL',
    youtubeId: 'uJMCNP2IpFL',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:25',
    publishedAt: '2024-02-11T23:30:00.000Z',
    category: 'TEASER',
    relatedArticles: ['deadpool-and-wolverine-box-office-records'],
    relatedMovies: ['deadpool-and-wolverine'],
    characters: ['deadpool', 'wolverine']
  },
  {
    title: 'Deadpool & Wolverine — Official Trailer',
    slug: 'deadpool-and-wolverine-official-trailer',
    description: 'Hugh Jackman dons the iconic yellow and blue comic suit alongside Ryan Reynolds\'s Deadpool to face Cassandra Nova in the wastelands of the Void.',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Wolverine and Deadpool walking side by side in slow motion past exploded Giant-Man skull',
    videoUrl: 'https://www.youtube.com/watch?v=73_1biulkYk',
    youtubeId: '73_1biulkYk',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:39',
    publishedAt: '2024-04-22T13:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['deadpool-and-wolverine-void-cameos-analysis'],
    relatedMovies: ['deadpool-and-wolverine'],
    characters: ['deadpool', 'wolverine', 'gambit']
  },
  {
    title: 'Spider-Man: No Way Home — Official Teaser Trailer',
    slug: 'spiderman-no-way-home-official-teaser',
    description: 'Peter Parker asks Doctor Strange to cast a spell of forgetting, shattering the multiverse and revealing Alfred Molina\'s Doc Ock in the historic viral teaser.',
    thumbnail: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Spider-Man standing atop yellow taxi on Queensboro Bridge as Doc Ock mechanical arms erupt',
    videoUrl: 'https://www.youtube.com/watch?v=rt-2cxAiGo0',
    youtubeId: 'rt-2cxAiGo0',
    source: 'Sony Pictures Entertainment YouTube',
    provider: 'youtube',
    duration: '03:03',
    publishedAt: '2021-08-24T01:30:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['spiderman-no-way-home-box-office-retrospective'],
    relatedMovies: ['spiderman-no-way-home'],
    characters: ['spider-man', 'doctor-strange']
  },
  {
    title: 'Avengers: Endgame — Official Trailer',
    slug: 'avengers-endgame-official-trailer',
    description: '"Whatever it takes." The original Avengers assemble in quantum realm suits to carry out the ultimate mission to undo Thanos\'s decimation.',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Captain America fastening broken leather shield strap in rain-swept crater',
    videoUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
    youtubeId: 'TcMBFSGVi1c',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:26',
    publishedAt: '2019-03-14T12:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['avengers-endgame-encore-box-office-performance'],
    relatedMovies: ['avengers-endgame'],
    characters: ['steve-rogers', 'thor', 'hulk', 'ant-man']
  },
  {
    title: 'Avengers: Infinity War — Official Trailer',
    slug: 'avengers-infinity-war-official-trailer',
    description: 'The universe stands on the brink of extinction as Thanos sets out to collect the six Infinity Stones in the historic Phase 3 crossover trailer.',
    thumbnail: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Thanos placing the Space Stone into the golden Infinity Gauntlet on Titan',
    videoUrl: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
    youtubeId: '6ZfuNTqbHE8',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:24',
    publishedAt: '2017-11-29T13:30:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['mcu-road-toward-secret-wars-analysis'],
    relatedMovies: ['avengers-infinity-war'],
    characters: ['thor', 'doctor-strange', 'spider-man', 'steve-rogers']
  },
  {
    title: 'Doctor Strange in the Multiverse of Madness — Official Trailer',
    slug: 'doctor-strange-multiverse-of-madness-trailer',
    description: 'Sam Raimi directs a mind-bending descent through alternate realities, featuring Professor X\'s voice, Darkhold corruption, and cosmic incursions.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Doctor Strange standing in front of glass Illuminati tribunal pods in Earth-838',
    videoUrl: 'https://www.youtube.com/watch?v=aWzlQ2N6qqg',
    youtubeId: 'aWzlQ2N6qqg',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:16',
    publishedAt: '2022-02-13T23:45:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['doctor-strange-multiverse-incursions-setup'],
    relatedMovies: ['doctor-strange-multiverse-of-madness'],
    characters: ['doctor-strange', 'scarlet-witch', 'professor-x']
  },
  {
    title: 'Black Panther: Wakanda Forever — Official Teaser Trailer',
    slug: 'black-panther-wakanda-forever-teaser',
    description: 'Set to Bob Marley\'s "No Woman, No Cry" performed by Tems, Wakanda honors King T\'Challa while Namor surfaces from the depths of Talokan.',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Queen Ramonda dressed in formal white mourning attire addressing the United Nations',
    videoUrl: 'https://www.youtube.com/watch?v=RlOB3UALvrQ',
    youtubeId: 'RlOB3UALvrQ',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:11',
    publishedAt: '2022-07-24T03:00:00.000Z',
    category: 'TEASER',
    relatedArticles: ['black-panther-3-announcement-coogler'],
    relatedMovies: ['black-panther-wakanda-forever'],
    characters: ['black-panther-shuri', 'namor']
  },
  {
    title: 'Loki Season 2 — Official Trailer',
    slug: 'loki-season-2-official-trailer',
    description: 'Tom Hiddleston\'s Loki time-slips through past, present, and future alongside Mobius and O.B. (Ke Huy Quan) to save the multiverse from unraveling.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    thumbnailAlt: 'Loki time-slipping in orange jumpsuit with temporal distortion echoing around his body',
    videoUrl: 'https://www.youtube.com/watch?v=dug56u8NN7g',
    youtubeId: 'dug56u8NN7g',
    source: 'Marvel Entertainment Official YouTube',
    provider: 'youtube',
    duration: '02:25',
    publishedAt: '2023-07-31T13:00:00.000Z',
    category: 'TRAILER',
    relatedArticles: ['loki-god-of-stories-multiverse-anchor-analysis'],
    relatedMovies: ['loki'],
    characters: ['loki']
  }
];

const galleriesData = [
  {
    title: 'The Fantastic Four: First Steps — Official Production & Concept Gallery',
    slug: 'fantastic-four-first-steps-gallery',
    description: 'Official promotional photography, retro Baxter Building set construction, and concept art released by Marvel Studios for Phase 6.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2025-07-20T10:00:00.000Z',
    movie: 'fantastic-four-first-steps',
    photos: [
      {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        alt: 'Retro-futuristic Baxter Building spire ascending into 1960s Manhattan skyline',
        caption: 'Architectural schematic for the Baxter Building launch platform in alternate 1960s New York.',
        credit: 'Marvel Studios Production Art Department',
        source: 'Marvel.com Press Release',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['mr-fantastic']
      },
      {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        alt: 'Pedro Pascal in blue ribbed aerospace jumpsuit working at retro computer terminal',
        caption: 'Pedro Pascal as Dr. Reed Richards testing quantum spatial telemetry equipment.',
        credit: 'Marvel Studios Official Still',
        source: 'San Diego Comic-Con Press Kit',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['mr-fantastic']
      },
      {
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Vanessa Kirby as Sue Storm adjusting aerodynamic navigation controls in Fantasticar cockpit',
        caption: 'Vanessa Kirby as Susan Storm Richards piloting the sub-orbital Fantasticar.',
        credit: 'Marvel Studios Production Still',
        source: 'Disney Content Showcase',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['invisible-woman']
      },
      {
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Joseph Quinn as Johnny Storm testing flame-resistant synthetic mesh gear',
        caption: 'Joseph Quinn as Johnny Storm reviewing aerodynamic wind tunnel telemetry.',
        credit: 'Pinewood Studios London Set Dispatch',
        source: 'Entertainment Weekly Exclusive Still',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['human-torch']
      },
      {
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        alt: 'Ebon Moss-Bachrach in full-body motion capture rig capturing The Thing physical performance',
        caption: 'Ebon Moss-Bachrach calibrating digital spatial volume for Ben Grimm / The Thing.',
        credit: 'Industrial Light & Magic / Marvel Studios',
        source: 'Marvel.com Behind the Scenes',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['the-thing']
      },
      {
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
        alt: 'Atmospheric cloud strata parting as silver cosmic silhouette traverses stratosphere',
        caption: 'Pre-visualization still depicting the Silver Surfer\'s atmospheric reconnaissance run.',
        credit: 'Marvel Studios Visual Development',
        source: 'D23 Expo Press Archive',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['silver-surfer', 'galactus']
      }
    ]
  },
  {
    title: 'Avengers: Doomsday — Hall H Reveal & Cast Photographic Dossier',
    slug: 'avengers-doomsday-hall-h-gallery',
    description: 'Documenting the monumental Hall H reveal at San Diego Comic-Con 2024: Robert Downey Jr., Anthony & Joe Russo, and the Latverian throne room motifs.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2024-07-28T08:00:00.000Z',
    movie: 'avengers-doomsday',
    photos: [
      {
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop',
        alt: 'Robert Downey Jr. unmasking himself from emerald Doctor Doom robe at SDCC Hall H',
        caption: 'Robert Downey Jr. steps forward in an olive green suit to reveal his casting as Victor von Doom.',
        credit: 'Jesse Grant / Getty Images for Disney',
        source: 'Marvel Studios SDCC Official Release',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['doctor-doom']
      },
      {
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        alt: 'Dozens of masked figures in green Doctor Doom robes standing motionless on Hall H stage',
        caption: 'The Latverian choir ensemble surrounding Kevin Feige prior to the unmasking.',
        credit: 'Marvel Studios Event Documentation',
        source: 'Marvel.com News Wire',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['doctor-doom']
      },
      {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        alt: 'Joe Russo and Anthony Russo smiling as they address the 6,500-seat Hall H crowd',
        caption: 'Directors Anthony and Joe Russo confirm their return to direct Avengers: Doomsday and Secret Wars.',
        credit: 'Alberto E. Rodriguez / Getty Images',
        source: 'Disney Media Kit',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['doctor-doom']
      },
      {
        image: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1200&auto=format&fit=crop',
        alt: 'Avengers: Doomsday glowing metallic green title card on massive 4K LED Hall H screen',
        caption: 'The official Avengers: Doomsday emblem revealed to the global public.',
        credit: 'Marvel Studios Presentation Graphics',
        source: 'Marvel.com Official Asset',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['doctor-doom']
      },
      {
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        alt: 'Concept sketch of Castle Doom overlooking misty European Alpine mountains',
        caption: 'Early environmental concept art exploring sovereign Latverian architectural fortifications.',
        credit: 'Marvel Studios Visual Development',
        source: 'Studio Briefing Documentation',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['doctor-doom']
      }
    ]
  },
  {
    title: 'Spider-Man: Brand New Day — NYC Practical Locations & Street Surveillance',
    slug: 'spiderman-brand-new-day-gallery',
    description: 'Location photography documenting New York City street filming in Queens, Manhattan courthouses, and nocturnal docks for Spider-Man: Brand New Day.',
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2026-04-12T14:00:00.000Z',
    movie: 'spiderman-brand-new-day',
    photos: [
      {
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200&auto=format&fit=crop',
        alt: 'Night shoot lighting rigs illuminating Queens brownstone block with faux wet asphalt',
        caption: 'Production logistics trucks and camera cranes set up along 31st Avenue in Astoria, Queens.',
        credit: '616 Intel Street Surveillance Desk',
        source: 'NYC Film Permit Public Registry',
        licenseStatus: 'PUBLIC_LOCATION_PHOTOGRAPHY',
        characters: ['spider-man']
      },
      {
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        alt: 'Tom Holland wearing black hoodie and sneakers walking past Midtown newspaper stand',
        caption: 'Tom Holland on location in Lower Manhattan as anonymous collegiate Peter Parker.',
        credit: 'NYC Production Field Photography',
        source: 'Trade Location Dispatch',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['spider-man']
      },
      {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        alt: 'Black armored syndicate SUV parked outside East River industrial warehouse',
        caption: 'Set dressing for Lonnie Lincoln / Tombstone criminal syndicate operations on the Queens waterfront.',
        credit: 'Studio Production Unit Documentation',
        source: 'Industry Trade Dispatch',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['tombstone', 'spider-man']
      },
      {
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        alt: 'Stunt double in handmade cloth Spider-Man suit suspended on wire rig above alleyway',
        caption: 'Wirework stunt rehearsals demonstrating high-speed parkour maneuvers without digital cables.',
        credit: 'Action Stunt Coordination Unit',
        source: 'Sony Pictures Production Diary',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['spider-man']
      },
      {
        image: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1200&auto=format&fit=crop',
        alt: 'Manhattan skyline at dusk with high-voltage electrical grid transformers',
        caption: 'Establishing plate photography for Harlem and Midtown electrical infrastructure sequences.',
        credit: 'Second Unit Camera Crew',
        source: 'Sony Pictures Technical Filing',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['spider-man', 'scorpion']
      }
    ]
  },
  {
    title: 'Thunderbolts* — Covert Ops & Compound Surveillance Gallery',
    slug: 'thunderbolts-covert-ops-gallery',
    description: 'Declassified stills and promotional surveillance imagery from Marvel Studios\' Thunderbolts*, featuring Yelena Belova, Bucky Barnes, and the Sentry.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    publishedAt: '2025-03-10T12:00:00.000Z',
    movie: 'thunderbolts',
    photos: [
      {
        image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        alt: 'Florence Pugh in military gray tactical turtleneck with combat harness and dual holsters',
        caption: 'Florence Pugh as Yelena Belova conducting perimeter sweeps inside an abandoned facility.',
        credit: 'Marvel Studios Official Still',
        source: 'Marvel.com Thunderbolts Dossier',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['yelena-belova']
      },
      {
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
        alt: 'Sebastian Stan wearing tailored congressional suit with concealed vibranium prosthetic',
        caption: 'Sebastian Stan as Congressman Bucky Barnes testifying before an intelligence committee.',
        credit: 'Marvel Studios / Chuck Zlotnick',
        source: 'Disney Press Portfolio',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['bucky-barnes']
      },
      {
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
        alt: 'Lewis Pullman in hospital patient smock sitting in high-security containment pod',
        caption: 'Lewis Pullman as "Bob" prior to the manifestation of Sentry\'s cosmic solar aura.',
        credit: 'Marvel Studios Production Documentation',
        source: 'Entertainment Weekly Fall Preview',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['yelena-belova']
      },
      {
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop',
        alt: 'David Harbour as Red Guardian proudly holding a cracked ceramic mug in tactical safehouse',
        caption: 'David Harbour as Alexei Shostakov reuniting with surrogate daughter Yelena.',
        credit: 'Marvel Studios Still Photography',
        source: 'Empire Magazine Cover Story',
        licenseStatus: 'EDITORIAL_PRESS_FAIR_USE',
        characters: ['yelena-belova']
      }
    ]
  }
];

fs.mkdirSync(videosDir, { recursive: true });
fs.mkdirSync(galleriesDir, { recursive: true });

for (const video of videosData) {
  const filePath = path.join(videosDir, `${video.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(video, null, 2), 'utf-8');
}

for (const gallery of galleriesData) {
  const filePath = path.join(galleriesDir, `${gallery.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(gallery, null, 2), 'utf-8');
}

console.log(`Generated ${videosData.length} video files and ${galleriesData.length} gallery files with ${galleriesData.reduce((acc, g) => acc + g.photos.length, 0)} photo records.`);
