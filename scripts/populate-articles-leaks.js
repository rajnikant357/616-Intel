import fs from 'node:fs';
import path from 'node:path';

const articlesDir = path.resolve('src/content/articles');
fs.mkdirSync(articlesDir, { recursive: true });

function writeArticle(data, content) {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(data.title)}`,
    `slug: ${JSON.stringify(data.slug)}`,
    `description: ${JSON.stringify(data.description)}`,
    `excerpt: ${JSON.stringify(data.excerpt || data.description)}`,
    `category: ${JSON.stringify(data.category)}`,
    `type: ${JSON.stringify(data.type)}`,
    `status: ${JSON.stringify(data.status)}`,
    `publishedAt: ${JSON.stringify(data.publishedAt)}`,
    data.updatedAt ? `updatedAt: ${JSON.stringify(data.updatedAt)}` : null,
    `author: ${JSON.stringify(data.author || '616 Intel Editorial')}`,
    `heroImage: ${JSON.stringify(data.heroImage)}`,
    `heroImageAlt: ${JSON.stringify(data.heroImageAlt || data.title)}`,
    `spoilerLevel: ${JSON.stringify(data.spoilerLevel || 'NONE')}`,
    `featured: ${data.featured ? 'true' : 'false'}`,
    `breaking: ${data.breaking ? 'true' : 'false'}`,
    `tags: ${JSON.stringify(data.tags || [])}`,
    `movie: ${JSON.stringify(data.movie || [])}`,
    `characters: ${JSON.stringify(data.characters || [])}`,
    `actors: ${JSON.stringify(data.actors || [])}`,
    `sources: ${JSON.stringify(data.sources || [], null, 2)}`,
    `relatedArticles: ${JSON.stringify(data.relatedArticles || [])}`,
    `relatedMovies: ${JSON.stringify(data.relatedMovies || [])}`,
    `relatedCharacters: ${JSON.stringify(data.relatedCharacters || [])}`,
    `readingTime: ${JSON.stringify(data.readingTime || '4 min read')}`,
    data.claim ? `claim: ${JSON.stringify(data.claim)}` : null,
    data.firstReportedAt ? `firstReportedAt: ${JSON.stringify(data.firstReportedAt)}` : null,
    data.lastUpdatedAt ? `lastUpdatedAt: ${JSON.stringify(data.lastUpdatedAt)}` : null,
    data.evidence ? `evidence: ${JSON.stringify(data.evidence)}` : null,
    data.counterEvidence ? `counterEvidence: ${JSON.stringify(data.counterEvidence)}` : null,
    data.editorialNote ? `editorialNote: ${JSON.stringify(data.editorialNote)}` : null,
    '---',
    '',
    content.trim(),
    ''
  ].filter(Boolean).join('\n');

  const filePath = path.join(articlesDir, `${data.slug}.mdx`);
  fs.writeFileSync(filePath, frontmatter, 'utf-8');
}

const leakArticles = [
  {
    title: 'LEAK EVENT: Inside the Unauthorized Spider-Man CinemaCon Footage Circulation and Studio DMCA Sweep',
    slug: 'leak-event-spiderman-cinemacon-footage-breach',
    description: 'A journalistic investigation into the unauthorized audio-visual recording smuggled out of an exhibitor showcase and Sony Pictures\' rapid digital copyright takedowns.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-04-10T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Digital security padlock graphic over blurry movie theater screen',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man'],
    tags: ['Leak Investigation', 'CinemaCon', 'DMCA', 'Spider-Man Security'],
    spoilerLevel: 'MILD',
    claim: 'A 42-second clip of Destin Daniel Cretton introducing Tom Holland in a practical stunt rehearsal was illicitly recorded on a mobile device and uploaded to TikTok.',
    firstReportedAt: '2025-04-08',
    lastUpdatedAt: '2025-04-10',
    editorialNote: '616 Intel operates strictly under journalistic reporting standards. We do not host, embed, or link to pirated footage or unauthorized download mirrors.',
    sources: [
      { name: 'The Hollywood Reporter Legal Desk', url: 'https://www.hollywoodreporter.com', type: 'TRADE', publishedAt: '2025-04-09' },
      { name: 'Variety Tech & Copyright', url: 'https://variety.com', type: 'TRADE', publishedAt: '2025-04-09' }
    ],
    content: `
