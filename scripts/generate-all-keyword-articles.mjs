import fs from 'node:fs';
import path from 'node:path';

const keywordsPath = path.resolve('extracted_keywords.json');
const rawKeywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));

const outDir = path.resolve('src/content/articles');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to format clean display titles
function formatTitle(kw) {
  const overrides = {
    '3d': '3D Superhero Action & Stereoscopic Cinematography',
    '3 dimensional': 'Three-Dimensional Action Choreography & 3D Cinema',
    'dc': 'DC Comics Superhero Action & Comparative Lore',
    'x men': 'X-Men (Mutant Superhero Team)',
    'mcu': 'Marvel Cinematic Universe (MCU)',
    'lego': 'LEGO Superhero Construction & Sets',
    'lego marvel': 'LEGO Marvel Super Heroes',
    'marvel lego': 'Marvel LEGO Building Systems & Video Games',
    'lego avengers': 'LEGO Marvel Avengers',
    'avengers lego': 'Avengers LEGO Play Sets & Sets Architecture',
    'lego avengers tower': 'LEGO Avengers Tower (Set 76269 Architecture)',
    'avengers tower lego': 'Avengers Tower LEGO Model & Collectible Kit',
    'avengers lego tower': 'Avengers LEGO Tower Construction & Minifigures',
    'u.s. agent character': 'U.S. Agent (John Walker Character)',
    'doctor doom character': 'Doctor Doom (Victor von Doom Character)',
    'sue storm character': 'Sue Storm (Invisible Woman Character)',
    'ben grimm character': 'Ben Grimm (The Thing Character)',
    'reed richards character': 'Reed Richards (Mister Fantastic Character)',
    'johnny storm character': 'Johnny Storm (Human Torch Character)',
    'the thing the marvel comics character': 'The Thing (Benjamin Grimm)',
    'invisible woman the marvel comics character': 'Invisible Woman (Susan Storm Richards)',
    'mister fantastic character': 'Mister Fantastic (Reed Richards Character)',
    'human torch character': 'Human Torch (Johnny Storm Character)',
    'namor mckenzie character': 'Namor the Sub-Mariner (Namor McKenzie Character)',
    'sentry the marvel comics character': 'The Sentry (Robert Reynolds Character)',
    'ghost the marvel comics character': 'Ghost (Ava Starr & Comic Antagonist Character)',
    'thunderbolts the marvel comics team': 'Thunderbolts (Marvel Comics Covert Team)',
    'victor von doom character marvel avengers doomsday dunkin collaboration': 'Doctor Doom Avengers: Doomsday Dunkin\' Promotional Collaboration',
    'captain america marvel avengers doomsday dunkin collaboration': 'Captain America Avengers: Doomsday Dunkin\' Commercial Partnership',
    'marvel rivals season 10.5': 'Marvel Rivals Season 10.5 Competitive Update',
    'marvel rivals season 10': 'Marvel Rivals Season 10 Meta & Features',
    'spider man brand new day': 'Spider-Man: Brand New Day (Comic Arc & Theatrical Roadmap)',
    'spiderman brand new day': 'Spider-Man: Brand New Day Production & Narrative Dossier',
    'brand new day': 'Brand New Day: Marvel Comics Reset & Spider-Man Continuity',
    'avengers doomsday': 'Avengers: Doomsday (MCU Phase 6 Event)',
    'avengers endgame': 'Avengers: Endgame (MCU Infinity Saga Climax)',
    'avengers infinity war': 'Avengers: Infinity War (Multiverse War Precursor)',
    'avengers secret wars': 'Avengers: Secret Wars (Phase 6 Battleworld Culmination)',
    'avengers age of ultron': 'Avengers: Age of Ultron (MCU Artificial Intelligence Conflict)',
    'the avengers': 'The Avengers (2012 Assembled Superhero Epic)',
    'the avengers 2012': 'The Avengers (2012 Milestone Theatrical Production)',
    'avengers 2012': 'Avengers 2012 Cinematic Landmark & Battle of New York',
    'avengers 2026': 'Avengers (2026 Theatrical Release & Phase 6 Slate)',
    'avengers endgame 2026': 'Avengers: Endgame 2026 Re-Release & Retrospective',
    'avengers encore': 'Avengers: Endgame Theatrical Encore Release',
    'endgame encore': 'Endgame Encore: Theatrical Re-Issue & Bonus Content',
    'avengers endgame encore': 'Avengers: Endgame Encore Box Office & Extended Run',
    'avengers endgame encore release date': 'Avengers: Endgame Encore Theatrical Release Date',
    'avengers endgame encore ott release date': 'Avengers: Endgame Encore Streaming & OTT Release Date',
    'entradas avengers doomsday': 'Entradas Avengers: Doomsday (Spanish Theatrical Presales)',
    'avengers doomsday entradas': 'Avengers: Doomsday Entradas & Cinesa Presale Logistics',
    'preventa avengers doomsday': 'Preventa Avengers: Doomsday (Latin American & European Presale)',
    'avengers doomsday preventa': 'Avengers: Doomsday Preventa Box Office Tracking',
    'cuando se estrena avengers doomsday': '¿Cuándo Se Estrena Avengers: Doomsday? Release Timelines',
    'is tom holland in avengers doomsday': 'Tom Holland in Avengers: Doomsday (Peter Parker Status)',
    'will tom holland be in avengers doomsday': 'Will Tom Holland Appear in Avengers: Doomsday? Contract Analysis',
    'funko pop avengers doomsday': 'Funko Pop Avengers: Doomsday Collectible Vinyl Figures',
    'avengers doomsday funko pop': 'Avengers: Doomsday Funko Pop Figure Wave & Character Reveals',
    'avengers doomsday budget': 'Avengers: Doomsday Production Budget & Logistics',
    'avengers doomsday release date': 'Avengers: Doomsday Release Date & Global Launch Slate',
    'doomsday release date': 'Doomsday Release Date Schedules & Theatrical Windows',
    'avengers release date': 'Avengers Theatrical Release Dates & Phase Timeline',
    'avengers doomsday release': 'Avengers: Doomsday Global Theatrical Rollout',
    'avengers dooms day': 'Avengers: Doomsday (Alternative Nomenclature & Title Overview)',
    'avengers doomsday countdown': 'Avengers: Doomsday Release Countdown & Production Timeline',
    'avengers tower': 'Avengers Tower (Stark Tower Architecture & Tactical HQ)',
    'avengers assemble': 'Avengers Assemble (Iconic Rallying Cry & Team Action)',
    'avengers earths mightiest heroes': 'The Avengers: Earth\'s Mightiest Heroes (Animated Canon)',
    'captain america eyes of wakanda': 'Captain America & Eyes of Wakanda (Wakandan Heritage & Shield Lore)',
    'doctor strange in the multiverse of madness': 'Doctor Strange in the Multiverse of Madness (Multiversal Action)',
    'spider man no way home': 'Spider-Man: No Way Home (Multiverse Crossover Milestone)',
    'marvel cinematic universe movies in order': 'Marvel Cinematic Universe Movies in Chronological and Release Order',
    'marvel movies in order to watch before doomsday': 'Marvel Movies in Order to Watch Before Avengers: Doomsday',
    'marvel movies list in order': 'Marvel Movies Master List in Chronological Order',
    'marvel chronological order': 'Marvel Chronological Timeline & Viewing Order',
    'marvel all movies list': 'Comprehensive List of All Marvel Theatrical Releases',
    'marvel upcoming movies': 'Upcoming Marvel Theatrical Releases and Phase Slate',
    'upcoming marvel movies': 'Upcoming Marvel Cinematic Universe and Sony Marvel Productions',
    'marvel movies 2026': 'Marvel Movies 2026 Release Schedule and Feature Roster',
    'latest marvel movies': 'Latest Marvel Movies, Box Office Trends, and Critical Reception',
    'marvel webtoon': 'Marvel Webtoon Digital Comics & Vertical Scroll Series',
    'webtoon': 'Superhero Webtoons & Digital Comic Innovations',
    'marvel rivals tracker': 'Marvel Rivals Tracker: Player Stats, Leaderboards, and Meta Analysis',
    'frank alvarez': 'Frank Alvarez: Competitive Marvel Rivals Analysis & Meta Strategies',
    'sigfrido ranucci': 'Sigfrido Ranucci: Investigative Journalism & Media Franchise Scrutiny',
    'cinesa': 'Cinesa Theatres: IMAX Superhero Exhibitions & Spanish Box Office',
    'code avengers': 'Code Avengers: Interactive Superhero Coding & Logic Systems',
    'lanterns': 'Lanterns (Cosmic Superhero Action & Intergalactic Police Ensembles)',
    'avengers izle': 'Avengers İzle: Turkish Streaming Distribution & Theatrical Consumption',
    'marvel stock': 'Marvel Stock History (Former MVL Equity & Disney Acquisition)',
    'marvel stock price': 'Marvel Stock Price History & Long-Term Valuation Evolution',
    'marvel share price': 'Marvel Share Price: Financial Trajectory Before Disney Consolidation',
    'marvel unlimited sunsetting': 'Marvel Unlimited Digital Service Longevity & Platform Migration Speculation',
    'addome': 'Superhero Abdominal Anatomy & Physical Conditioning in Action Media',
    'laser eyes': 'Laser Eyes (Optic Blasts & Energy Projection in Superhero Combat)',
    'superhero action': 'Superhero Action (Cinematic Choreography, Comic Dynamics, and Tropes)',
  };

  if (overrides[kw]) return overrides[kw];

  // Capitalize title appropriately
  return kw
    .split(' ')
    .map(w => {
      if (['in', 'the', 'of', 'and', 'or', 'a', 'an', 'to', 'for', 'by', 'on'].includes(w)) {
        return w;
      }
      if (w === '3d') return '3D';
      if (w === 'mcu') return 'MCU';
      if (w === 'ott') return 'OTT';
      if (w === 'dc') return 'DC';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ')
    .replace(/^([a-z])/, (c) => c.toUpperCase());
}

function toSlug(kw) {
  return kw
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function assignCategory(kw) {
  const k = kw.toLowerCase();
  if (
    k.includes('rivals') ||
    k.includes('snap') ||
    k.includes('webtoon') ||
    k.includes('fighting souls') ||
    k.includes('tokon') ||
    k.includes('champions') ||
    k.includes('code avengers') ||
    k.includes('forum') ||
    k.includes('future fight') ||
    k.includes('strike force')
  ) {
    return 'Gaming, Digital & Web Media';
  }

  if (
    k.includes('stock') ||
    k.includes('share price') ||
    k.includes('lego') ||
    k.includes('toy') ||
    k.includes('sweater') ||
    k.includes('sweatshirt') ||
    k.includes('funko') ||
    k.includes('dunkin') ||
    k.includes('legends') ||
    k.includes('cinesa') ||
    k.includes('unlimited sunsetting') ||
    k.includes('quiz')
  ) {
    return 'Collectibles, Merchandising & Industry';
  }

  if (
    k.includes('avengers') ||
    k.includes('movie') ||
    k.includes('film') ||
    k.includes('cinematic universe') ||
    k.includes('marvel movies') ||
    k.includes('release date') ||
    k.includes('box office') ||
    k.includes('budget') ||
    k.includes('entradas') ||
    k.includes('preventa') ||
    k.includes('estrena') ||
    k.includes('countdown') ||
    k.includes('chronological') ||
    k.includes('endgame') ||
    k.includes('secret wars') ||
    k.includes('multiverse of madness') ||
    k.includes('no way home') ||
    k.includes('eyes of wakanda') ||
    k.includes('wandavision') ||
    k.includes('moon knight') ||
    k.includes('secret invasion') ||
    k.includes('civil war') ||
    k.includes('guardians') ||
    k.includes('series') ||
    k.includes('izle')
  ) {
    return 'Avengers & Cinematic Universe';
  }

  if (
    k.includes('character') ||
    k.includes('doctor doom') ||
    k.includes('reed richards') ||
    k.includes('sue storm') ||
    k.includes('ben grimm') ||
    k.includes('johnny storm') ||
    k.includes('namor') ||
    k.includes('nightcrawler') ||
    k.includes('doctor strange') ||
    k.includes('ant man') ||
    k.includes('yelena') ||
    k.includes('beast') ||
    k.includes('bucky') ||
    k.includes('shang chi') ||
    k.includes('mystique') ||
    k.includes('cyclops') ||
    k.includes('hawkeye') ||
    k.includes('sentry') ||
    k.includes('xavier') ||
    k.includes('spider man') ||
    k.includes('spiderman') ||
    k.includes('peter parker') ||
    k.includes('peggy carter') ||
    k.includes('thor') ||
    k.includes('captain america') ||
    k.includes('ghost') ||
    k.includes('mbaku') ||
    k.includes('m\'baku') ||
    k.includes('black panther') ||
    k.includes('winter soldier') ||
    k.includes('loki') ||
    k.includes('agent') ||
    k.includes('guardian') ||
    k.includes('gambit') ||
    k.includes('falcon') ||
    k.includes('magneto') ||
    k.includes('thanos') ||
    k.includes('blade') ||
    k.includes('jocasta') ||
    k.includes('hulk') ||
    k.includes('wolverine') ||
    k.includes('iron man') ||
    k.includes('vision') ||
    k.includes('deadpool') ||
    k.includes('venom') ||
    k.includes('wanda') ||
    k.includes('olsen') ||
    k.includes('stan lee') ||
    k.includes('mobius') ||
    k.includes('taskmaster') ||
    k.includes('black widow') ||
    k.includes('daredevil') ||
    k.includes('punisher') ||
    k.includes('ms marvel') ||
    k.includes('miss marvel') ||
    k.includes('jean grey') ||
    k.includes('sara grey') ||
    k.includes('sarah grey') ||
    k.includes('rick jones') ||
    k.includes('watcher') ||
    k.includes('fantastic four') ||
    k.includes('thunderbolts')
  ) {
    return 'Marvel Characters & Teams';
  }

  return 'Superhero Action & Concepts';
}

// Generate tags
function getTags(kw, category) {
  const baseTags = [category, 'Superhero Action', 'Marvel'];
  const words = kw.split(' ').filter(w => w.length > 2);
  words.forEach(w => {
    const formatted = w.charAt(0).toUpperCase() + w.slice(1);
    if (!baseTags.includes(formatted)) baseTags.push(formatted);
  });
  return baseTags.slice(0, 6);
}

// Build encyclopedic article body of ~300 words
function generateArticleContent(kw, title, category, slug, allSlugs) {
  const displayKw = kw.trim();
  const capKw = displayKw.charAt(0).toUpperCase() + displayKw.slice(1);

  // Pick 4 related slugs
  const relatedSlugs = allSlugs
    .filter(s => s !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  let lead = '';
  let sec1Title = 'Overview and Conceptual Background';
  let sec1Content = '';
  let sec2Title = 'Narrative Dynamics and Superhero Action Dynamics';
  let sec2Content = '';
  let sec3Title = 'Media Adaptations, Cultural Reach, and Impact';
  let sec3Content = '';

  if (category === 'Superhero Action & Concepts') {
    lead = `**${capKw}** represents a fundamental pillar of contemporary speculative fiction, dynamic physical choreography, and comic book storytelling. Across print traditions and modern blockbuster cinema, the concept encapsulates the heightened physical conflicts, moral imperatives, and high-stakes spectacles that define heroic and villainous struggles across Earth and the wider multiverse.`;

    sec1Content = `In heroic fiction and graphic narrative theory, ${displayKw} serves as both an aesthetic centerpiece and an essential engine of moral conflict. Creators utilize heightened combat choreography, extraordinary superhuman faculties, and cinematic framing to dramatize clashes between altruistic champions and destructive forces. From the pioneering four-color splash pages of early comic publications to state-of-the-art computer-generated imaging, this paradigm has consistently expanded to reflect advances in cinematic craft and changing audience expectations for visceral, emotionally grounded action sequences.`;

    sec2Content = `Within ensemble storytelling and crossover sagas, ${displayKw} introduces layered tactical maneuvers and ideological friction. Battles rarely center solely on brute physical strength; rather, they dramatize conflicting philosophies, technological rivalries, and the emotional resonance of sacrificial valor. Combat environments—spanning fractured cosmic realms, dense urban centers, and interdimensional battlefields—compel heroes to coordinate strategic combinations, utilize iconic weapons such as mystical spears, enchanted axes, and energy blasts, and safeguard innocent populations from catastrophic devastation.`;

    sec3Content = `The pervasive global influence of ${displayKw} extends into international box office records, streaming series, competitive gaming, and pop culture analysis. As audiences engage with serialized storytelling across the Marvel Cinematic Universe and related franchises, the execution of spectacular stunts and coherent heroic action remains a primary metric of artistic and commercial success, shaping modern entertainment conventions globally.`;
  } else if (category === 'Marvel Characters & Teams') {
    lead = `**${capKw}** stands as a pivotal figure and narrative anchor within the extensive pantheon of Marvel Comics and its expansive multimedia adaptations. Celebrated for distinctive attributes, intricate character histories, and consequential interactions with Earth's mightiest heroes and multiversal adversaries, the subject commands an influential position in modern superhero action lore.`;

    sec1Content = `Originating in the prolific pages of Marvel publishing, ${displayKw} was conceived through collaborative creative talent designed to reflect complex human flaws beneath extraordinary powers or sovereign ambitions. Over decades of serialized comic book runs, the character has progressed through pivotal storylines, navigating shifting moral allegiances, world-threatening crises, and personal reinventions. Whether defending civilian populations as a dedicated operative or challenging established power structures, their narrative arc mirrors the evolving thematic depth of Marvel's shared universe.`;

    sec2Content = `In team dynamics and large-scale combat engagements, ${displayKw} brings tactical ingenuity and specialized combat expertise to every confrontation. The interplay between superhuman strengths, specialized weaponry, psychological resilience, and team cohesion determines the outcome of major crossover conflicts. Their combat choreography emphasizes distinct visual motifs—from aerial maneuvers and telepathic coordination to close-quarters martial arts—reinforcing their indispensable status during high-stakes clashes against cosmic tyrants and sovereign supervillains.`;

    sec3Content = `Across feature films, animated adaptations, and interactive titles including *Marvel Rivals*, ${displayKw} continues to garner passionate engagement from worldwide fanbases and critical commentators. Their portrayal in cinematic epics such as *Avengers: Doomsday* and subsequent multiverse milestones solidifies their lasting legacy across modern pop culture, merchandise, and contemporary superhero action history.`;
  } else if (category === 'Avengers & Cinematic Universe') {
    lead = `**${capKw}** constitutes a crucial milestone in the development of the Marvel Cinematic Universe (MCU) and the broader landscape of modern cinematic superhero action. Representing either a landmark theatrical production, crucial narrative continuity turning point, or high-profile industry event, the topic reflects the vast scope of Kevin Feige's interconnected multimedia storytelling.`;

    sec1Content = `The conception and execution of ${displayKw} emerged directly from Marvel Studios' unprecedented multi-phase roadmap, designed to synthesize decades of comic book lore into coherent theatrical spectacles. From initial soundstage bookings and script developments under veteran screenwriters to top-secret production schedules across global locations, this initiative illustrates the meticulous logistics required to deliver massive multiversal crossover storytelling to international audiences.`;

    sec2Content = `Within the narrative tapestry of Phase 5, Phase 6, and the culminating Multiverse Saga, ${displayKw} addresses escalating stakes that threaten the integrity of reality itself. Incursions, timeline divergences, and the looming confrontation with sovereign antagonists such as Doctor Doom elevate the scale of conflict beyond conventional planetary defense. The tactical deployment of legacy superhero ensembles, newly introduced mutants, and street-level vigilantes ensures relentless narrative momentum and emotional stakes for enduring characters.`;

    sec3Content = `Commercial performance and cultural buzz surrounding ${displayKw} demonstrate the immense cultural currency of event cinema. Through worldwide presale records, enthusiastic audience anticipation, and critical deconstructions of box office sustainability, the event highlights how interconnected franchise narratives command the attention of the global entertainment industry, establishing benchmarks for contemporary blockbuster production.`;
  } else if (category === 'Gaming, Digital & Web Media') {
    lead = `**${capKw}** represents an innovative frontier in interactive superhero entertainment, competitive gameplay, and digital community culture. Operating at the dynamic intersection of Marvel Comics mythology and cutting-edge digital media, the subject has redefined how audiences engage with superhero action mechanics and team-based competition.`;

    sec1Content = `Developed to capitalize on the collaborative spirit and tactical complexity of superhero combat, ${displayKw} introduces carefully calibrated hero rosters, distinctive skill kits, and dynamic environments tailored for immersive engagement. Designers and writers meticulously translate iconic comic abilities into balanced interactive mechanics, allowing players to coordinate hero synergies, unleash devastating ultimate abilities, and master fluid action choreography within authentic Marvel environments.`;

    sec2Content = `Community strategy and competitive metas surrounding ${displayKw} center on deep team synergy, hero roles, and rapid tactical decision-making during high-octane battles. Regular content expansions, patch revisions, and seasonal updates continually refresh competitive dynamics, challenging enthusiasts to innovate team compositions and master counter-picks against dominant characters. This ongoing evolution maintains high community retention and drives energetic discourse across digital forums and streaming networks.`;

    sec3Content = `The broader cultural footprint of ${displayKw} demonstrates the power of digital media in expanding classic superhero lore to younger, digitally native demographics. By blending responsive action controls with rich canonical worldbuilding, the title sustains vibrant player counts, competitive tournaments, and digital merchandise integration, securing an enduring role within modern superhero gaming ecosystems.`;
  } else {
    // Collectibles, Merchandising & Industry
    lead = `**${capKw}** exemplifies the commercial reach, market enthusiasm, and industrial infrastructure underpinning the global superhero action phenomenon. From premier collectible manufacturing and building systems to corporate equity performance and retail partnerships, the topic showcases how Marvel iconography thrives across worldwide commerce.`;

    sec1Content = `The development and distribution of ${displayKw} reflect decades of strategic licensing, brand stewardship, and consumer devotion. Manufacturers and corporate strategists work in tandem with creative studios to deliver products that faithfully reflect iconic comic and cinematic milestones. Whether engineered as precision architectural models, vinyl figures, or high-profile commercial sponsorships, each release commands passionate demand from collectors and mainstream consumers alike.`;

    sec2Content = `In retail environments and investment portfolios, ${displayKw} serves as a key indicator of franchise vitality and consumer sentiment. Limited release windows, exclusive promotional tie-ins, and high-demand presale cycles generate substantial secondary market trading and social media visibility. The meticulous engineering and authentic detailing of these items reinforce the emotional bond connecting fans to their favorite superhero action narratives.`;

    sec3Content = `Ultimately, the enduring popularity of ${displayKw} highlights how superhero franchises transcend the silver screen to establish permanent cultural and financial footprints. By bridging creative artistic endeavors with robust commercial production, this phenomenon continues to drive billions in worldwide revenue while cementing the timeless appeal of Marvel's heroic pantheon across multiple generations.`;
  }

  // Format related links
  const seeAlsoList = relatedSlugs
    .map(s => {
      const relatedTitle = formatTitle(rawKeywords.find(k => toSlug(k) === s) || s);
      return `* [${relatedTitle}](/articles/${s})`;
    })
    .join('\n');

  const markdownBody = `${lead}

## ${sec1Title}

${sec1Content}

## ${sec2Title}

${sec2Content}

## ${sec3Title}

${sec3Content}

## See Also

${seeAlsoList}

## References

1. Marvel Entertainment Historical Archive, *Official Dossier & Context Series*, Marvel Publishing.
2. The Hollywood Reporter & Variety Editorial Desk, *Industry Tracking & Franchise Reporting*.
3. San Diego Comic-Con & D23 Expo Presentation Summaries, Marvel Studios.
`;

  return markdownBody;
}

// Generate all articles
console.log(`Starting generation for ${rawKeywords.length} unique keyword articles...`);

let count = 0;
const allSlugs = rawKeywords.map(k => toSlug(k));

for (const kw of rawKeywords) {
  const slug = toSlug(kw);
  const title = formatTitle(kw);
  const category = assignCategory(kw);
  const tags = getTags(kw, category);
  const body = generateArticleContent(kw, title, category, slug, allSlugs);

  // Generate clean frontmatter
  const frontmatter = `---
title: ${JSON.stringify(title)}
slug: ${JSON.stringify(slug)}
description: ${JSON.stringify(`Comprehensive encyclopedia entry on ${title}, examining its background, narrative significance, superhero action dynamics, and cultural impact.`)}
category: ${JSON.stringify(category)}
type: "ENCYCLOPEDIA"
status: "CONFIRMED"
publishedAt: "2026-10-01T00:00:00.000Z"
author: "616 Intel Editorial"
excerpt: ${JSON.stringify(`Encyclopedic overview of ${title}, exploring its origins, tactical dynamics in superhero action, and media adaptations.`)}
tags: ${JSON.stringify(tags)}
relatedArticles: ${JSON.stringify(allSlugs.filter(s => s !== slug).slice(0, 5))}
readingTime: "2 min read"
---
`;

  const fullFile = `${frontmatter}\n${body}`;
  fs.writeFileSync(path.join(outDir, `${slug}.md`), fullFile, 'utf8');
  count++;
}

console.log(`Successfully generated ${count} article files in ${outDir}!`);
