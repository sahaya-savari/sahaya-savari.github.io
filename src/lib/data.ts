import type { BlogPost, Category, Comment, Testimonial, TimelineEvent, Skill, Achievement } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Travel', slug: 'travel', description: 'Wander through pages that map the world — from cobblestone alleys to mountain passes.', color: '#E9DA79', icon: 'Compass', postCount: 8 },
  { id: '2', name: 'Fantasy', slug: 'fantasy', description: 'Dragons, magic systems, and worlds built from pure imagination await your discovery.', color: '#6B2B2B', icon: 'Sparkles', postCount: 12 },
  { id: '3', name: 'Mystery', slug: 'mystery', description: 'Follow the clues, unravel the secrets, and solve the case before the final page.', color: '#5A2020', icon: 'Search', postCount: 7 },
  { id: '4', name: 'Science Fiction', slug: 'science-fiction', description: 'Boldly go to futures, alternate realities, and the edges of what is possible.', color: '#3B82F6', icon: 'Rocket', postCount: 10 },
  { id: '5', name: 'History', slug: 'history', description: 'Step back in time and witness the events that shaped our world.', color: '#D4C24E', icon: 'Scroll', postCount: 6 },
  { id: '6', name: 'Biography', slug: 'biography', description: 'Real lives, extraordinary journeys, and the stories behind the names.', color: '#8B3B3B', icon: 'User', postCount: 5 },
  { id: '7', name: 'Poetry', slug: 'poetry', description: 'Verses that sing, words that dance, and lines that linger long after reading.', color: '#E9DA79', icon: 'Feather', postCount: 9 },
  { id: '8', name: 'Romance', slug: 'romance', description: 'Love stories that make your heart race and your soul sigh.', color: '#F472B6', icon: 'Heart', postCount: 8 },
  { id: '9', name: 'Classic Literature', slug: 'classic-literature', description: 'Timeless masterpieces that have shaped the literary landscape for generations.', color: '#6B2B2B', icon: 'BookOpen', postCount: 11 },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'cartographer-of-imagined-realms',
    title: 'The Cartographer of Imagined Realms',
    excerpt: 'How fantasy mapmakers build worlds that feel more real than our own, and why we cannot stop exploring them.',
    content: `
## Why Maps Matter in Fantasy

There is something primal about unfolding a map at the front of a book. Before a single word of the story is spoken, the map whispers: *here be dragons*. It promises adventure. It promises the unknown.

Fantasy cartography is not merely decorative — it is foundational. When J.R.R. Tolkien drew the maps of Middle-earth, he was not illustrating a story. He was building the scaffolding upon which an entire mythology would hang.

### The Architecture of Belief

A well-drawn map does something remarkable: it lends credibility to the impossible. The moment you see coastlines, mountain ranges, and river systems that follow the logic of real geography, your brain accepts the world as *plausible*.

> A map is the silent argument that says: this place exists, and it has rules.

Consider the work of Robert Jordan, Brandon Sanderson, and Ursula K. Le Guin. Each understood that the map is a contract with the reader — a promise that the world has depth beyond the page.

### When Maps Tell Stories

The best fantasy maps do not just show where things are. They show where things *were*. A ruined city on a map hints at a fallen empire. A trade route suggests commerce and conflict. A blank space dares you to imagine what lies beyond.

\`\`\`javascript
// The anatomy of a fantasy world map
const worldMap = {
  geography: ['mountains', 'rivers', 'coastlines', 'forests'],
  settlements: ['capital', 'villages', 'ruins', 'strongholds'],
  dangers: ['dragon territories', 'cursed lands', 'unexplored regions'],
  stories: ['every marker hides a tale']
};
\`\`\`

The next time you open a fantasy novel, linger on the map. Trace the routes. Read the names. The journey begins before chapter one.

### Maps as Emotional Landmarks

Beyond geography, maps serve as emotional anchors throughout a story. When a character travels from the Shire to Mordor, the reader tracks that journey on the map. Each inch crossed represents growth, loss, and transformation. The map becomes a visual record of the character's arc.

![A beautifully illustrated fantasy map](https://images.unsplash.com/photo-1589834390005-5c39e6c1d9b4?w=800)

The cartographer of imagined realms does not merely draw land and water. They draw possibility.
`,
    category: 'Fantasy',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-06-28',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e7a5?w=800&h=600&fit=crop',
    featured: true,
    tags: ['fantasy', 'worldbuilding', 'maps', 'tolkien'],
  },
  {
    id: '2',
    slug: 'midnight-trains-and-typewriters',
    title: 'Midnight Trains and Typewriters',
    excerpt: 'A travelogue through Eastern Europe by rail, where every station holds a story and every delay is a gift.',
    content: `
## The 23:47 to Bucharest

The platform was empty except for a man selling roasted chestnuts and a cat that looked like it owned the place. The train was twenty minutes late, which in Eastern European rail terms means it is practically on time.

I had been traveling for three weeks — Budapest to Belgrade, Belgrade to Sofia, and now Sofia to Bucharest. Each city had given me something I did not expect: a conversation with a stranger, a meal I cannot describe, a view that rearranged something inside me.

### The Gift of Delay

Travel writers love to complain about delays. I have learned to love them. It was during a four-hour delay in Niš that I met an old poet who told me about his life under the old regime. He wrote his poems on a typewriter he had owned for fifty years.

> "The typewriter does not lie," he said. "It puts down exactly what you give it. No autocorrect. No second chances."

### Stations as Stories

Every station on this route told a story. The grand architecture of Keleti in Budapest. The bullet scars still visible in Belgrade's station walls. The quiet efficiency of Sofia's recently renovated platform.

\`\`\`python
# My rail route through Eastern Europe
route = [
    {"city": "Budapest", "station": "Keleti", "impression": "grandeur"},
    {"city": "Belgrade", "station": "Glavni", "impression": "resilience"},
    {"city": "Sofia",    "station": "Central", "impression": "renewal"},
    {"city": "Bucharest","station": "Gara de Nord", "impression": "mystery"},
]
\`\`\`

![Train station at night](https://images.unsplash.com/photo-1474487525473-c65f0a87b3e7?w=800)

The train pulled into Bucharest at dawn. The poet was gone, the chestnut man was gone, but the stories stayed. They always do.
`,
    category: 'Travel',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-06-22',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1474487525473-c65f0a87b3e7?w=800&h=600&fit=crop',
    featured: true,
    tags: ['travel', 'eastern europe', 'trains', 'typewriters'],
  },
  {
    id: '3',
    slug: 'the-quantum-library',
    title: 'The Quantum Library',
    excerpt: 'Science fiction has long imagined libraries that contain all knowledge. What happens when the technology catches up to the fiction?',
    content: `
## Borges and the Infinite Library

Jorge Luis Borges imagined a library containing every possible combination of letters — a library so vast that it contained every book ever written and every book that could ever be written. It was a nightmare of abundance.

Today, we live in a version of that library. The internet gives us access to more information than any human could process in a thousand lifetimes. Science fiction saw this coming.

### From Asimov to Algorithms

Isaac Asimov's Foundation series imagined a Galactic Encyclopedia — a compendium of all human knowledge compressed into a single planet. We now carry something similar in our pockets.

> "The question is no longer how to find information, but how to survive the flood of it." — A thought I had at 3 AM, scrolling through Wikipedia.

### The Fiction That Became Reality

Science fiction has always been less about predicting the future and more about interrogating the present. When Arthur C. Clarke imagined a global library accessible to all, he was describing the internet before the internet existed.

\`\`\`javascript
// The evolution of the library
const libraries = [
  { era: "ancient",     form: "clay tablets",     scale: "hundreds" },
  { era: "medieval",    form: "illuminated manuscripts", scale: "thousands" },
  { era: "industrial",  form: "public libraries",  scale: "millions" },
  { era: "digital",     form: "the internet",      scale: "infinite" },
];
\`\`\`

![A futuristic library](https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800)

The quantum library is not a place. It is a condition. We are all librarians now, navigating an infinite collection, searching for the books that matter.
`,
    category: 'Science Fiction',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-06-15',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop',
    featured: true,
    tags: ['science fiction', 'borges', 'libraries', 'technology'],
  },
  {
    id: '4',
    slug: 'whispers-in-the-stacks',
    title: 'Whispers in the Stacks',
    excerpt: "A mystery lover's guide to the best locked-room puzzles and why the genre keeps reinventing itself.",
    content: `
## The Locked Room Problem

The locked-room mystery is the purest form of the genre. A body, a sealed room, no apparent way in or out. It is a puzzle that demands the reader become a detective.

From Edgar Allan Poe's "The Murders in the Rue Morgue" to modern masters like Ruth Ware and John Dickson Carr, the locked-room mystery endures because it represents the ultimate challenge: the impossible made logical.

### Why We Love Mysteries

We read mysteries not just for the solution, but for the process. The detective's mind is a mirror — we see our own reasoning reflected and tested. Every red herring is a lesson in humility.

> "The detective story is the only literary form in which the reader is an active participant." — G.K. Chesterton

### The Modern Renaissance

The genre is experiencing a renaissance. Authors like Anthony Horowitz, Lucy Foley, and Richard Osman have brought fresh energy to the classic puzzle mystery, blending humor, social commentary, and genuine surprise.

\`\`\`python
# Elements of a great mystery
mystery_elements = {
    "setup": "an impossible crime",
    "detective": "a brilliant but flawed protagonist",
    "suspects": "everyone has a motive",
    "clues": "fair but hidden in plain sight",
    "resolution": "logical but unexpected",
}
\`\`\`

![A mysterious library scene](https://images.unsplash.com/photo-1535905557558-348435205d12?w=800)

The next time you pick up a mystery, pay attention to the whispers in the stacks. The answer is always there, hiding between the lines.
`,
    category: 'Mystery',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-06-08',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1535905557558-348435205d12?w=800&h=600&fit=crop',
    featured: false,
    tags: ['mystery', 'locked room', 'puzzles', 'detective'],
  },
  {
    id: '5',
    slug: 'verses-that-travel',
    title: 'Verses That Travel',
    excerpt: 'How poetry captures the essence of place better than any photograph ever could.',
    content: `
## The Poet as Traveler

A photograph captures a place. A poem captures what it *feels like* to be there. The difference is everything.

When Pablo Neruda wrote about the sea, he did not describe its color. He described its hunger. When Mary Oliver wrote about the marsh, she did not catalog its plants. She listened to its prayers.

### Place as Metaphor

Poetry transforms geography into emotion. A river becomes the passage of time. A mountain becomes an obstacle overcome. A city street becomes a labyrinth of memory.

> "Poetry is the language of travel — it takes you somewhere your body cannot go." — Taylor Vance

### The Travel Poem Tradition

From Bashō's haiku journeys across Japan to Walt Whitman's sprawling American verses, the travel poem has always been about inner transformation as much as outer exploration.

\`\`\`javascript
// What a travel poem captures
const travelPoem = {
  sight: "the color of the sky at dusk",
  sound: "the language of strangers",
  smell: "rain on ancient stone",
  feeling: "the ache of departure",
  truth: "you are changed by every place you leave"
};
\`\`\`

![Poetry and travel](https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800)

Pack a book of poems on your next journey. You will find that the best travel guide is a poet who has been there before you.
`,
    category: 'Poetry',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-06-01',
    readingTime: 4,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop',
    featured: false,
    tags: ['poetry', 'travel', 'neruda', 'basho'],
  },
  {
    id: '6',
    slug: 'the-heart-sails-on',
    title: 'The Heart Sails On',
    excerpt: 'Romance novels are not escape — they are return. A defense of the genre and its power to heal.',
    content: `
## In Defense of Romance

Romance is the most read and most mocked genre in literature. It is also the most honest. While literary fiction often hides its heart behind clever prose, romance puts love front and center, where it belongs.

The genre's critics misunderstand its purpose. Romance is not about escape. It is about *return* — returning to the fundamental human need for connection, for being seen, for mattering to someone.

### The Structure of Hope

Every romance novel follows a promise: love will win. In a world that often feels chaotic and cruel, that promise is not naive. It is revolutionary.

> "Romance novels are the literature of hope, and hope is the most courageous emotion there is." — Taylor Vance

### Beyond the Stereotype

Modern romance has evolved far beyond its stereotypes. Authors like Talia Hibbert, Jasmine Guillory, and Emily Henry write stories that are funny, smart, socially aware, and deeply moving.

\`\`\`python
# The romance novel's emotional arc
romance_arc = [
    "meeting: the spark",
    "conflict: the obstacle",
    "growth: the transformation",
    "vulnerability: the truth",
    "union: love wins",
]
\`\`\`

![A romantic reading scene](https://images.unsplash.com/photo-1474932430478-36ebdb226573?w=800)

The heart sails on, regardless of the storms. That is not fantasy. That is the stubborn, beautiful truth of being human.
`,
    category: 'Romance',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-05-25',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1474932430478-36ebdb226573?w=800&h=600&fit=crop',
    featured: false,
    tags: ['romance', 'love', 'hope', 'genre defense'],
  },
  {
    id: '7',
    slug: 'echoes-of-empires',
    title: 'Echoes of Empires',
    excerpt: 'Historical fiction does not just recreate the past — it gives voice to those history forgot.',
    content: `
## The Silence of History

History is written by the victors, the literate, and the lucky. Historical fiction has the power to fill in the silences — to give voice to the women, the workers, the conquered, and the forgotten.

When Hilary Mantel wrote Wolf Hall, she did not just retell the story of Thomas Cromwell. She *reimagined* him, giving us access to his inner world in a way that no history book could.

### The Responsibility of the Novelist

Historical novelists walk a tightrope between fact and fiction. They must be faithful to what is known while imagining what is not. The best ones — like Colson Whitehead, Min Jin Lee, and Ken Follett — understand that their job is not to replace history but to *animate* it.

> "Fiction does not compete with history. It completes it." — A thought from the reading chair

### Making the Past Present

The magic of historical fiction is its ability to make the past feel immediate. When you read a novel set in ancient Rome or medieval Japan, you do not just learn about the era — you *live* in it.

\`\`\`javascript
// What historical fiction restores
const restored = {
  voices: "the silenced and the marginalized",
  emotions: "what it felt like to be there",
  daily_life: "the texture of ordinary moments",
  perspective: "multiple views of the same event"
};
\`\`\`

![Ancient ruins](https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800)

The empires have fallen, but their echoes remain — in stone, in text, and in the novels that refuse to let them be forgotten.
`,
    category: 'History',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-05-18',
    readingTime: 7,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    featured: false,
    tags: ['history', 'historical fiction', 'mantel', 'voices'],
  },
  {
    id: '8',
    slug: 'a-life-in-chapters',
    title: 'A Life in Chapters',
    excerpt: 'What biographies teach us about the art of living — and why every life is worth writing down.',
    content: `
## The Biographer's Gift

A great biography does not merely list the events of a life. It finds the narrative thread — the through-line that makes a person's existence *make sense*.

When I read Robert Caro's The Years of Lyndon Johnson, I was not just learning about a president. I was learning about ambition, power, and the American century. The biography became a lens through which I understood not just one man, but an entire era.

### Every Life is a Story

We tend to think that only the famous deserve biographies. But the best biographers know that every life contains a story worth telling. The local teacher, the immigrant grandmother, the quiet neighbor — each carries a narrative as rich as any king's.

> "Biography is the most democratic form of literature. It says: your life matters." — Taylor Vance

### The Art of Listening

Writing a biography is ultimately an act of listening — to letters, to diaries, to the memories of those who knew the subject. It is a form of resurrection through attention.

\`\`\`python
# What a biography captures
biography = {
    "events": "what happened",
    "context": "when and where it happened",
    "motivation": "why it happened",
    "emotion": "how it felt",
    "legacy": "what it means now"
}
\`\`\`

![A biography on a shelf](https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800)

Every life is written in chapters. The biographer's job is to read them aloud, so the rest of us can hear what we might have missed.
`,
    category: 'Biography',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-05-10',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=600&fit=crop',
    featured: false,
    tags: ['biography', 'memoir', 'caro', 'life stories'],
  },
  {
    id: '9',
    slug: 'the-classics-reborn',
    title: 'The Classics Reborn',
    excerpt: 'Why we keep returning to old books — and how each generation discovers new meaning in timeless texts.',
    content: `
## The Living Classic

A classic is not a book that is old. It is a book that refuses to die. Each generation returns to the classics not out of obligation, but out of need. The questions change; the answers remain relevant.

When I first read Jane Austen at sixteen, I saw romance. When I reread her at thirty, I saw economics. When I read her now, I see both — and a sharp critique of social class that feels startlingly modern.

### Why We Return

We return to classics because they grow with us. The book does not change, but we do. Each reading reveals a new layer, a new connection, a new understanding.

> "A classic is a book that has never finished saying what it has to say." — Italo Calvino

### The Modern Classic

Today's classics are being written right now. Books by Kazuo Ishiguro, Toni Morrison, and Gabriel García Márquez have already achieved the status of timeless works. They will be read centuries from now because they speak to something permanent in the human condition.

\`\`\`javascript
// What makes a classic
const classic = {
  universality: "speaks across cultures and eras",
  depth: "rewards rereading",
  influence: "shapes what comes after",
  relevance: "feels new every time",
  truth: "says something essential about being human"
};
\`\`\`

![Classic books on a shelf](https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800)

The classics are reborn every time a new reader opens them. That is their magic — they are old and new at once, ancient and alive.
`,
    category: 'Classic Literature',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-05-03',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop',
    featured: false,
    tags: ['classics', 'austen', 'calvino', 'rereading'],
  },
  {
    id: '10',
    slug: 'the-compass-and-the-page',
    title: 'The Compass and the Page',
    excerpt: 'On the intersection of travel writing and literary criticism — where the journey meets the text.',
    content: `
## Two Forms of Exploration

Travel writing and literary criticism seem like different genres, but they share a common root: both are acts of discovery. The travel writer explores the world; the critic explores the word. The best writers do both.

When I travel, I bring books. Not guidebooks — novels, poems, essays. I read the place through the literature and the literature through the place. A trip to Dublin is incomplete without Joyce. A journey to Kolkata demands Tagore.

### Reading as Travel

Every time you open a book, you cross a border. You enter a world with its own rules, its own geography, its own culture. The best books, like the best journeys, change you permanently.

> "I read the way I travel — hungrily, curiously, and always with a map in hand." — Taylor Vance

### The Travel Writer's Library

The great travel writers were always great readers. Bruce Chatwin carried notebooks filled with literary references. Pico Iyer's essays weave together literature and place so seamlessly you cannot tell where the reading ends and the traveling begins.

\`\`\`python
# The traveler's reading list
travel_library = {
    "Dublin": "James Joyce - Dubliners",
    "Kolkata": "Rabindranath Tagore - Gitanjali",
    "Tokyo": "Haruki Murakami - Norwegian Wood",
    "Cairo": "Naguib Mahfouz - Palace Walk",
    "Paris": "Hemingway - A Moveable Feast",
}
\`\`\`

![Books and a compass](https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800)

The compass and the page — two tools for the same endeavor. Both point toward the unseen. Both ask you to follow.
`,
    category: 'Travel',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-04-26',
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop',
    featured: false,
    tags: ['travel', 'literature', 'reading', 'exploration'],
  },
  {
    id: '11',
    slug: 'building-worlds-with-words',
    title: 'Building Worlds with Words',
    excerpt: 'A deep dive into the craft of worldbuilding — from magic systems to political structures to cuisine.',
    content: `
## The Worldbuilder's Toolkit

Worldbuilding is the invisible art of fantasy and science fiction. When it is done well, you do not notice it. When it is done poorly, nothing else matters.

The best worldbuilders understand that a world is not just a map and a magic system. It is economics, politics, religion, cuisine, slang, architecture, and agriculture. It is the thousand small details that make a place feel lived-in.

### Sanderson's Laws

Brandon Sanderson's three laws of magic are the foundation of modern worldbuilding:

1. An author's ability to solve conflict with magic is directly proportional to how well the reader understands said magic.
2. Limitations are greater than powers.
3. Expand on what you have already established before adding something new.

> "Worldbuilding is not about creating everything. It is about creating the *right* everything." — Taylor Vance

### The Iceberg Principle

A well-built world is like an iceberg: the reader sees ten percent, but the writer knows the other ninety. That hidden depth is what gives the visible portion its weight.

\`\`\`javascript
// The worldbuilder's checklist
const worldElements = [
  "geography & climate",
  "magic/technology system",
  "political structure",
  "economic system",
  "religion & mythology",
  "language & slang",
  "cuisine & agriculture",
  "history & conflicts",
  "art & entertainment",
  "daily life & customs"
];
\`\`\`

![A fantasy world map](https://images.unsplash.com/photo-1589834390005-5c39e6c1d9b4?w=800)

Build worlds with words, but build them with *care*. Every detail is a brick. Every brick matters. The reader may not see them all, but they will feel the structure they create.
`,
    category: 'Fantasy',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-04-19',
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1589834390005-5c39e6c1d9b4?w=800&h=600&fit=crop',
    featured: false,
    tags: ['fantasy', 'worldbuilding', 'sanderson', 'craft'],
  },
  {
    id: '12',
    slug: 'the-detectors-mind',
    title: "The Detective's Mind",
    excerpt: 'What cognitive science tells us about why we love mysteries — and what they reveal about how we think.',
    content: `
## The Psychology of Mystery

We are wired for mystery. The human brain is a pattern-seeking machine, and the mystery novel is the ultimate pattern puzzle. Every clue is a data point; every suspect is a hypothesis; every revelation is a dopamine reward.

Cognitive scientists study mystery readers to understand how the brain processes narrative. What they have found is that reading a mystery is not passive entertainment — it is active cognitive exercise.

### The Pleasure of the Puzzle

There is a specific pleasure in being *almost right*. When you solve a mystery one step before the detective, your brain rewards you. When the solution surprises you, your brain rewards you differently. Either way, you win.

> "The mystery novel is a gym for the mind. Every chapter is a rep." — Taylor Vance

### From Poe to the Present

The detective story has evolved from Poe's cerebral Dupin to the hard-boiled noir of Chandler to the cozy mysteries of today. But the core appeal remains: the satisfaction of order emerging from chaos.

\`\`\`python
# The cognitive stages of reading a mystery
stages = [
    "encounter: a crime disrupts the world",
    "inquiry: gathering clues and suspects",
    "hypothesis: forming a theory",
    "revision: new evidence changes everything",
    "revelation: the pattern becomes clear",
    "satisfaction: order is restored"
]
\`\`\`

![A detective's desk](https://images.unsplash.com/photo-1551029506-0807df8e2105?w=800)

The detective's mind is our mind, sharpened and focused. We read mysteries to remember that chaos can be understood, that every puzzle has a solution, and that the truth is always waiting to be found.
`,
    category: 'Mystery',
    author: 'Taylor Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: '2026-04-12',
    readingTime: 6,
    image: 'https://images.unsplash.com/photo-1551029506-0807df8e2105?w=800&h=600&fit=crop',
    featured: false,
    tags: ['mystery', 'cognitive science', 'poe', 'psychology'],
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    name: 'Elena Marsh',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    date: '2026-06-30',
    content: 'This piece completely changed how I look at fantasy maps. I spent an hour last night just studying the map in my copy of The Way of Kings. Beautifully written!',
  },
  {
    id: '2',
    name: 'James Okonkwo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    date: '2026-06-29',
    content: 'The point about maps as emotional landmarks really resonated with me. I have been tracking Frodo\'s journey on the map since I was twelve, and it never gets old.',
  },
  {
    id: '3',
    name: 'Sofia Reyes',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a6e24a3?w=100&h=100&fit=crop',
    date: '2026-06-28',
    content: 'I would love to see a follow-up about sci-fi worldbuilding. The way Dune handles maps and ecology is fascinating. Great article as always, Taylor!',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Margaret Chen',
    role: 'Book Club Leader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Nomad Tome has become required reading for our book club. Taylor\'s insights have sparked the best discussions we have had in years. Every post feels like a journey.',
    rating: 5,
  },
  {
    id: '2',
    name: 'David Park',
    role: 'Librarian',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'As a librarian, I read a lot of book blogs. Nomad Tome stands out for its depth, its warmth, and its genuine love of literature. I recommend it to patrons constantly.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amara Johnson',
    role: 'Author',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Taylor Vance writes about books the way the best authors write about life — with curiosity, empathy, and an eye for the detail that changes everything. This blog is a treasure.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Liam Murphy',
    role: 'English Teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'I use Nomad Tome posts in my classroom regularly. They show my students that literary criticism can be accessible, passionate, and fun. Taylor makes reading feel like an adventure.',
    rating: 5,
  },
];

