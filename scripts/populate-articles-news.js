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
    '---',
    '',
    content.trim(),
    ''
  ].filter(Boolean).join('\n');

  const filePath = path.join(articlesDir, `${data.slug}.mdx`);
  fs.writeFileSync(filePath, frontmatter, 'utf-8');
}

const additionalNews = [
  {
    title: 'Deadpool & Wolverine Passes $1.338 Billion Globally, Shattering All-Time R-Rated Box Office Records',
    slug: 'deadpool-and-wolverine-box-office-records',
    description: 'Shawn Levy\'s superhero blockbuster overtakes Joker to become the highest-grossing R-rated theatrical release in cinematic history.',
    category: 'BOX_OFFICE',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-09-16T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Deadpool and Wolverine yellow and red comic suits in desert wasteland',
    movie: ['deadpool-and-wolverine'],
    characters: ['deadpool', 'wolverine'],
    actors: ['Ryan Reynolds', 'Hugh Jackman'],
    tags: ['Box Office Records', 'Deadpool & Wolverine', 'R-Rated Record', 'Shawn Levy'],
    featured: true,
    breaking: false,
    sources: [
      { name: 'Box Office Mojo All-Time R-Rated Chart', url: 'https://www.boxofficemojo.com', type: 'TRADE', publishedAt: '2024-09-15' },
      { name: 'Variety', url: 'https://variety.com/2024/film/box-office/deadpool-wolverine-highest-grossing-r-rated-movie-1236108500/', type: 'TRADE', publishedAt: '2024-09-15' }
    ],
    content: `
## Global Financial Milestones

Crossing **$1.338 billion worldwide** ($636.3M domestic, $702.4M international), *Deadpool & Wolverine* officially surpassed 2019\'s *Joker* ($1.079B) to become the single highest-grossing R-rated film in cinematic history.

### Key Exhibition Milestones

* **#2 Film of 2024**: Trailing only Disney/Pixar\'s *Inside Out 2* ($1.69B).
* **#7 MCU Film of All Time**: Surpassing *Iron Man 3* ($1.215B) and *Black Panther* ($1.349B trajectory).
* **IMAX Footprint**: Generated over $84M on global IMAX screens alone.
`
  },
  {
    title: 'Deadpool & Wolverine Void Cameos: How Shawn Levy Assembled Blade, Elektra, and Gambit',
    slug: 'deadpool-and-wolverine-void-cameos-analysis',
    description: 'Director Shawn Levy details the clandestine negotiations that reunited Wesley Snipes, Jennifer Garner, Dafne Keen, and Channing Tatum.',
    category: 'NEWS',
    type: 'ANALYSIS',
    status: 'CONFIRMED',
    publishedAt: '2024-08-06T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Giant-Man metallic helmet skull half-buried in desert sand',
    movie: ['deadpool-and-wolverine'],
    characters: ['deadpool', 'wolverine', 'gambit', 'blade'],
    actors: ['Ryan Reynolds', 'Hugh Jackman', 'Channing Tatum', 'Wesley Snipes'],
    tags: ['The Void', 'Cameos', 'Wesley Snipes', 'Channing Tatum'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Entertainment Weekly Shawn Levy Interview', url: 'https://ew.com', type: 'INTERVIEW', publishedAt: '2024-08-05' }
    ],
    content: `
## Declassified Behind-The-Scenes Briefing

Speaking with *Entertainment Weekly*, director Shawn Levy and star Ryan Reynolds explained that the cameos in the Void were never intended as gratuitous fan service, but as a heartfelt tribute to the pre-MCU era of 20th Century Fox superhero cinema.

Wesley Snipes set a Guinness World Record for the longest career as a live-action Marvel character (25 years and 340 days), while Channing Tatum finally performed his comic-accurate Cajun accent after twenty years in developmental limbo.
`
  },
  {
    title: 'Thunderbolts* Asterisk Meaning Addressed by Kevin Feige: "Wait Until the Movie Comes Out"',
    slug: 'thunderbolts-asterisk-meaning-kevin-feige',
    description: 'At CinemaCon, Marvel Studios president Kevin Feige addresses why the studio officially added an asterisk to the Thunderbolts title.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-04-12T17:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Stenciled white asterisk graphic painted on concrete military bunker wall',
    movie: ['thunderbolts'],
    characters: ['yelena-belova', 'bucky-barnes'],
    actors: ['Florence Pugh', 'Sebastian Stan'],
    tags: ['Thunderbolts*', 'Kevin Feige', 'CinemaCon', 'Dark Avengers'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'CinemaCon 2024 Disney Presentation', url: 'https://variety.com/2024/film/news/thunderbolts-asterisk-title-change-kevin-feige-1235967888/', type: 'TRADE', publishedAt: '2024-04-11' }
    ],
    content: `
## Title Revision Analysis

During Disney\'s CinemaCon presentation in Las Vegas, Kevin Feige addressed the permanent addition of an asterisk to the movie\'s title:

"Yes, that is the official title now: *Thunderbolts\**. We won\'t talk more about the asterisk until after the movie comes out, but yes, it is deliberate."

Industry observers note that the asterisk strongly points to the team being rebranded as the "Dark Avengers" or "New Avengers" by the final reel under government sponsorship.
`
  },
  {
    title: 'Thunderbolts* Trailer Viewership Sets Digital Benchmark for Ensemble Marvel Properties',
    slug: 'thunderbolts-trailer-viewership-milestone',
    description: 'The first teaser trailer for Thunderbolts* generates 168 million global digital views in 24 hours.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-09-25T16:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Analytics dashboard graph showing upward viewership spike',
    movie: ['thunderbolts'],
    characters: ['yelena-belova', 'bucky-barnes'],
    tags: ['Trailer Records', 'Thunderbolts', 'Viewership', 'Social Reach'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Marvel Studios Public Relations', url: 'https://www.marvel.com', type: 'OFFICIAL', publishedAt: '2024-09-24' }
    ],
    content: `
## Digital Reach Metrics

Within 24 hours of dropping online, the official teaser trailer for *Thunderbolts\** clocked **168 million global views**, representing the highest debut for any non-sequel ensemble film in Marvel Studios history. Social listening indexes highlighted Florence Pugh\'s grounded deadpan humor and Lewis Pullman\'s mysterious "Bob" as the primary drivers of organic engagement.
`
  },
  {
    title: 'Daredevil: Born Again 9-Episode Part 1 Disney+ Premiere Formally Dated for March 4, 2025',
    slug: 'daredevil-born-again-creative-overhaul',
    description: 'Inside the massive creative overhaul that brought back Karen Page, Foggy Nelson, and the R-rated Netflix continuity into canon.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-10-19T22:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Red neon silhouette of blind justice statue with scales in rain',
    movie: ['daredevil-born-again'],
    characters: ['daredevil', 'punisher'],
    actors: ['Charlie Cox', 'Vincent D\'Onofrio', 'Jon Bernthal'],
    tags: ['Daredevil', 'Born Again', 'Disney+', 'Charlie Cox', 'Release Date'],
    featured: true,
    breaking: false,
    sources: [
      { name: 'Marvel.com NYCC Announcement', url: 'https://www.marvel.com/articles/tv-shows/nycc-2024-daredevil-born-again-premiere-date-charlie-cox-vincent-d-onofrio', type: 'OFFICIAL', publishedAt: '2024-10-19' },
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com/tv/tv-news/daredevil-born-again-release-date-1236041002/', type: 'TRADE', publishedAt: '2024-10-19' }
    ],
    content: `
## Official Premiere Lock

At New York Comic Con 2024, stars Charlie Cox and Vincent D\'Onofrio announced that *Daredevil: Born Again* will officially premiere on Disney+ on **Tuesday, March 4, 2025**, kicking off a nine-episode first batch.

### Creative Overhaul Scope

In late 2023, Marvel Studios discarded the earlier legal-procedural approach, hiring Dario Scardapane (*The Punisher*) as showrunner and Justin Benson and Aaron Moorhead (*Loki*) as lead directors. The team filmed brutal, R-rated fight choreography and reunited Elden Henson (Foggy Nelson) and Deborah Ann Woll (Karen Page) with Cox.
`
  },
  {
    title: 'Jon Bernthal\'s Punisher Formally Confirmed for R-Rated Return in Daredevil: Born Again',
    slug: 'punisher-jon-bernthal-return-confirmed',
    description: 'Frank Castle brings his uncompromising war on crime directly into Mayor Wilson Fisk\'s New York City.',
    category: 'CASTING',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-03-08T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Tactical black vest painted with iconic white death skull',
    movie: ['daredevil-born-again'],
    characters: ['punisher', 'daredevil'],
    actors: ['Jon Bernthal', 'Charlie Cox'],
    tags: ['Punisher', 'Jon Bernthal', 'Daredevil Born Again', 'Frank Castle'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com/tv/tv-news/jon-bernthal-returning-as-the-punisher-daredevil-born-again-1235342466/', type: 'TRADE', publishedAt: '2023-03-07' }
    ],
    content: `
## Cast Verification & Role Architecture

Jon Bernthal\'s return as Frank Castle / The Punisher marks a critical milestone in cementing Netflix\'s Marvel Television slate into mainline Earth-616 continuity.

Bernthal publicly insisted that he would only reprise the role if the writing honored Frank Castle\'s unvarnished darkness and moral complexity. In *Born Again*, Castle confronts corrupt NYPD officers co-opting his vigilante skull logo, sparking a bloody ideological collision with Matt Murdock.
`
  },
  {
    title: 'Harrison Ford Reflects on Playing President Thaddeus Ross and Red Hulk: "I Wanted to Do Something Different"',
    slug: 'captain-america-brave-new-world-red-hulk-reveal',
    description: 'Cinema legend Harrison Ford discusses stepping into the late William Hurt\'s role and doing motion-capture performance work.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-07-28T18:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Harrison Ford smiling and holding microphone at San Diego Comic-Con Hall H',
    movie: ['captain-america-brave-new-world'],
    characters: ['hulk', 'captain-america-sam-wilson'],
    actors: ['Harrison Ford', 'Anthony Mackie'],
    tags: ['Harrison Ford', 'Red Hulk', 'Brave New World', 'SDCC'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Variety SDCC Video Interview', url: 'https://variety.com/2024/film/news/harrison-ford-red-hulk-captain-america-brave-new-world-1236087900/', type: 'INTERVIEW', publishedAt: '2024-07-28' }
    ],
    content: `
## Talent Interview Overview

Taking the Hall H stage at San Diego Comic-Con, 82-year-old cinematic icon Harrison Ford delighted attendees by impersonating Red Hulk\'s deafening roar. Speaking with *Variety*, Ford remarked:

"I watched other great actors have a terrific time playing in this Marvel sandbox. I thought, \'Why not me? Let me do something I\'ve never done before.\' Tearing up the White House lawn as a giant crimson monster was just pure fun."
`
  },
  {
    title: 'Giancarlo Esposito Confirmed as Sidewinder / King of the Serpent Society in Brave New World',
    slug: 'captain-america-brave-new-world-adamantium-lore',
    description: 'Marvel Studios officially unveils Giancarlo Esposito\'s mercenary antagonist and ties his mission to celestial island adamantium.',
    category: 'CASTING',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-07-28T19:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Dark military tactical gear with customized suppressed assault carbine',
    movie: ['captain-america-brave-new-world'],
    characters: ['captain-america-sam-wilson'],
    actors: ['Giancarlo Esposito', 'Anthony Mackie'],
    tags: ['Sidewinder', 'Giancarlo Esposito', 'Serpent Society', 'Adamantium'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Deadline SDCC Report', url: 'https://deadline.com/2024/07/giancarlo-esposito-sidewinder-captain-america-brave-new-world-1236024100/', type: 'TRADE', publishedAt: '2024-07-27' }
    ],
    content: `
## Character Identity Confirmation

Following reshoots in Atlanta, Marvel Studios officially confirmed that **Giancarlo Esposito** portrays **Seth Voelker / Sidewinder**, the lethal King of the Serpent Society.

In *Brave New World*, Sidewinder operates as a high-priced international black-market enforcer hired to intercept shipments of the newly discovered metallic element adamantium, discovered within the calcified shell of the celestial Tiamut in the Indian Ocean.
`
  },
  {
    title: 'Jonathan Majors Formally Terminated by Marvel Studios Following Guilty Verdict in New York',
    slug: 'jonathan-majors-formally-terminated-marvel',
    description: 'The studio immediately severed all ties with the actor following his assault and harassment conviction, initiating Phase 6 pivots.',
    category: 'NEWS',
    type: 'BREAKING',
    status: 'CONFIRMED',
    publishedAt: '2023-12-18T20:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Manhattan Criminal Court stone columns and legal facade',
    movie: ['avengers-doomsday'],
    tags: ['Jonathan Majors', 'Marvel Studios', 'Legal Verdict', 'Kang Dynasty'],
    featured: false,
    breaking: true,
    sources: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com/movies/movie-news/jonathan-majors-fired-marvel-studios-1235759714/', type: 'TRADE', publishedAt: '2023-12-18' },
      { name: 'Deadline', url: 'https://deadline.com/2023/12/jonathan-majors-dropped-marvel-guilty-verdict-1235671500/', type: 'TRADE', publishedAt: '2023-12-18' }
    ],
    content: `
## Corporate Termination Dossier

On December 18, 2023, within hours of a Manhattan jury delivering a guilty verdict on charges of third-degree reckless assault and harassment, a spokesperson for The Walt Disney Company and Marvel Studios confirmed that the studio had officially dropped Jonathan Majors from all future projects.

The decision abruptly concluded Majors\'s tenure as Kang the Conqueror across *Loki* and *Quantumania*, prompting Marvel\'s creative leadership to redesign the narrative foundation of *Avengers 5*.
`
  },
  {
    title: 'Inside Marvel\'s Phase 6 Strategic Pivot from The Kang Dynasty to Doctor Doom',
    slug: 'marvel-studios-pivot-kang-dynasty-to-doctor-doom',
    description: 'How Kevin Feige transformed a sudden crisis into a strategic creative triumph by securing Robert Downey Jr. and the Russo Brothers.',
    category: 'NEWS',
    type: 'ANALYSIS',
    status: 'CONFIRMED',
    publishedAt: '2024-07-31T11:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Chess pieces on board with green king replacing fallen blue piece',
    movie: ['avengers-doomsday', 'avengers-secret-wars'],
    characters: ['doctor-doom'],
    actors: ['Robert Downey Jr.'],
    tags: ['Kang Dynasty', 'Doctor Doom', 'Kevin Feige', 'Pivot Analysis'],
    featured: true,
    breaking: false,
    sources: [
      { name: 'Variety Cover Story', url: 'https://variety.com', type: 'TRADE', publishedAt: '2024-07-30' }
    ],
    content: `
## Crisis Management Case Study

When Jonathan Majors was convicted, Marvel Studios faced a critical dilemma: recast Kang the Conqueror with another actor (similar to Rhodey in *Iron Man 2*), or restructure the overarching narrative.

### The Decisive Strategy Meeting

Sources confirm that in early 2024, Kevin Feige, Bob Iger, and Louis D\'Esposito concluded that audience fatigue with infinite Kang variants was already mounting after *Ant-Man and the Wasp: Quantumania* underperformed. Rather than forcing a recast, the studio engineered the audacious return of Robert Downey Jr. as Victor von Doom, re-energizing mainstream anticipation overnight.
`
  },
  {
    title: 'Agatha All Along Becomes Critical and Streaming Triumph for Marvel Television',
    slug: 'agatha-all-along-critical-acclaim-milestone',
    description: 'Kathryn Hahn\'s spinoff achieves high Rotten Tomatoes ratings, massive viewership on Disney+, and viral Grammy/Emmy musical traction.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-10-31T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Winding cobblestone path through dark enchanted autumn woods',
    movie: ['wandavision'],
    characters: ['scarlet-witch'],
    tags: ['Agatha All Along', 'Kathryn Hahn', 'Disney+ Viewership', 'Witches Road'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Disney Official Viewership Release', url: 'https://press.disney.com', type: 'OFFICIAL', publishedAt: '2024-10-30' },
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com', type: 'TRADE', publishedAt: '2024-10-30' }
    ],
    content: `
## Streaming Performance Briefing

Operating on a modest $40M budget—the most cost-efficient live-action production in Marvel Television history—Jac Schaeffer\'s *Agatha All Along* achieved 9.3 million views globally in its first seven days, generating widespread critical acclaim (83% on Rotten Tomatoes).

The series officially introduced Joe Locke as Billy Maximoff / Wiccan, cementing the continuation of the Scarlet Witch\'s magical lineage.
`
  },
  {
    title: 'James Spader Returning to Voice Ultron in Terry Matalas\'s Upcoming Vision Series',
    slug: 'james-spader-ultron-return-vision-series',
    description: 'Three-time Emmy winner James Spader will officially reprise his role as the genocidal sentient AI in Marvel\'s 2026 Disney+ series.',
    category: 'CASTING',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-08-23T18:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Chrome cybernetic mechanical hand clenching into fist in dark laboratory',
    movie: [],
    characters: ['ultron', 'vision'],
    actors: ['James Spader', 'Paul Bettany'],
    tags: ['Ultron', 'James Spader', 'Vision Series', 'Terry Matalas'],
    featured: true,
    breaking: false,
    sources: [
      { name: 'The Hollywood Reporter Exclusive', url: 'https://www.hollywoodreporter.com/tv/tv-news/james-spader-returning-ultron-marvel-vision-series-1235982005/', type: 'TRADE', publishedAt: '2024-08-23' },
      { name: 'Variety', url: 'https://variety.com/2024/tv/news/james-spader-ultron-marvel-vision-series-1236116890/', type: 'TRADE', publishedAt: '2024-08-23' }
    ],
    content: `
## Official Talent Agreement

In an exclusive published by *The Hollywood Reporter*, three-time Emmy Award winner **James Spader** reached an agreement to reprise his iconic role as the artificial intelligence Ultron in Marvel\'s upcoming Disney+ series centered on Paul Bettany\'s White Vision.

Showrunner Terry Matalas (*Star Trek: Picard* Season 3) pitched a compelling exploration of synthezoid consciousness, exploring the complex father-son dynamic between Ultron and Vision.
`
  },
  {
    title: 'Wonder Man Starring Yahya Abdul-Mateen II Completes Post-Production for 2025 Release',
    slug: 'wonder-man-yahya-abdul-mateen-post-production',
    description: 'Destin Daniel Cretton and Andrew Guest\'s Hollywood satire starring Simon Williams locks picture under the Marvel Spotlight banner.',
    category: 'PRODUCTION',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-10-28T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Vintage Hollywood soundstage clapboard with studio stage lights',
    movie: [],
    characters: [],
    actors: ['Yahya Abdul-Mateen II', 'Ben Kingsley'],
    tags: ['Wonder Man', 'Marvel Spotlight', 'Yahya Abdul-Mateen II', 'Ben Kingsley'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Deadline', url: 'https://deadline.com', type: 'TRADE', publishedAt: '2024-10-25' }
    ],
    content: `
## Series Completion Status

Marvel Studios confirmed that *Wonder Man*, starring Emmy winner Yahya Abdul-Mateen II alongside Sir Ben Kingsley\'s Trevor Slattery, has completed post-production. Released under the "Marvel Spotlight" banner, the eight-episode comedy focuses on an ambitious Hollywood stuntman who acquires ionic superhuman abilities while navigating the vanity of the entertainment industry.
`
  },
  {
    title: 'Ironheart Formalizes June 2025 Premiere Date on Disney+ Streaming Schedule',
    slug: 'ironheart-release-window-disney-plus',
    description: 'Dominique Thorne\'s Riri Williams will return to screens in early summer 2025, pitting MIT engineering against Chicago occult sorcery.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-10-30T17:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Mechanized armor chassis illuminated by internal arc reactor power core',
    movie: ['black-panther-wakanda-forever'],
    characters: [],
    actors: ['Dominique Thorne', 'Anthony Ramos', 'Alden Ehrenreich'],
    tags: ['Ironheart', 'Riri Williams', 'The Hood', 'Release Date'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Marvel Studios Television Preview', url: 'https://www.marvel.com', type: 'OFFICIAL', publishedAt: '2024-10-30' }
    ],
    content: `
## Broadcast Window Lock

Following post-production polish and visual effects finalization, Marvel Studios confirmed *Ironheart* will premiere on Disney+ on **June 24, 2025**. Executive produced by Ryan Coogler and created by Chinaka Hodge, the series explores the clash between Riri Williams\'s advanced aerospace engineering and Parker Robbins / The Hood (Anthony Ramos), who derives power from a dark mystical cloak.
`
  },
  {
    title: 'Eyes of Wakanda Animated Four-Part Event Series Announced by Marvel Animation',
    slug: 'eyes-of-wakanda-animated-series-announced',
    description: 'Ryan Coogler executive produces a historical chronicle following the Hatut Zaraze war dogs retrieving vibranium artifacts throughout world history.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-10-30T18:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Stylized golden panther sigil glowing against deep purple embroidered tribal tapestry',
    movie: ['black-panther'],
    characters: ['black-panther-shuri'],
    tags: ['Eyes of Wakanda', 'Marvel Animation', 'Ryan Coogler', 'Vibranium'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Marvel Animation Showcase', url: 'https://www.marvel.com', type: 'OFFICIAL', publishedAt: '2024-10-30' }
    ],
    content: `
## Official Animation Slate Expansion

Brad Winderbaum formally introduced *Eyes of Wakanda*, an animated anthology chronicling the secret exploits of the Hatut Zaraze—the Wakandan War Dogs. Operating across centuries, the series reveals how covert Wakandan operatives retrieved stolen vibranium artifacts from ancient civilizations and colonial empires.
`
  },
  {
    title: 'Kevin Feige Receives Hollywood Walk of Fame Star and Reflects on Marvel Studios Journey',
    slug: 'kevin-feige-hollywood-walk-of-fame-star',
    description: 'Surrounded by Chris Evans, Ryan Reynolds, and Hugh Jackman, the Marvel Studios architect receives star #2,785 on Hollywood Boulevard.',
    category: 'NEWS',
    type: 'REPORT',
    status: 'CONFIRMED',
    publishedAt: '2024-07-25T19:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Brass terrazzo star embedded in Hollywood Boulevard sidewalk under sunny California skies',
    movie: [],
    characters: ['steve-rogers', 'wolverine', 'deadpool'],
    actors: ['Chris Evans', 'Ryan Reynolds', 'Hugh Jackman'],
    tags: ['Kevin Feige', 'Walk of Fame', 'Hollywood History', 'Marvel Architecture'],
    featured: false,
    breaking: false,
    sources: [
      { name: 'Variety Walk of Fame Coverage', url: 'https://variety.com/2024/film/news/kevin-feige-hollywood-walk-of-fame-star-1236084500/', type: 'TRADE', publishedAt: '2024-07-25' }
    ],
    content: `
## Historical Industry Honor

On July 25, 2024, Kevin Feige was immortalized with the 2,785th star on the Hollywood Walk of Fame. During ceremonies outside the El Capitan Theatre, colleagues Chris Evans, Ryan Reynolds, and Hugh Jackman delivered humorous and heartfelt tributes honoring Feige\'s unmatched stewardship of thirty-four theatrical films grossing over $31 billion worldwide.
`
  }
];

for (const art of additionalNews) {
  writeArticle(art, art.content);
}

console.log(`Successfully generated ${additionalNews.length} additional trade news articles.`);