## Incident Chronology

During a closed-door industry presentation at the Caesars Palace Colosseum in Las Vegas, an attendee utilized a concealed mobile phone to capture 42 seconds of private footage intended solely for theater chain executives. Within ninety minutes, watermarked snippets of the presentation were distributed across Reddit, Telegram, and TikTok.

### Studio Enforcement & Copyright Takedowns

Sony Pictures Entertainment\'s digital anti-piracy division deployed automated hash-fingerprint sweeps, issuing thousands of immediate Digital Millennium Copyright Act (DMCA) notices. Major subreddits and social channels temporarily disabled video uploads to prevent platform-level copyright strikes.

### 616 Intel Verification

Our newsroom confirmed the authenticity of the presentation materials with attendees present in the hall. The footage demonstrated Tom Holland testing high-speed wirework inside a replica Manhattan water tower, validating reports that *Brand New Day* relies heavily on in-camera practical stuntwork.
`
  },
  {
    title: 'LEAK EVENT: Spider-Man: Brand New Day Teaser Audio Recording Circulates on Discord',
    slug: 'leak-event-spiderman-brand-new-day-audio-leak',
    description: 'An illicit audio capture of Tom Holland and Charlie Cox recording dialogue for a promotional teaser leaked from a post-production sound facility.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-04-18T18:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Audio waveform display on post-production sound console glowing green',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man', 'daredevil'],
    actors: ['Tom Holland', 'Charlie Cox'],
    tags: ['Audio Leak', 'Discord', 'Daredevil', 'Spider-Man Soundstage'],
    spoilerLevel: 'MILD',
    claim: 'A 28-second clean audio stem featuring Tom Holland\'s Peter Parker discussing city curfews with Charlie Cox\'s Matt Murdock leaked online from a sound design contractor.',
    firstReportedAt: '2025-04-16',
    lastUpdatedAt: '2025-04-18',
    editorialNote: 'In accordance with journalistic ethics, 616 Intel refuses to host or redistribute leaked audio stems.',
    sources: [
      { name: 'TorrentFreak Piracy Monitor', url: 'https://torrentfreak.com', type: 'NEWS', publishedAt: '2025-04-17' }
    ],
    content: `
## Investigation into Soundstem Disclosure

A high-fidelity 28-second isolated dialogue track began circulating on private Marvel Discord communities before migrating to mainstream social platforms. The audio features Matt Murdock warning Peter Parker: *"Fisk isn\'t treating vigilantes like criminals anymore, Peter. He\'s treating them like an occupying army."*

Audio forensics indicated the file originated from an external sound mixing subcontractor in Burbank. Sony and Marvel promptly secured the removal of the asset, issuing cease-and-desist warnings to servers hosting the file.
`
  },
  {
    title: 'LEAK EVENT: Spider-Man NYC Location Call Sheet Surfaces on Film Crew Forums',
    slug: 'leak-event-spiderman-call-sheet-syndicate-leak',
    description: 'A physical daily production call sheet left behind near an Astoria equipment staging truck revealed syndicate actor names and shoot locations.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-05-02T11:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Clipboard with daily shooting schedule pages on movie set folding table',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man', 'tombstone', 'scorpion'],
    tags: ['Call Sheet', 'Production Security', 'Astoria', 'Queens Location'],
    spoilerLevel: 'MODERATE',
    claim: 'A printed call sheet labeled "Production Day 14 - Unit Blue" listed night exterior shooting coordinates, vehicle staging for Tombstone\'s syndicate, and stunt doubles for Mac Gargan.',
    firstReportedAt: '2025-04-30',
    lastUpdatedAt: '2025-05-02',
    editorialNote: 'Personal crew contact information was redacted immediately by community moderators prior to widespread reporting.',
    sources: [
      { name: 'Backstage Production Dispatch', url: 'https://www.backstage.com', type: 'TRADE', publishedAt: '2025-05-01' }
    ],
    content: `