export const timelineEvents: TimelineEvent[] = [
  { year: '2015', title: 'The First Page', description: 'Began a personal book journal that would eventually become Nomad Tome, documenting every book read on a year-long backpacking trip across Southeast Asia.' },
  { year: '2017', title: 'The Library Aisles', description: 'Volunteered at a small-town library in Vermont, discovering a passion for connecting readers with books that would change their lives.' },
  { year: '2019', title: 'The Launch', description: 'Published the first Nomad Tome blog post — a review of The Shadow of the Wind that received 10,000 reads in its first week.' },
  { year: '2021', title: 'The Expedition Grows', description: 'Reached 50,000 subscribers and launched the newsletter, "Join the Expedition," now read by literary adventurers in 40+ countries.' },
  { year: '2023', title: 'The Book Deal', description: 'Signed a deal with a major publisher for "Charting Fictional Worlds," a nonfiction book about the geography of imagination in literature.' },
  { year: '2026', title: 'The Journey Continues', description: 'Now writing full-time, traveling to literary festivals worldwide, and building a community of readers who believe every book is a journey.' },
];

export const skills: Skill[] = [
  { name: 'Literary Criticism', level: 95 },
  { name: 'Travel Writing', level: 90 },
  { name: 'Genre Analysis', level: 88 },
  { name: 'Creative Nonfiction', level: 92 },
  { name: 'Editorial Writing', level: 85 },
  { name: 'Book Curation', level: 93 },
];

export const achievements: Achievement[] = [
  { title: 'Subscribers', value: '75K+', description: 'Readers across 40+ countries' },
  { title: 'Blog Posts', value: '250+', description: 'Literary expeditions published' },
  { title: 'Books Reviewed', value: '500+', description: 'Across all genres and eras' },
  { title: 'Years Writing', value: '7+', description: 'Of literary adventures' },
];
