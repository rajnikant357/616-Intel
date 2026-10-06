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

const rumorArticles = [
  {
    title: 'RUMOR: Spider-Man 4 Symbiote Shard Bonding Rumored to Trigger Black Suit Era',
    slug: 'rumor-spiderman-brand-new-day-symbiote-suit',
    description: 'Scoop reporters claim the symbiote shard left behind by Eddie Brock in Mexico will bond with Peter Parker in Spider-Man: Brand New Day.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-01-20T14:00:00.000Z',
    updatedAt: '2025-02-10T11:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Dark liquid obsidian tendrils extending across red spider emblem',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man'],
    actors: ['Tom Holland'],
    tags: ['Symbiote', 'Black Suit', 'Venom', 'Spider-Man Rumor'],
    spoilerLevel: 'MILD',
    claim: 'The sentient black symbiote droplet left behind in the No Way Home post-credits scene will bond with Peter Parker mid-film to amplify his physical aggression against Tombstone\'s syndicates.',
    firstReportedAt: '2024-11-15',
    lastUpdatedAt: '2025-02-10',
    evidence: [
      'The post-credits scene of Spider-Man: No Way Home explicitly established a living piece of Venom\'s alien matter on Earth-616.',
      'Tom Holland has publicly expressed enthusiasm for exploring Peter Parker\'s darker psychological states in interviews.'
    ],
    counterEvidence: [
      'Destin Daniel Cretton and Sony production insiders indicate Brand New Day prioritizes grounded physical martial arts against street mobs over alien symbiote effects.',
      'Sony\'s proprietary Venom franchise has kept strict separation of symbiote mechanics under Amy Pascal.'
    ],
    editorialNote: 'While the narrative setup exists, multiple sources report Marvel Studios may reserve the actual black suit bonding for Avengers: Secret Wars, paying homage to the 1984 comic origin.',
    sources: [
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2024-11-15' },
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'NEWS', publishedAt: '2024-11-16' }
    ],
    content: `
## The Unverified Claim

A widely circulated scoop asserts that *Spider-Man: Brand New Day* will introduce the MCU\'s first canonical black symbiote suit. The claim alleges that Peter Parker, struggling with exhaustion and isolation in his cold-water Manhattan flat, encounters the surviving alien shard to gain an unfair edge against syndicate enforcers.

### Evidence & Track Record

* The mid-credits scene of *Spider-Man: No Way Home* unambiguously left a moving fragment of the Venom symbiote at a Mexican resort bar counter.
* The emotional state of Peter Parker post-*No Way Home* (grief-stricken, forgotten, vulnerable) provides ideal psychological vulnerability for alien bonding.

### Counter-Evidence & Industry Realities

Sony Pictures and Destin Daniel Cretton have repeatedly stressed that *Brand New Day* aims to strip away high-tech and cosmic interventions in favor of visceral Queens alleyway brawls. Introducing full symbiote mechanics risks repeating the overstuffed narrative flaws of *Spider-Man 3*.

### 616 Intel Intelligence Verdict: **RUMORED / UNVERIFIED**

Our intelligence suggests the symbiote shard will receive a narrative reference or post-credits setup, but the full Black Suit storyline remains earmarked for *Secret Wars*.
`
  },
  {
    title: 'RUMOR: Sadie Sink in Discussions for Mystery Role in Spider-Man: Brand New Day',
    slug: 'rumor-sadie-sink-spiderman-brand-new-day',
    description: 'Stranger Things breakout Sadie Sink is reportedly circling a pivotal role in Spider-Man 4, sparking debate between Felicia Hardy and Jean Grey.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-02-04T16:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Auburn-haired silhouette framed by soft studio rim lighting',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man'],
    actors: ['Tom Holland'],
    tags: ['Sadie Sink', 'Black Cat', 'Felicia Hardy', 'Casting Rumor'],
    spoilerLevel: 'NONE',
    claim: 'Sadie Sink has engaged in preliminary casting discussions with Sony and Marvel for either Felicia Hardy (Black Cat) or collegiate companion Gwen Stacy.',
    firstReportedAt: '2025-01-28',
    lastUpdatedAt: '2025-02-04',
    evidence: [
      'Production trackers reported agency meetings between Sink\'s representatives and Sony casting director Sarah Finn.',
      'Sink will wrap Stranger Things Season 5 in late 2024, clearing her schedule for summer 2025 shoots.'
    ],
    counterEvidence: [
      'Neither Marvel Studios nor Sony Pictures has formally acknowledged meetings.',
      'Alternative scoops suggest Sink was approached for an X-Men mutant role rather than Spider-Man.'
    ],
    editorialNote: 'Sink is among Hollywood\'s most sought-after young stars; while meetings occurred, character specifics remain closely guarded.',
    sources: [
      { name: 'Giant Freakin Robot', url: 'https://giantfreakinrobot.com', type: 'RUMOR', publishedAt: '2025-01-28' },
      { name: 'The DisInsider', url: 'https://thedisinsider.com', type: 'RUMOR', publishedAt: '2025-01-29' }
    ],
    content: `
## The Unverified Claim

Online reports claim *Stranger Things* star **Sadie Sink** is in advanced talks to join Tom Holland in *Spider-Man: Brand New Day*. Speculation centers primarily on cat burglar **Felicia Hardy (Black Cat)** or an alternate Earth collegiate iteration of Gwen Stacy.

### Analysis of the Scoop

Casting Black Cat in *Brand New Day* aligns cleanly with Peter Parker\'s street-level trajectory: an antihero romance that entices Spider-Man while knowing nothing of Peter Parker. However, agency sources caution that general general-meeting rosters frequently get conflated with active negotiations.
`
  },
  {
    title: 'RUMOR: Mark Ruffalo\'s Hulk Slated for Street-Level Confrontation in Spider-Man 4',
    slug: 'rumor-spiderman-hulk-trailer-leak-claims',
    description: 'Unverified online claims allege Bruce Banner / Hulk will appear as a government-sanctioned countermeasure against Spider-Man in NYC.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'DEBUNKED',
    publishedAt: '2025-02-18T10:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Emerald green shockwave radiating across fractured concrete road',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man', 'hulk'],
    actors: ['Tom Holland', 'Mark Ruffalo'],
    tags: ['Hulk', 'Spider-Man 4', 'Debunked', 'Mark Ruffalo'],
    spoilerLevel: 'MILD',
    claim: 'Mark Ruffalo filmed secret sequences where Smart Hulk is dispatched under President Ross\'s orders to bring Spider-Man in for questioning.',
    firstReportedAt: '2025-02-12',
    lastUpdatedAt: '2025-02-18',
    evidence: [
      'Social media accounts claimed to see Ruffalo in Queens during pre-rigging dates.'
    ],
    counterEvidence: [
      'Sony Pictures and Marvel contract documents show Ruffalo is not attached to Brand New Day.',
      'Mark Ruffalo was confirmed on location in Europe filming an independent drama during the rumored dates.'
    ],
    editorialNote: 'This rumor originated from an unverified Reddit leak post and has been credibly dismissed by trade reporters.',
    sources: [
      { name: 'Reddit r/MarvelStudiosSpoilers', url: 'https://reddit.com/r/marvelstudiosspoilers', type: 'RUMOR', publishedAt: '2025-02-12' },
      { name: 'Gizmodo / io9', url: 'https://gizmodo.com', type: 'NEWS', publishedAt: '2025-02-16' }
    ],
    content: `
## The Debunked Scoop

A viral social media claim alleged that Mark Ruffalo would appear in *Spider-Man: Brand New Day* as Smart Hulk, serving as a tactical bridge connecting *Captain America: Brave New World*\'s presidential fallout to Peter Parker\'s neighborhood vigilantism.

### The Reality Check

Investigations by trade journalists confirm Ruffalo was never signed or approached for the project. The actor was actively shooting director Bong Joon Ho\'s commitments and European theater workshops throughout the alleged timeframe.
`
  },
  {
    title: 'RUMOR: Spider-Man: Brand New Day VMax & IMAX Theatrical Teaser Debut Window',
    slug: 'rumor-spiderman-brand-new-day-vmax-trailer-leak',
    description: 'Cinema projectionist forums claim Sony has prepared a 90-second theatrical teaser trailer attached to major summer 2025 releases.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-03-01T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'IMAX digital projector lens illuminated inside projection booth',
    movie: ['spiderman-brand-new-day'],
    characters: ['spider-man'],
    tags: ['IMAX', 'VMax', 'Trailer Leak', 'Exhibition Rumor'],
    spoilerLevel: 'NONE',
    claim: 'Sony Pictures has scheduled the first official 90-second teaser trailer of Brand New Day to premiere exclusively in IMAX and VMax auditoriums with The Fantastic Four: First Steps in July 2025.',
    firstReportedAt: '2025-02-25',
    lastUpdatedAt: '2025-03-01',
    evidence: [
      'Sony traditionally attaches high-profile Spider-Man teasers to major July Marvel theatrical releases.'
    ],
    counterEvidence: [
      'Brand New Day only begins primary photography in mid-2025, leaving minimal finished footage for a July teaser.'
    ],
    editorialNote: 'A title announcement card or behind-the-scenes sizzle reel is plausible, but a fully cut teaser with finished VFX is improbable.',
    sources: [
      { name: 'Trailer Track', url: 'https://trailertrack.com', type: 'NEWS', publishedAt: '2025-02-26' }
    ],
    content: `
## Trailer Timeline Analysis

Exhibition insiders have speculated that Sony will leverage the massive theatrical footprint of *The Fantastic Four: First Steps* on July 25, 2025, to drop the first official look at *Spider-Man: Brand New Day*. While a production sizzle reel is possible, finished VFX footage will not be ready until late autumn 2025.
`
  },
  {
    title: 'RUMOR: Spider-Man 4 Post-Credits Scene Directly Bridges Into Avengers: Doomsday',
    slug: 'rumor-spiderman-brand-new-day-post-credits-doomsday',
    description: 'Whispers from script review sessions claim Peter Parker receives an urgent distress summons regarding Doctor Doom in the finale.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'UNVERIFIED',
    publishedAt: '2025-03-15T12:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Dark Sanctum Sanctorum doorway glowing with mystical emerald warnings',
    movie: ['spiderman-brand-new-day', 'avengers-doomsday'],
    characters: ['spider-man', 'doctor-doom'],
    actors: ['Tom Holland', 'Robert Downey Jr.'],
    tags: ['Post Credits', 'Doomsday Bridge', 'Spider-Man 4'],
    spoilerLevel: 'MAJOR',
    claim: 'The final scene or post-credits stinger of Spider-Man 4 depicts an incursion tremor shaking Manhattan, followed by a direct distress beacon from Doctor Strange regarding Doctor Doom.',
    firstReportedAt: '2025-03-10',
    lastUpdatedAt: '2025-03-15',
    evidence: [
      'Brand New Day (July 2026) hits theaters just two months after Avengers: Doomsday (May 2026), requiring exact timeline synchronization.'
    ],
    counterEvidence: [
      'Because Brand New Day releases AFTER Doomsday, any setup would connect forward into Secret Wars (May 2027), not backward into Doomsday.'
    ],
    editorialNote: 'The calendar sequence makes this claim chronologically flawed unless Brand New Day is set narratively BEFORE Doomsday.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2025-03-10' }
    ],
    content: `
## Chronological Inconsistency Breakdown

Claims that *Spider-Man: Brand New Day* will feature a post-credits scene setting up *Avengers: Doomsday* fail an elementary calendar check: *Doomsday* releases on **May 1, 2026**, while *Brand New Day* opens on **July 10, 2026**. Any post-credits narrative bridge would logically propel Peter Parker into *Avengers: Secret Wars* (May 2027).
`
  },
  {
    title: 'RUMOR: Hugh Jackman\'s Wolverine in Talks for Crucial Role in Avengers: Doomsday',
    slug: 'rumor-avengers-doomsday-hugh-jackman-wolverine',
    description: 'Following the $1.3B success of Deadpool & Wolverine, Marvel Studios is reportedly working to include Hugh Jackman in Doomsday.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2024-09-18T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Three razor-sharp claw marks slashed through dark metal bulkhead',
    movie: ['avengers-doomsday', 'avengers-secret-wars'],
    characters: ['wolverine', 'doctor-doom'],
    actors: ['Hugh Jackman', 'Robert Downey Jr.'],
    tags: ['Wolverine', 'Hugh Jackman', 'Avengers Doomsday', 'Cameo Rumors'],
    spoilerLevel: 'MILD',
    claim: 'Hugh Jackman has agreed to reprise Wolverine in Avengers: Doomsday for an extended sequence clashing with Doctor Doom\'s forces.',
    firstReportedAt: '2024-09-01',
    lastUpdatedAt: '2024-09-18',
    evidence: [
      'Deadpool & Wolverine\'s historic box office cemented Jackman as Marvel\'s single biggest non-Avengers box office draw.',
      'Jackman has repeatedly stated: "Never say never" regarding future team-ups with the Russo Brothers.'
    ],
    counterEvidence: [
      'The Russo Brothers reportedly want to keep Doomsday focused on Earth-616 and the Fantastic Four, holding massive multiversal mutant cameos for Secret Wars.'
    ],
    editorialNote: 'While Jackman is near-certain for Secret Wars, his participation in Doomsday remains actively debated within Marvel\'s creative committee.',
    sources: [
      { name: 'MyTimeToShineHello', url: 'https://x.com', type: 'RUMOR', publishedAt: '2024-09-01' },
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2024-09-05' }
    ],
    content: `
## The Multiverse Crossover Scoop

Following *Deadpool & Wolverine*\'s global box office domination, insiders report Marvel Studios executives initiated immediate conversations with Hugh Jackman\'s representatives to secure his availability for Pinewood filming in 2025.

### Strategic Distinction: Doomsday vs. Secret Wars

Most verified scoopers agree Jackman is locked for *Secret Wars* (2027). The open question is whether he will make an early appearance in *Doomsday* to establish the collapse of his alternate timeline before Battleworld forms.
`
  },
  {
    title: 'RUMOR: Ryan Reynolds in Discussions for Deadpool Appearance in Avengers: Doomsday',
    slug: 'rumor-avengers-doomsday-ryan-reynolds-deadpool',
    description: 'Could the Merc with a Mouth break the fourth wall in Doomsday? Trade whispers evaluate Ryan Reynolds\'s potential inclusion.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'UNVERIFIED',
    publishedAt: '2024-10-05T14:30:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Deadpool red leather mask tilted quizzically at camera',
    movie: ['avengers-doomsday', 'deadpool-and-wolverine'],
    characters: ['deadpool', 'doctor-doom'],
    actors: ['Ryan Reynolds', 'Robert Downey Jr.'],
    tags: ['Deadpool', 'Ryan Reynolds', 'Avengers Doomsday', 'TVA'],
    spoilerLevel: 'MILD',
    claim: 'Ryan Reynolds will film a cameo sequence for Avengers: Doomsday where the TVA alerts Wade Wilson to reality incursions orchestrated by Doctor Doom.',
    firstReportedAt: '2024-09-25',
    lastUpdatedAt: '2024-10-05',
    evidence: [
      'Deadpool & Wolverine established Wade Wilson\'s connection to the TVA and the mysterious clip of Thor crying over him.'
    ],
    counterEvidence: [
      'Reynolds operates with strict creative control over Deadpool dialogue, which requires dedicated bespoke writing sessions with the Russos.'
    ],
    editorialNote: 'Reynolds\'s inclusion in Secret Wars is widely anticipated, but Doomsday may be too crowded for his specific comedic tone.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2024-09-25' }
    ],
    content: `
## Tone & Continuity Analysis

Integrating Deadpool into an Avengers film presents a delicate calibration challenge: preserving his subversive fourth-wall comedy without undermining the existential drama of Doctor Doom\'s incursion threat. Sources indicate Reynolds and the Russos have brainstormed short interstitial appearances, but no final contract is formalized.
`
  },
  {
    title: 'RUMOR: Alleged Avengers: Doomsday Act 3 Latverian Incursion Plot Outline Leaks Online',
    slug: 'rumor-avengers-doomsday-alleged-plot-breakdown',
    description: 'A purported third-act plot breakdown detailing a full-scale assault on Castle Doom circulates on Reddit forums.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'DEBUNKED',
    publishedAt: '2024-11-04T18:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Gothic castle tower engulfed in lightning storm and green mystical fire',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom', 'mr-fantastic'],
    actors: ['Robert Downey Jr.', 'Pedro Pascal'],
    tags: ['Plot Leak', 'Doomsday', 'Latveria', 'Reddit Leak'],
    spoilerLevel: 'MAJOR',
    claim: 'A detailed 15-page script summary posted on 4chan and Reddit alleged that the Fantastic Four team with Doctor Strange to assault Castle Doom, only for Doom to detonate a timeline bomb creating Battleworld.',
    firstReportedAt: '2024-10-28',
    lastUpdatedAt: '2024-11-04',
    evidence: [
      'The premise borrows heavily from Jonathan Hickman\'s 2015 New Avengers #33 comic run.'
    ],
    counterEvidence: [
      'Stephen McFeely was still actively drafting the first full script draft when the post surfaced.',
      'Internal terminology used in the post matched fan speculation rather than standard Marvel screenplay formatting.'
    ],
    editorialNote: 'Our analysis confirms this document is elaborate fan-fiction masquerading as leaked production notes.',
    sources: [
      { name: 'Reddit r/MarvelStudiosSpoilers', url: 'https://reddit.com', type: 'RUMOR', publishedAt: '2024-10-28' }
    ],
    content: `
## Forensic Dissection of the Purported Script Leak

An anonymous post detailing the entire three-act structure of *Avengers: Doomsday* gained millions of views on social media in late 2024.

### Why the Leak Is Counterfeit

1. **Writing Desk Status**: Stephen McFeely had only commenced his revised draft six weeks prior to the leak; complete third-act dialogue blocks did not yet exist.
2. **Character Inconsistencies**: The document featured dialogue for characters whose contractual status has not been resolved.
3. **Verdict**: Rated **DEBUNKED** by 616 Intel.
`
  },
  {
    title: 'RUMOR: Chris Evans in Secret Talks for Cameo as Steve Rogers Variant in Phase 6',
    slug: 'rumor-avengers-doomsday-chris-evans-steve-rogers-return',
    description: 'Reports claim Chris Evans may make a brief, poignant appearance as an alternate-reality Captain America before Secret Wars concludes.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2024-12-08T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Weathered Captain America shield resting against broken stone pillar',
    movie: ['avengers-doomsday', 'avengers-secret-wars'],
    characters: ['steve-rogers', 'captain-america-sam-wilson'],
    actors: ['Chris Evans', 'Anthony Mackie'],
    tags: ['Chris Evans', 'Steve Rogers', 'Captain America', 'Cameo'],
    spoilerLevel: 'MILD',
    claim: 'Chris Evans has met with the Russo Brothers regarding reprising Steve Rogers in an emotional, brief multiverse sequence in Secret Wars.',
    firstReportedAt: '2024-11-30',
    lastUpdatedAt: '2024-12-08',
    evidence: [
      'Chris Evans proved his willingness to surprise audiences by reprising Johnny Storm in Deadpool & Wolverine (2024).',
      'The Russo Brothers share a close personal and professional relationship with Evans across five films.'
    ],
    counterEvidence: [
      'Evans has repeatedly stated that Steve Rogers\'s Endgame retirement is sacred and must not be undermined casually.'
    ],
    editorialNote: 'If Evans returns, it is almost universally anticipated for Secret Wars rather than Doomsday.',
    sources: [
      { name: 'Deadline', url: 'https://deadline.com', type: 'TRADE', publishedAt: '2024-11-30' }
    ],
    content: `
## Legacy Cameo Analysis

Following his show-stopping appearance as Johnny Storm in *Deadpool & Wolverine*, speculation regarding Chris Evans returning to his signature role as Captain America reached a fever pitch. While Evans has guarded Steve Rogers\'s legacy fiercely, the multiversal nature of *Secret Wars* allows for an alternate variant without tarnishing *Endgame*\'s timeline.
`
  },
  {
    title: 'RUMOR: Thor and Loki Emotional Reunion Planned for the Citadel at the End of Time',
    slug: 'rumor-avengers-doomsday-thor-loki-reunion',
    description: 'Could the God of Thunder finally reunite with the God of Stories? Insiders tease an emotional payoff years in the making.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2024-12-19T11:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Golden lightning meeting vibrant emerald temporal branches in cosmic nexus',
    movie: ['avengers-doomsday', 'avengers-secret-wars', 'loki'],
    characters: ['thor', 'loki'],
    actors: ['Chris Hemsworth', 'Tom Hiddleston'],
    tags: ['Thor', 'Loki', 'Brother Reunion', 'Yggdrasil'],
    spoilerLevel: 'MAJOR',
    claim: 'Avengers: Secret Wars will feature an emotional reunion between Thor and Loki as the multiversal tree Yggdrasil comes under siege from Doctor Doom.',
    firstReportedAt: '2024-12-10',
    lastUpdatedAt: '2024-12-19',
    evidence: [
      'Both Chris Hemsworth and Tom Hiddleston have openly stated in press tours that their characters\' arcs feel incomplete without one final reconciliation.',
      'Kevin Feige cited Loki\'s Season 2 climax as fundamental to the survival of the Multiverse Saga.'
    ],
    counterEvidence: [
      'Tom Hiddleston\'s contractual status for Phase 6 features has not been formally registered on production sheets.'
    ],
    editorialNote: 'This is considered one of Marvel Studios\' highest-priority emotional resolutions for Phase 6.',
    sources: [
      { name: 'Variety', url: 'https://variety.com', type: 'TRADE', publishedAt: '2024-12-12' }
    ],
    content: `
## Narrative Climax Overview

Since Loki\'s demise in *Avengers: Infinity War*, Thor has believed his adopted brother to be permanently deceased. With the 2012 variant evolving into the God of Stories holding the multiverse together, bringing Thor face-to-face with Loki\'s ultimate sacrifice represents one of the most powerful narrative arcs available to the Russo Brothers.
`
  },
  {
    title: 'RUMOR: Elizabeth Olsen Secretly Filming Scarlet Witch Return for Phase 6 Climax',
    slug: 'rumor-avengers-doomsday-scarlet-witch-return',
    description: 'Reports suggest Wanda Maximoff will resurface from the rubble of Mount Wundagore to play a critical role against Doctor Doom.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-01-08T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Crimson hex magic sphere floating over cracked volcanic rocks',
    movie: ['avengers-doomsday', 'avengers-secret-wars'],
    characters: ['scarlet-witch', 'doctor-doom'],
    actors: ['Elizabeth Olsen', 'Robert Downey Jr.'],
    tags: ['Scarlet Witch', 'Wanda Maximoff', 'Elizabeth Olsen', 'Resurrection'],
    spoilerLevel: 'MAJOR',
    claim: 'Elizabeth Olsen has finalized an agreement with Marvel Studios to return as Wanda Maximoff across both Doomsday and Secret Wars, fulfilling her comic dynamic with Victor von Doom.',
    firstReportedAt: '2024-12-28',
    lastUpdatedAt: '2025-01-08',
    evidence: [
      'Agatha All Along repeatedly referenced Wanda\'s lingering magical footprint and established Billy Maximoff / Wiccan.',
      'In Marvel Comics\' Children\'s Crusade, Wanda\'s amnesiac return is intimately tied to Doctor Doom in Latveria.'
    ],
    counterEvidence: [
      'Elizabeth Olsen has repeatedly told interviewers she is enjoying a break from superhero filming.'
    ],
    editorialNote: 'Olsen\'s return is widely considered an open secret within the London agency circuit.',
    sources: [
      { name: 'The InSneider', url: 'https://theinsneider.com', type: 'TRADE', publishedAt: '2024-12-28' }
    ],
    content: `
## Character Trajectory Dossier

The apparent demise of Wanda Maximoff in *Doctor Strange in the Multiverse of Madness* was left deliberately ambiguous via a flash of red chaos magic. With *Agatha All Along* affirming her sons Billy and Tommy are alive in new vessels, Wanda\'s redemption arc points directly into Latverian mythology.
`
  },
  {
    title: 'RUMOR: Doctor Doom\'s MCU Armor Origin Tied to Alternate Stark Nanotechnology',
    slug: 'rumor-doctor-doom-armor-stark-variant-claims',
    description: 'Will Robert Downey Jr.\'s Doom be an evil Tony Stark variant? Examining the prevalent theory and studio counter-briefings.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'DEBUNKED',
    publishedAt: '2024-08-30T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Split face silhouette showing half Iron Man faceplate and half Doctor Doom iron mask',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom'],
    actors: ['Robert Downey Jr.'],
    tags: ['Tony Stark', 'Doctor Doom', 'Variant Theory', 'Debunked'],
    spoilerLevel: 'MILD',
    claim: 'Victor von Doom in the MCU is an alternate universe variant of Tony Stark who adopted the name Doom after his world was destroyed.',
    firstReportedAt: '2024-07-28',
    lastUpdatedAt: '2024-08-30',
    evidence: [
      'Casting Robert Downey Jr. immediately fueled assumptions that the character must share biological DNA with Tony Stark.'
    ],
    counterEvidence: [
      'Kevin Feige and the Russo Brothers explicitly announced at SDCC: "Victor von Doom is Victor von Doom."',
      'Stephen McFeely\'s script notes confirm Doom is Latverian royalty, not an armored Stark re-skin.'
    ],
    editorialNote: 'Treating Doom as a Stark variant would gut sixty years of classic Marvel comic lore; Marvel Studios has firmly dismissed this theory.',
    sources: [
      { name: 'Variety', url: 'https://variety.com', type: 'TRADE', publishedAt: '2024-07-28' },
      { name: 'Marvel Studios SDCC Panel', url: 'https://www.marvel.com', type: 'OFFICIAL', publishedAt: '2024-07-27' }
    ],
    content: `
## The "Stark Variant" Myth Debunked

In the hours following Robert Downey Jr.\'s unmasking, the internet exploded with theories that the MCU was adapting the *Infamous Iron Man* or *Superior Iron Man* concepts by making Doom an evil Tony Stark.

### Official Studio Stance

Kevin Feige and Anthony Russo stated plainly from the stage: Downey is portraying Victor von Doom. While the visual resemblance between Doom\'s face and Earth-616\'s fallen savior Tony Stark will undoubtedly inflict severe psychological trauma on the Avengers, in-universe he is Latveria\'s sovereign monarch, not an American tech billionaire.
`
  },
  {
    title: 'RUMOR: Midnight Sons Teaser Sequence Planned for Avengers: Doomsday Post-Credits',
    slug: 'rumor-avengers-doomsday-midnight-sons-teaser',
    description: 'Could Blade, Moon Knight, and Ghost Rider unite in a post-credits stinger to launch Marvel\'s supernatural corner?',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'UNVERIFIED',
    publishedAt: '2025-02-22T13:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Crescent moon illuminated against pitch black occult cloudy sky',
    movie: ['avengers-doomsday', 'blade', 'ghost-rider'],
    characters: ['blade', 'ghost-rider'],
    tags: ['Midnight Sons', 'Supernatural', 'Moon Knight', 'Post Credits'],
    spoilerLevel: 'MILD',
    claim: 'Marvel Studios is scripting a post-credits scene for Doomsday where Blade, Moon Knight, and a newly teased Ghost Rider form the Midnight Sons to combat occult incursion fallout.',
    firstReportedAt: '2025-02-15',
    lastUpdatedAt: '2025-02-22',
    evidence: [
      'Marvel executives have repeatedly indicated desire to assemble a supernatural coalition.'
    ],
    counterEvidence: [
      'Blade\'s ongoing production delays make filming coordinated post-credits sequences unfeasible at this juncture.'
    ],
    editorialNote: 'Highly speculative; while the team concept exists, assigning it to Doomsday\'s post-credits is premature.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2025-02-15' }
    ],
    content: `
## Supernatural Slate Intel

Reports surrounding a Midnight Sons team-up continue to circulate among scoopers. However, given that *Blade* has yet to enter principal photography, committing Mahershala Ali and other supernatural leads to a specific *Doomsday* tag sequence remains logistically uncertain.
`
  },
  {
    title: 'RUMOR: Marvel Studios Adapting Krakoan Geopolitical Era for MCU X-Men Reboot',
    slug: 'rumor-xmen-krakoan-era-adaptation',
    description: 'Whispers from Michael Lesslie\'s script treatments suggest the MCU\'s mutants will debut with sovereign island nationhood rather than the school.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'DEBUNKED',
    publishedAt: '2025-02-15T15:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Lush tropical island flora with bioluminescent gateway flowers',
    movie: ['x-men'],
    characters: ['cyclops', 'professor-x', 'magneto'],
    tags: ['Krakoa', 'Jonathan Hickman', 'X-Men Script', 'Debunked'],
    spoilerLevel: 'MILD',
    claim: 'Michael Lesslie\'s X-Men movie bypasses the Westchester school entirely, introducing mutants as already living on the sovereign living island of Krakoa.',
    firstReportedAt: '2025-02-01',
    lastUpdatedAt: '2025-02-15',
    evidence: [
      'Jonathan Hickman\'s 2019 House of X / Powers of X run revitalized the comic line.'
    ],
    counterEvidence: [
      'Studio executives have stated on-record that mainstream audiences need to connect with Xavier\'s School and young student outcasts before jumping into high-concept Krakoan diplomacy.'
    ],
    editorialNote: 'Lesslie\'s pitch centers on a classic high-school / academy framework.',
    sources: [
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2025-02-01' }
    ],
    content: `
## Narrative Framework Assessment

While comic enthusiasts championed Jonathan Hickman\'s Krakoan era, studio sources clarify that Marvel Studios will begin its live-action reboot grounded at Xavier\'s School for Gifted Youngsters. Re-establishing the core allegory of mutant persecution and student training is essential before advancing into living-island statehood.
`
  },
  {
    title: 'RUMOR: Namor and Shuri Forced Into Defensive War Against Latverian Navies in Black Panther 3',
    slug: 'rumor-black-panther-3-latveria-talokan-war',
    description: 'Could Doctor Doom invade Wakanda and Talokan for vibranium? Unverified reports analyze the Doomwar inspiration.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'UNVERIFIED',
    publishedAt: '2025-02-28T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Vibranium spear tip resting against water-slicked shoreline rocks',
    movie: ['black-panther-3', 'avengers-doomsday'],
    characters: ['black-panther-shuri', 'namor', 'doctor-doom'],
    actors: ['Letitia Wright', 'Tenoch Huerta Mejía'],
    tags: ['Doomwar', 'Wakanda', 'Talokan', 'Latveria'],
    spoilerLevel: 'MAJOR',
    claim: 'Black Panther 3 adapts the comic storyline Doomwar, with Doctor Doom deploying stealth tech to drain Wakanda\'s Great Mound vibranium vault.',
    firstReportedAt: '2025-02-20',
    lastUpdatedAt: '2025-02-28',
    evidence: [
      'Doomwar is one of the most acclaimed modern Black Panther comic crossovers.'
    ],
    counterEvidence: [
      'Ryan Coogler is currently writing the script with Denzel Washington, and Black Panther 3 will likely release in 2028 after Secret Wars, when Doom\'s arc may already be resolved.'
    ],
    editorialNote: 'Chronologically problematic unless elements of the conflict are incorporated into Doomsday itself.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2025-02-20' }
    ],
    content: `
## Comic Precedent vs. Release Order

The 2010 *Doomwar* limited series saw Victor von Doom successfully steal Wakanda\'s vibranium reserves. While visually stunning, *Black Panther 3* is scheduled for post-*Secret Wars* release, suggesting Ryan Coogler\'s narrative will focus on young T\'Challa II and domestic succession rather than a retrospective Doom conflict.
`
  },
  {
    title: 'RUMOR: Blade Film Reworked into Midnight Sons Ensemble Feature',
    slug: 'rumor-blade-reworked-into-midnight-sons-ensemble',
    description: 'Industry rumors suggest Marvel Studios may fold Mahershala Ali\'s Blade into a broader Midnight Sons team-up picture.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'DEBUNKED',
    publishedAt: '2024-09-10T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Silver dagger and ancient vampire tome illuminated by candlelight',
    movie: ['blade'],
    characters: ['blade'],
    actors: ['Mahershala Ali'],
    tags: ['Blade', 'Midnight Sons', 'Mahershala Ali', 'Debunked'],
    spoilerLevel: 'MILD',
    claim: 'Marvel Studios has canceled Blade as a standalone movie, reconfiguring it into an ensemble Midnight Sons feature to dilute production pressure.',
    firstReportedAt: '2024-08-25',
    lastUpdatedAt: '2024-09-10',
    evidence: [
      'Multiple director exits sparked online claims that the standalone concept was doomed.'
    ],
    counterEvidence: [
      'Kevin Feige reiterated during Disney APAC showcase: "We are committed to Blade, we love the character, and Mahershala is our Blade in a standalone film."',
      'Script rewrites by Eric Pearson remain focused strictly on Eric Brooks\'s personal journey.'
    ],
    editorialNote: 'Categorically refuted by Marvel leadership.',
    sources: [
      { name: 'Deadline', url: 'https://deadline.com', type: 'TRADE', publishedAt: '2024-09-05' }
    ],
    content: `
## Official Studio Clarification

Despite persistent rumors claiming Marvel would pivot to an ensemble to mask production hurdles, Kevin Feige confirmed to international press that *Blade* remains a dedicated solo feature built around Mahershala Ali\'s Academy Award-caliber vision.
`
  },
  {
    title: 'RUMOR: Mephisto Introductory Pact in Ironheart Bridges Directly to Ghost Rider',
    slug: 'rumor-ghost-rider-mephisto-introductory-pact',
    description: 'Sacha Baron Cohen\'s reported demonic villain in Ironheart is claimed to provide the legal contract for Johnny Blaze\'s Spirit of Vengeance.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-01-25T11:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Demonic red embers glowing through cracked parchment contract',
    movie: ['ghost-rider'],
    characters: ['ghost-rider'],
    tags: ['Mephisto', 'Ghost Rider', 'Ironheart', 'Sacha Baron Cohen'],
    spoilerLevel: 'MAJOR',
    claim: 'Sacha Baron Cohen portrays Mephisto in Ironheart, and his contractual manipulations explicitly tease the supernatural pact that birthed Ghost Rider.',
    firstReportedAt: '2025-01-10',
    lastUpdatedAt: '2025-01-25',
    evidence: [
      'Multiple trades reported Sacha Baron Cohen filmed scenes for Ironheart as an enigmatic, suited tech-demon.'
    ],
    counterEvidence: [
      'Marvel Studios has never officially confirmed Cohen\'s role or the character name Mephisto on official call sheets.'
    ],
    editorialNote: 'A logical supernatural bridge, but remains unconfirmed until Ironheart premieres.',
    sources: [
      { name: 'The Hollywood Reporter', url: 'https://www.hollywoodreporter.com', type: 'TRADE', publishedAt: '2025-01-12' }
    ],
    content: `
## Supernatural Continuity Speculation

The long-rumored appearance of Mephisto in *Ironheart* offers an organic narrative springboard for *Ghost Rider*. In comic canon, Johnny Blaze trades his soul to Mephisto to cure his surrogate father\'s cancer. Connecting Mephisto\'s modern corporate dealings in Chicago to the occult origins of the Spirit of Vengeance would tie disparate threads together.
`
  },
  {
    title: 'RUMOR: Daredevil Rooftop Cameo Filmed for Spider-Man: Brand New Day NYC Shoot',
    slug: 'rumor-daredevil-rooftop-cameo-spiderman-4',
    description: 'Location witnesses claim Charlie Cox and Tom Holland filmed a rain-soaked rooftop dialogue sequence in Queens.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-03-20T17:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Two vigilante silhouettes standing on rain-drenched rooftop overlooking Manhattan',
    movie: ['spiderman-brand-new-day', 'daredevil-born-again'],
    characters: ['spider-man', 'daredevil'],
    actors: ['Tom Holland', 'Charlie Cox'],
    tags: ['Daredevil', 'Spider-Man', 'Charlie Cox', 'Rooftop Cameo'],
    spoilerLevel: 'MILD',
    claim: 'Charlie Cox filmed a sequence in full Daredevil suit advising Tom Holland\'s Spider-Man on operating under Mayor Wilson Fisk\'s anti-vigilante task force.',
    firstReportedAt: '2025-03-12',
    lastUpdatedAt: '2025-03-20',
    evidence: [
      'Both actors have repeatedly lobbied for a full costume team-up following their brief legal scene in No Way Home.'
    ],
    counterEvidence: [
      'Brand New Day outdoor filming has been closely cordoned by NYPD security permits, making unverified eyewitness accounts prone to hearsay.'
    ],
    editorialNote: 'Extremely plausible given the thematic continuity between Born Again and Brand New Day.',
    sources: [
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2025-03-15' }
    ],
    content: `
## Street-Level Vigilante Alignment

Following *Daredevil: Born Again*, Matt Murdock\'s presence in New York City is deeply intertwined with Wilson Fisk\'s political ascent. Eyewitness reports from Astoria filming locations suggest Peter Parker and Matt Murdock will share a dramatic rooftop meeting regarding Fisk\'s crackdown on masked vigilantes.
`
  },
  {
    title: 'RUMOR: Tobey Maguire and Hugh Jackman Slated to Share Screen in Secret Wars',
    slug: 'rumor-tobey-maguire-hugh-jackman-secret-wars-teamup',
    description: 'The ultimate early-2000s Marvel dream: reports claim Marvel Studios is structuring a pivotal scene uniting Maguire\'s Spider-Man and Jackman\'s Wolverine.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-02-14T12:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Spider-Man webbing and adamantium claw scratches crossing on polished concrete floor',
    movie: ['avengers-secret-wars'],
    characters: ['spider-man', 'wolverine'],
    actors: ['Tobey Maguire', 'Hugh Jackman'],
    tags: ['Tobey Maguire', 'Hugh Jackman', 'Secret Wars', 'Dream Team-Up'],
    spoilerLevel: 'MILD',
    claim: 'The Russo Brothers are drafting an extended action sequence in Avengers: Secret Wars featuring Tobey Maguire\'s Spider-Man fighting alongside Hugh Jackman\'s Wolverine.',
    firstReportedAt: '2025-01-30',
    lastUpdatedAt: '2025-02-14',
    evidence: [
      'Kevin Feige has frequently referred to Maguire and Jackman as the foundational godfathers of modern cinematic Marvel superheroes.'
    ],
    counterEvidence: [
      'Secret Wars scripting is still in early development, and specific scene pairings have not been finalized.'
    ],
    editorialNote: 'While not formally locked, this pairing represents the single most anticipated legacy team-up in Marvel history.',
    sources: [
      { name: 'ComicBookMovie', url: 'https://comicbookmovie.com', type: 'RUMOR', publishedAt: '2025-01-30' }
    ],
    content: `
## The Millennium Superhero Reunion

For fans who grew up in the early 2000s watching Sam Raimi\'s *Spider-Man* and Bryan Singer\'s *X-Men*, Tobey Maguire and Hugh Jackman sharing the screen was an impossible fantasy blocked by Sony and Fox licensing walls. Under Marvel Studios\' unified roof in *Avengers: Secret Wars*, that pairing is not only possible—it is the emotional centerpiece of the Multiverse Saga farewell.
`
  },
  {
    title: 'RUMOR: Thunderbolts* Sentry Solar Collapse Rumored to Unleash The Void',
    slug: 'rumor-thunderbolts-sentry-void-collapse',
    description: 'Scoops suggest Lewis Pullman\'s "Bob" will experience a catastrophic psychological fracture, revealing the terrifying entity known as the Void.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-01-18T16:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Golden solar flare erupting into pitch black shadowy tendrils',
    movie: ['thunderbolts'],
    characters: ['yelena-belova', 'bucky-barnes'],
    actors: ['Lewis Pullman', 'Florence Pugh', 'Sebastian Stan'],
    tags: ['Sentry', 'The Void', 'Lewis Pullman', 'Thunderbolts Climax'],
    spoilerLevel: 'MAJOR',
    claim: 'The climax of Thunderbolts* revolves around the team realizing their real mission is not an assassination, but containing Lewis Pullman\'s Sentry before his dark shadow persona The Void consumes the Eastern Seaboard.',
    firstReportedAt: '2025-01-05',
    lastUpdatedAt: '2025-01-18',
    evidence: [
      'Teaser trailer footage shows "Bob" wearing hospital smocks in containment vaults with bullet holes bouncing off him.'
    ],
    counterEvidence: [
      'Marvel marketing has preserved extreme ambiguity regarding Bob\'s superhuman capabilities.'
    ],
    editorialNote: 'Matches Paul Jenkins\'s seminal comic creation and explains why the Thunderbolts ensemble must unite against overwhelming odds.',
    sources: [
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2025-01-05' }
    ],
    content: `
## Power Dynamic Breakdown

In Marvel Comics, Robert Reynolds (The Sentry) possesses the power of "one million exploding suns"—balanced tragically by an all-consuming malevolent entity named The Void.

### Climax Mechanics

Scoop reports allege that Valentina Allegra de Fontaine attempted to create her own controlled Super Soldier, inadvertently unleashing a cosmic horror that Yelena Belova and Bucky Barnes must neutralize before the world discovers the government\'s illegal black-site experimentation.
`
  },
  {
    title: 'RUMOR: Doctor Doom to Kill a Major Avenger in the Opening Minutes of Doomsday',
    slug: 'rumor-doctor-doom-opening-avenger-death',
    description: 'Whispers claim the Russo Brothers will mirror Thanos\'s slaughter of Loki in Infinity War by having Doom eliminate an iconic hero immediately.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'UNVERIFIED',
    publishedAt: '2025-02-27T14:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Emerald green magical blast striking a shattered stone monument',
    movie: ['avengers-doomsday'],
    characters: ['doctor-doom'],
    actors: ['Robert Downey Jr.'],
    tags: ['Doctor Doom', 'Avengers Death', 'Opening Sequence', 'Russo Brothers'],
    spoilerLevel: 'MAJOR',
    claim: 'Avengers: Doomsday opens with Doctor Doom hunting and eliminating a major cosmic or multiversal hero (such as a Kang variant or alternate Avenger) to establish his supreme lethality within five minutes.',
    firstReportedAt: '2025-02-20',
    lastUpdatedAt: '2025-02-27',
    evidence: [
      'The Russo Brothers utilized this exact narrative shorthand in Infinity War with Thanos defeating Hulk and executing Loki in the cold open.'
    ],
    counterEvidence: [
      'Script revisions remain in flux, and the identity of any opening victim has not leaked with verified corroboration.'
    ],
    editorialNote: 'A classic Russo storytelling device, but specifics remain purely speculative.',
    sources: [
      { name: 'Reddit r/MarvelStudiosSpoilers', url: 'https://reddit.com', type: 'RUMOR', publishedAt: '2025-02-20' }
    ],
    content: `
## The Lethality Benchmark

To convince global audiences that Robert Downey Jr.\'s Doctor Doom is an existential menace distinct from Iron Man, the Russo Brothers reportedly intend to stage an opening prologue demonstrating Doom\'s unmatched mastery over both cybernetic science and dark sorcery. Eliminating a prominent variant in the opening scene provides immediate dramatic stakes.
`
  },
  {
    title: 'RUMOR: Secret Wars to Divide Battleworld into Discrete Cinematic Domains',
    slug: 'rumor-secret-wars-battleworld-cinematic-domains',
    description: 'Speculation asserts Battleworld will partition Fox, Sony, and Earth-616 realities into walled territories governed by Doom\'s Barons.',
    category: 'RUMOR',
    type: 'RUMOR',
    status: 'RUMORED',
    publishedAt: '2025-03-05T12:00:00.000Z',
    heroImage: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Planetary sphere divided into hexagonal fractured continent zones',
    movie: ['avengers-secret-wars'],
    characters: ['doctor-doom', 'mr-fantastic'],
    actors: ['Robert Downey Jr.', 'Pedro Pascal'],
    tags: ['Battleworld', 'Secret Wars', 'Barons', 'Multiverse Domains'],
    spoilerLevel: 'MAJOR',
    claim: 'Avengers: Secret Wars adapts Jonathan Hickman\'s 2015 Battleworld map, dividing the planet into domains ruled by Barons—including an alternate Stark domain, a mutant territory, and a street-level Manhattan.',
    firstReportedAt: '2025-02-24',
    lastUpdatedAt: '2025-03-05',
    evidence: [
      'Marvel Studios registered trademarks for various Battleworld terminology in late 2022.'
    ],
    counterEvidence: [
      'A feature film has limited runtime compared to a sprawling multi-issue comic event, requiring simplification of the domain mechanics.'
    ],
    editorialNote: 'A cinematic adaptation of Battleworld will likely consolidate domains into three or four primary environments.',
    sources: [
      { name: 'The Cosmic Circus', url: 'https://thecosmiccircus.com', type: 'RUMOR', publishedAt: '2025-02-24' }
    ],
    content: `
## Adapting Hickman\'s Battleworld

In the 2015 *Secret Wars* comic, Battleworld is a patchwork planet created by God Emperor Doom from fragments of destroyed realities. Structuring the film around recognizable cinematic domains (such as the Fox X-Men universe or the Maguire Spider-Man reality) would provide an organic, visual narrative framework for general audiences.
`
  }
];

for (const art of rumorArticles) {
  writeArticle(art, art.content);
}

console.log(`Successfully generated ${rumorArticles.length} rumor database articles.`);