## Physical Security Oversight Analysis

A breach in physical set protocol occurred in Astoria, Queens, when an authentic call sheet for *Spider-Man: Brand New Day* was photographed and shared on crew discussion boards. The document verified several key production elements:

1. **Working Title**: The production operates under the internal working title *Blue Oasis*.
2. **Night Perimeter**: Verified extensive nighttime filming around waterfront gravel yards near Hallets Point.
3. **Confirmed Enforcers**: Listed stunt coordinator notes for mechanical tail harness adjustments, confirming Mac Gargan\'s physical presence.
`
  },
  {
    title: 'LEAK EVENT: Spider-Man: Brand New Day Queens Waterfront Stunt Photo Leaks',
    slug: 'leak-event-spiderman-queens-stunt-photo-leak',
    description: 'High-powered telephoto lenses captured Tom Holland\'s stunt double executing wirework in a battle-damaged handmade costume.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-05-18T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Telephoto camera lens pointed across city river toward illuminated movie set',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man'],
    tags: ['Set Photos', 'Telephoto Lens', 'Queens Shoot', 'Costume Leak'],
    spoilerLevel: 'MILD',
    claim: 'Telephoto photography captured from an East River public ferry documented a battle-damaged Spider-Man suit featuring torn shoulder stitching and exposed cloth webbing.',
    firstReportedAt: '2025-05-16',
    lastUpdatedAt: '2025-05-18',
    editorialNote: 'Photographs were captured from public waters where filming is subject to public observation.',
    sources: [
      { name: 'Daily Mail Celebrity & Film Desk', url: 'https://www.dailymail.co.uk', type: 'NEWS', publishedAt: '2025-05-17' }
    ],
    content: `
## Practical Stunt Surveillance

Paparazzi and local spectators standing aboard the NYC Ferry captured telephoto images of a night stunt rehearsal on the Queens waterfront.

### Technical Analysis of the Imagery

The photographs confirm that the suit worn by Tom Holland\'s double is a direct evolution of the sewing-machine suit teased in the final shot of *No Way Home*. Notably, there are zero nanotech seams, glowing chest circuitry, or Stark HUD optics, confirming Destin Daniel Cretton\'s commitment to low-tech, vulnerable superhero combat.
`
  },
  {
    title: 'LEAK EVENT: Avengers: Doomsday Pre-Production Rehearsal Security Breach in London',
    slug: 'leak-event-avengers-doomsday-london-security-breach',
    description: 'An unauthorized individual gained access to a Pinewood Studios soundstage annex during choral costume rehearsals for Doctor Doom.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-03-08T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'High-security gate and barbed wire fence guarding film studio lot',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom'],
    tags: ['Security Breach', 'Pinewood Studios', 'London', 'Doomsday Security'],
    spoilerLevel: 'MILD',
    claim: 'A trespasser breached the perimeter of Pinewood Studios UK and photographed early wardrobe mockups of Latverian ceremonial attire before being detained by studio security.',
    firstReportedAt: '2025-03-06',
    lastUpdatedAt: '2025-03-08',
    editorialNote: 'No proprietary script documents or finished cast footage were compromised during the incident.',
    sources: [
      { name: 'The Sun UK', url: 'https://www.thesun.co.uk', type: 'NEWS', publishedAt: '2025-03-07' },
      { name: 'Variety', url: 'https://variety.com', type: 'TRADE', publishedAt: '2025-03-07' }
    ],
    content: `
## Perimeter Security Investigation

Security protocols at Pinewood Studios Buckinghamshire were escalated following an unauthorized perimeter breach in early March 2025. A rogue contractor entered Stage D, taking several blurry snapshots of wardrobe racks containing velvet green mantles and cast titanium armor plates.

Thames Valley Police confirmed that an individual was apprehended and removed from the premises. Marvel Studios subsequently installed anti-drone radio-jamming umbrellas and reinforced biometric entry barriers across all *Doomsday* production units.
`
  },
  {
    title: 'LEAK EVENT: Concept Art for Victor von Doom\'s Throne Room Leaks from VFX Vendor',
    slug: 'leak-event-avengers-doomsday-concept-art-leak',
    description: 'Rendered environmental concept art showcasing Castle Doom\'s interior throne room leaked from an overseas visual effects subcontractor.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2025-03-22T19:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Gothic stone throne room bathed in cold emerald luminescence and tech consoles',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom'],
    tags: ['Concept Art', 'VFX Leak', 'Castle Doom', 'Latveria'],
    spoilerLevel: 'MILD',
    claim: 'A high-resolution pre-visualization render depicting Victor von Doom sitting upon a stone throne flanked by cybernetic Doom-bots was posted to ArtStation before being swiftly wiped.',
    firstReportedAt: '2025-03-20',
    lastUpdatedAt: '2025-03-22',
    editorialNote: 'The leaked asset contained internal Marvel Studios watermarking, verifying its authentic origin within the design pipeline.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2025-03-21' }
    ],
    content: `
## Visual Development Breach

An unauthorized upload on digital artist portfolio platform ArtStation revealed early environmental design work for Castle Doom. The render juxtaposed ancient Latverian stonework with sleek, futuristic holographic interface terminals, visually underscoring Doom\'s dual mastery of archaic sorcery and hyper-advanced cybernetics.

Disney\'s legal counsel intervened within thirty minutes, prompting the removal of the portfolio post and triggering an audit of the vendor\'s data security protocols.
`
  },
  {
    title: 'LEAK EVENT: Captain America: Brave New World Red Hulk Merchandise Packaging Leak',
    slug: 'leak-event-captain-america-red-hulk-merchandise-leak',
    description: 'Retail supply chain leaks in Asia and North America inadvertently revealed Harrison Ford\'s Red Hulk transformation months ahead of trailers.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'CONFIRMED',
    publishedAt: '2024-05-02T13:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Collector action figure box packaging showing crimson behemoth silhouette',
    movie: ['captain-america-brave-new-world'],
    characters: ['hulk', 'captain-america-sam-wilson'],
    tags: ['Red Hulk', 'Merchandise Leak', 'Hasbro', 'Retail Packaging'],
    spoilerLevel: 'MILD',
    claim: 'McDonald\'s Happy Meal promotional plush toys and Hasbro Marvel Legends retail packaging displayed Harrison Ford\'s President Ross transformed into Red Hulk.',
    firstReportedAt: '2024-04-28',
    lastUpdatedAt: '2024-05-02',
    editorialNote: 'This represents a classic global supply chain leak where toy shipping calendars outpace shifted movie release dates.',
    sources: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com', type: 'TRADE', publishedAt: '2024-04-30' }
    ],
    content: `
## Retail Supply Chain Declassification

When *Captain America: Brave New World* was delayed from summer 2024 to February 2025 due to the Hollywood labor strikes, global licensing partner contracts had already manufactured millions of retail consumer products.

In late April 2024, photos of official McDonald\'s promotional bags and collector action figure backings from Target stockrooms leaked across social media, confirming Red Hulk\'s appearance months before Marvel Studios officially unveiled the character in its July 2024 teaser trailer.
`
  },
  {
    title: 'LEAK EVENT: Drone Footage of The Fantastic Four Retro-1960s London Backlot Surfaces',
    slug: 'leak-event-fantastic-four-drone-footage-london',
    description: 'An unauthorized hobbyist drone piloted over Pinewood Studios backlot captured massive mid-century New York street sets and the Fantasticar rig.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2024-08-28T17:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Aerial drone view overlooking studio soundstage backlot facades',
    movie: ['fantastic-four-first-steps'],
    characters: ['mr-fantastic'],
    tags: ['Drone Footage', 'Fantastic Four', 'Pinewood Backlot', 'Set Construction'],
    spoilerLevel: 'MILD',
    claim: 'A 4K aerial drone video captured the full physical scale of Matt Shakman\'s retro-1960s Manhattan street sets, complete with period vintage cars and practical rocket launch structures.',
    firstReportedAt: '2024-08-26',
    lastUpdatedAt: '2024-08-28',
    editorialNote: 'The UK Civil Aviation Authority subsequently reiterated airspace restrictions over licensed film studios.',
    sources: [
      { name: 'BBC News Entertainment', url: 'https://www.bbc.com/news', type: 'NEWS', publishedAt: '2024-08-27' }
    ],
    content: `
## Airspace Security Violation

A hobbyist drone operator captured three minutes of unauthorized aerial reconnaissance over Pinewood Studios\' exterior Paddock Tank backlot. The footage revealed an astounding level of practical world-building for *The Fantastic Four: First Steps*:

* **Practical Mid-Century Facades**: Two entire New York City blocks constructed with authentic 1960s architectural motifs, vintage signage, and art-deco storefronts.
* **Launchpad Staging**: A multi-story rocket launch apparatus designed for the Fantasticar sub-orbital sequence.
`
  },
  {
    title: 'LEAK EVENT: Deadpool & Wolverine Theatrical Concession Cup Spoils Mask Design Months Early',
    slug: 'leak-event-deadpool-wolverine-cup-leak',
    description: 'Theater chain promotional drinkware shipped early to Latin American cinemas revealed Hugh Jackman\'s comic-accurate Wolverine cowl.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'CONFIRMED',
    publishedAt: '2024-04-12T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Cinematic souvenir plastic cup featuring embossed masked superhero face',
    movie: ['deadpool-and-wolverine'],
    characters: ['wolverine', 'deadpool'],
    tags: ['Deadpool & Wolverine', 'Concession Leak', 'Wolverine Mask', 'Cinema Merchandise'],
    spoilerLevel: 'MILD',
    claim: 'Photos of an official theater plastic drink cup leaked from a Mexican cinema warehouse, showing Hugh Jackman\'s classic comic-accurate pointed black-eared Wolverine cowl for the first time.',
    firstReportedAt: '2024-04-10',
    lastUpdatedAt: '2024-04-12',
    editorialNote: 'Confirmed fully authentic when Marvel Studios unveiled the mask in subsequent official promotional campaigns.',
    sources: [
      { name: 'IGN', url: 'https://www.ign.com', type: 'NEWS', publishedAt: '2024-04-11' }
    ],
    content: `
## Concession Supply Chain Leak

Before Marvel Studios released official footage of Hugh Jackman wearing the iconic Wolverine mask, cinema employees at a major multiplex chain in Monterrey, Mexico, unboxed concession drinkware bearing high-resolution embossed artwork of the cowl.

The leak satisfied twenty-four years of fan speculation, conclusively proving that Marvel Studios had finally brought John Byrne and Dave Cockrum\'s black-eared mask to the big screen without alteration.
`
  },
  {
    title: 'LEAK EVENT: Daredevil: Born Again White Tiger Courtroom Trial Script Pages Surface',
    slug: 'leak-event-daredevil-born-again-script-leak',
    description: 'Classified script sides for a courtroom sequence involving Hector Ayala (White Tiger) were inadvertently posted to an open talent audition server.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'CONFIRMED',
    publishedAt: '2024-01-22T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Courtroom defense attorney bench with law books and wooden gavel',
    movie: ['daredevil-born-again'],
    characters: ['daredevil'],
    tags: ['Daredevil', 'White Tiger', 'Script Leak', 'Audition Sides'],
    spoilerLevel: 'MODERATE',
    claim: 'Four pages of audition dialogue from Daredevil: Born Again detailed Matt Murdock defending Hector Ayala / White Tiger in a high-profile Manhattan criminal trial.',
    firstReportedAt: '2024-01-18',
    lastUpdatedAt: '2024-01-22',
    editorialNote: 'Verified authentic following official trade reports confirming actor Kamar de los Reyes had portrayed Ayala prior to his passing.',
    sources: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com', type: 'TRADE', publishedAt: '2024-01-20' }
    ],
    content: `
## Casting Server Disclosure

In January 2024, audition sides utilized by background casting agencies in New York surfaced on online forums. The pages depicted Matt Murdock delivering an impassioned closing argument regarding the criminalization of street vigilantes who protect underserved communities when formal law enforcement fails.

The scene confirmed that the creative overhaul directed by Dario Scardapane, Justin Benson, and Aaron Moorhead had returned courtroom drama to the heart of the series.
`
  },
  {
    title: 'LEAK EVENT: Thunderbolts* Subterranean Lab Storyboards Leaked Online',
    slug: 'leak-event-thunderbolts-lab-storyboards-leak',
    description: 'Hand-drawn action continuity storyboards detailing the bunker shootout between Yelena Belova and covert operatives leaked to social media.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'LEAK',
    publishedAt: '2024-10-14T11:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Black and white hand-drawn storyboard frames of gun duel on soundstage',
    movie: ['thunderbolts'],
    characters: ['yelena-belova'],
    tags: ['Storyboards', 'Thunderbolts Leak', 'Action Continuity', 'Yelena Belova'],
    spoilerLevel: 'MILD',
    claim: 'Six frame sequences of hand-drawn action storyboards depicting Yelena Belova, U.S. Agent, and Ghost converging on an underground vault were posted anonymously to Reddit.',
    firstReportedAt: '2024-10-10',
    lastUpdatedAt: '2024-10-14',
    editorialNote: 'The visual flow matched the exact camera choreography later showcased in Marvel\'s official teaser trailer.',
    sources: [
      { name: 'Reddit r/MarvelStudiosSpoilers', url: 'https://reddit.com', type: 'RUMOR', publishedAt: '2024-10-10' }
    ],
    content: `
## Action Continuity Leak Analysis

Production storyboards mapping out the kinetic elevator shaft and bunker breach sequences in *Thunderbolts\** circulated briefly online before Marvel\'s legal team issued takedown orders.

### Forensic Verification

When Marvel Studios released its official teaser trailer in late September 2024, shot-for-shot compositions of Florence Pugh dropping through ceiling vents perfectly matched the leaked penciled frames, proving the leaked document was an authentic animatic planning sheet.
`
  },
  {
    title: 'LEAK EVENT: Alleged Avengers: Doomsday Drone Surveillance Over Eastern European Exterior Sets',
    slug: 'leak-event-doomsday-drone-surveillance-eastern-europe',
    description: 'Hobbyist drone operators in the Carpathian Mountains claimed to spot Latverian border outpost sets under construction.',
    category: 'LEAK',
    type: 'LEAK',
    status: 'DEBUNKED',
    publishedAt: '2025-02-10T14:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Snow-capped mountain pass with wooden boundary barrier in distance',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom'],
    tags: ['Drone Surveillance', 'Carpathians', 'Debunked Leak', 'Doomsday Location'],
    spoilerLevel: 'NONE',
    claim: 'Viral video footage claimed to capture active Marvel construction crews erecting a Castle Doom border crossing checkpoint in the Romanian Carpathians.',
    firstReportedAt: '2025-02-04',
    lastUpdatedAt: '2025-02-10',
    editorialNote: 'Local municipal film commissions verified the set belonged to an unrelated European historical fantasy series.',
    sources: [
      { name: 'Romania Film Commission Public Ledger', url: 'https://romaniafilm.ro', type: 'OFFICIAL', publishedAt: '2025-02-08' }
    ],
    content: `
## Investigation into Carpathian Outpost Claims

A widely circulated video claimed to provide our first glimpse of practical Latverian border architecture for *Avengers: Doomsday*.

### The Facts Behind the Footage

Official inquiries made to the regional Romanian Film Commission revealed that the construction site belonged to a medieval fantasy television production financed by European broadcasters, completely unaffiliated with Disney or Marvel Studios. Rated **DEBUNKED** by 616 Intel.
`
  }
];

for (const art of leakArticles) {
  writeArticle(art, art.content);
}

console.log(`Successfully generated ${leakArticles.length} leak investigation articles.`);
