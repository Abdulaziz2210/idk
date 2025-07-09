// Test data structure for 10 reading and listening tests
export interface ListeningTest {
  id: number
  title: string
  sections: {
    section1: ListeningQuestion[]
    section2: ListeningQuestion[]
    section3: ListeningQuestion[]
    section4: ListeningQuestion[]
  }
  answers: string[]
  audioUrl: string
}

export interface ReadingTest {
  id: number
  title: string
  passages: {
    passage1: ReadingPassage
    passage2: ReadingPassage
    passage3: ReadingPassage
  }
  answers: string[]
}

export interface ListeningQuestion {
  questionNumber: number
  questionText: string
  questionType: "fill-in-blank" | "multiple-choice" | "matching" | "map-labeling"
  options?: string[]
}

export interface ReadingPassage {
  title: string
  content: string
  questions: ReadingQuestion[]
}

export interface ReadingQuestion {
  questionNumber: number
  questionText: string
  questionType: "true-false-not-given" | "multiple-choice" | "fill-in-blank" | "matching"
  options?: string[]
}

// All 10 Listening Tests
export const allListeningTests: ListeningTest[] = [
  {
    id: 1,
    title: "IELTS Listening Test 1",
    audioUrl: "/audio/listening-test-1.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "No experience necessary. Also need people who can ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Meetings 6-8 p.m. every ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "Membership costs: Standard: £40 (includes a ___ once a year)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Over 60s or unemployed: £___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "Youth group: for people aged ___ years old and under",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "Shows • mostly plays by ___ authors",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "• family show in December (raises money for children's ___)",
          questionType: "fill-in-blank",
        },
      ],
      section2: [
        {
          questionNumber: 8,
          questionText: "The speaker stresses the importance to Clifton Bird Park of",
          questionType: "multiple-choice",
          options: [
            "A birds that are now endangered",
            "B birds from all over the world",
            "C birds that are common in the local area",
          ],
        },
        {
          questionNumber: 9,
          questionText: "People who volunteer to help with gardening at the park",
          questionType: "multiple-choice",
          options: [
            "A must work at weekends",
            "B need to come at least once a month",
            "C will only be required in the busy season",
          ],
        },
        {
          questionNumber: 10,
          questionText: "According to the speaker, who would be the ideal gardening volunteer?",
          questionType: "multiple-choice",
          options: [
            "A someone who can work independently",
            "B someone who is willing to work in any weather",
            "C someone who knows a lot about plants",
          ],
        },
      ],
      section3: [
        {
          questionNumber: 11,
          questionText: "Why do Andrew and Sarah decide to mention the Mountain Code?",
          questionType: "multiple-choice",
          options: [
            "A It is the most relevant to their field trip",
            "B It also applies to caves",
            "C It covers the whole country",
          ],
        },
        {
          questionNumber: 12,
          questionText: "Andrew suggests some field trip participants harm the environment because",
          questionType: "multiple-choice",
          options: [
            "A they fail to recognize rare species of plant",
            "B they don't realise how fragile the environment is",
            "C they get too absorbed in their tasks",
          ],
        },
      ],
      section4: [
        {
          questionNumber: 13,
          questionText: "Some people think using ___ is better than theory",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 14,
          questionText: "But a lot of advice is simply a ___",
          questionType: "fill-in-blank",
        },
      ],
    },
    answers: [
      "CLUBS",
      "TUESDAY",
      "DINNER",
      "15",
      "16",
      "MODERN",
      "HOSPITAL",
      "A",
      "B",
      "A",
      "A",
      "B",
      "LOGIC",
      "GUESS",
    ],
  },
  {
    id: 2,
    title: "IELTS Listening Test 2",
    audioUrl: "/audio/listening-test-2.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "'Modern Yoga' is good for losing ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "'Yoga and More' is beneficial for those with aches in their ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "'Original Yoga' is great for ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Participants should bring a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "The Wednesday class focuses on difficult routines and ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "The Thursday class is preparing for a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "Parents bring a ___ to be shared",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "It's best to go before ___ instead of later",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "High-impact aerobics helps maintain a strong ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Can pay online or at ___ in the centre",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["WEIGHT", "BACK", "BEGINNERS", "MAT", "JUMPS", "COMPETITION", "SNACK", "WORK", "HEART", "RECEPTION"],
  },
  {
    id: 3,
    title: "IELTS Listening Test 3",
    audioUrl: "/audio/listening-test-3.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "Members' details are on a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Type of music represented: modern music (___ and jazz)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "Newsletter comes out once a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Cost of adult membership: £___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "Current number of members: ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "Facilities include: rehearsal rooms and a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "There is no charge for ___ advice",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "To become a member, send a recent ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "Address: 707, ___ Street, Marbury",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Contact email: music.___@bsu.co.uk",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["DATABASE", "ROCK", "MONTH", "45", "750", "STUDIO", "LEGAL", "RECORDING", "KIPPAX", "TALENT"],
  },
  {
    id: 4,
    title: "IELTS Listening Test 4",
    audioUrl: "/audio/listening-test-4.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText:
            "Job involves being with children for 24 hours per day. General counsellors - need experience of working with children as a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Specialist counsellors could use skills in: sport, e.g. ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "Job in summer camp lasts for ___ weeks",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Job starts in ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "First week of job is used for ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "Officially, counsellors must be at least ___ years old",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "Salary: ___ US $",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "Must pay for: own ___ (£138)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "a ___ check in UK (£36)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Can get a ___ on travel in America after summer camp",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["LEADER", "TENNIS", "EIGHT", "JUNE", "TRAINING", "19", "985", "INSURANCE", "POLICE", "DISCOUNT"],
  },
  {
    id: 5,
    title: "IELTS Listening Test 5",
    audioUrl: "/audio/listening-test-5.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "Contact person: Sally ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Kitchen needs a bigger window. The kitchen is too hot - fit a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "Bathroom: put a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "decide the ___ on the back wall of the small tiles later",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "Outside: put a higher ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "put a new ___ on the garage door",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "fix the roof - it was damaged by a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "fit a new rain gutter made of ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "Start date: ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Security code: ___",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["KEYWORTH", "FAN", "SHOWER", "COLOR", "GATE", "LOCK", "STORM", "PLASTIC", "MAY 8", "AG4176"],
  },
  {
    id: 6,
    title: "IELTS Listening Test 6",
    audioUrl: "/audio/listening-test-6.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "June 19th 7 p.m. Concert the ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "June 20th ___ p.m. tour",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "the ___ includes a visit to an old flour mill",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "June 21st all day children's ___ competition",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "bring a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "June 21st evening fireworks by the ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "This year, activities end by ___ p.m.",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "There won't be any ___ in the town centre this year",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "The festival's web address is www.___.com",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Festival organisers would like to receive ___ online",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["THEATRE", "4.30", "STATION", "PAINTING", "PLATE", "RIVER", "11:15", "PARKING", "EVENTS", "FEEDBACK"],
  },
  {
    id: 7,
    title: "IELTS Listening Test 7",
    audioUrl: "/audio/listening-test-7.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "General counsellors - need experience of working with children as a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Specialist counsellors could use skills in: sport, e.g. ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "Job in summer camp lasts for ___ weeks",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Job starts in ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "First week of job is used for ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "Officially, counsellors must be at least ___ years old",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "Salary: ___ US $",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "Must pay for: own ___ (£138)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "a ___ check in UK (£36)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Can get a ___ on travel in America after summer camp",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["LEADER", "TENNIS", "EIGHT", "JUNE", "TRAINING", "19", "985", "INSURANCE", "POLICE", "DISCOUNT"],
  },
  {
    id: 8,
    title: "IELTS Listening Test 8",
    audioUrl: "/audio/listening-test-8.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "A wooden ___ (a model)",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "helps children to understand basic ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "A ___ feeder",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "price: £___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "kit includes chocolate, moulds and some small ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "helps children to understand effects of ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "web address - www.___.com",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "order before Friday to get free ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "under 'Packaging options' choose ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "possible to include a ___",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["TRUCK", "TECHNOLOGY", "BIRD", "8.99", "BOXES", "TEMPERATURE", "RIMONA", "POSTAGE", "GIFT", "MESSAGE"],
  },
  {
    id: 9,
    title: "IELTS Listening Test 9",
    audioUrl: "/audio/listening-test-9.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "Basic cabin kitchen has a fridge and a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Standard cabin close to ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "fully-equipped kitchen and a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "Standard Plus facing the ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "discount of ___% for bookings over ten nights",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "The children can play ___ for free",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "It's possible to hire equipment for ___ for an afternoon",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "The children could visit the local ___ on Saturday and Sunday",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "There are guided tours of the ___ every evening to see the birds",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "Contact ___ to confirm the booking",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: ["MICROWAVE", "RECEPTION", "SHOWER", "LAKE", "18", "TENNIS", "FISHING", "FARM", "FOREST", "ARATAKI"],
  },
  {
    id: 10,
    title: "IELTS Listening Test 10",
    audioUrl: "/audio/listening-test-10.mp3",
    sections: {
      section1: [
        {
          questionNumber: 1,
          questionText: "Date of birth: ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 2,
          questionText: "Contact tel. no.: ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 3,
          questionText: "wants to travel in ___ Europe",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 4,
          questionText: "hopes to travel by ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 5,
          questionText: "interested in working in a ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 6,
          questionText: "recommended to consider an alternative e.g. ___",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 7,
          questionText: "advised to buy a European ___ for travelling",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 8,
          questionText: "given a ___ with accommodation details",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 9,
          questionText: "agreed to take out ___ from the Agency",
          questionType: "fill-in-blank",
        },
        {
          questionNumber: 10,
          questionText: "told to use an ___ for contacting people",
          questionType: "fill-in-blank",
        },
      ],
      section2: [],
      section3: [],
      section4: [],
    },
    answers: [
      "30TH MARCH",
      "0903775115",
      "NORTHERN",
      "TRAIN",
      "HOTEL",
      "FARM",
      "PASS",
      "BOOKLET",
      "INSURANCE",
      "INTERNET CAFE",
    ],
  },
]

// All 10 Reading Tests
export const allReadingTests: ReadingTest[] = [
  {
    id: 1,
    title: "IELTS Reading Test 1",
    passages: {
      passage1: {
        title: "The Origin of Paper",
        content: `The word paper derives from the Greek term for the ancient Egyptian writing material called papyrus. In about 2400 BC, the Egyptians discovered how to make a writing surface out of papyrus, a type of reed that grows along waterways in southern Europe and North Africa. The Egyptians cut the plant into strips which they softened in water. Papyrus was cross-woven into a mat and then pounded into a hard thin sheet.

As the papyrus plant requires subtropical conditions to grow, papyrus was not much used in Europe at that time; instead, the main material used for writing was parchment. This was made from animal skin and was extremely expensive. In fact, it has been estimated that a single book written on parchment required the skins of 300 sheep. The skins had to be specifically prepared by drying them and they were then stretched on a special frame. It is not known when parchment was first introduced, but it was the main writing material in Europe for hundreds of years.

Paper, which is made from pulp, rags, and fibers of plants, seems to have been invented in China and is considered to be one of the Four Great Inventions of Ancient China. In 105 AD, under the Han Dynasty emperor Ho-Ti, a government official in China named Ts'ai Lun was the first to start a papermaking industry. Ts'ai Lun seems to have made his paper by mixing finely chopped mulberry bark and hemp rags with water, mashing the mixture flat with a stone mortar, and then pressing out the water and letting it dry in the sun. He may have based his idea on bark cloth, which was very common in China and also made from mulberry.`,
        questions: [
          {
            questionNumber: 1,
            questionText: "In Ancient China, writing was occasionally done on silk.",
            questionType: "true-false-not-given",
          },
          {
            questionNumber: 2,
            questionText: "Coloured paper was invented during the Tang Dynasty.",
            questionType: "true-false-not-given",
          },
          {
            questionNumber: 3,
            questionText: "Papermakers from Samarkand were captured by the Chinese.",
            questionType: "true-false-not-given",
          },
          {
            questionNumber: 4,
            questionText: "Papermaking as a large-scale industry originated in Iran.",
            questionType: "true-false-not-given",
          },
          {
            questionNumber: 5,
            questionText: "Papermaking skills were brought to Europe via North Africa.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "A new look for Talbot Park",
        content: `Talbot Park, a housing project in Auckland, New Zealand, was once described as a ghetto, troubled by high rates of crime and vandalism. However, it has just been rebuilt at a cost of $48m and the project reflects some new thinking about urban design.

The new Talbot Park is immediately eye-catching because the buildings look quite different to other state housing projects in Auckland. 'There is no reason why state housing should look cheap in my view,' says architect Neil Cotton, one of the design team. 'In fact, I was anticipating a backlash by those who objected to the quality of what is provided with government money.' The tidy brick and wood apartments and townhouses would not look out of place in some of the city's most affluent suburbs and this is a central theme of the Talbot Park philosophy.`,
        questions: [
          {
            questionNumber: 6,
            questionText: "What was the main problem with the original Talbot Park?",
            questionType: "multiple-choice",
            options: [
              "A High crime rates",
              "B Poor building quality",
              "C Lack of community spirit",
              "D Inadequate funding",
            ],
          },
          {
            questionNumber: 7,
            questionText: "According to Neil Cotton, state housing should:",
            questionType: "multiple-choice",
            options: [
              "A Be built as cheaply as possible",
              "B Look as good as private housing",
              "C Only use government money",
              "D Be located in affluent areas",
            ],
          },
        ],
      },
      passage3: {
        title: "The Analysis of Fear",
        content: `Over the years, the majority of people acquire a range of skills for coping with frightening situations. They will attempt to placate a vexed teacher or boss and will shout and run when chased by a hostile stranger. But some individuals become overwhelmed in circumstances others would consider only minimally stressful: fear of ridicule might cause them to shake uncontrollably when called on to speak in a group, or terror of strangers might lead them to hide at home, unable to work or shop for groceries. Why do certain people fall prey to excessive fear?

Ned H. Kahn and Steven E. Shelton at the University of Wisconsin-Madison are addressing this problem by identifying specific brain processes that regulate fear and its associated behaviors. Despite the availability of non-invasive computer imaging techniques, such information is still extremely difficult to obtain in humans. Hence, they have turned their attention to another primate, the rhesus monkey.`,
        questions: [
          {
            questionNumber: 8,
            questionText: "In the first paragraph, the writer points out that",
            questionType: "multiple-choice",
            options: [
              "A fear and stress are different feelings",
              "B most humans develop strategies for dealing with fear",
              "C business situations cause more fear than others",
              "D some people never experience fear",
            ],
          },
          {
            questionNumber: 9,
            questionText: "When discussing the use of rhesus monkeys as experimental subjects, the writer notes that",
            questionType: "multiple-choice",
            options: [
              "A they react more quickly to fear than humans",
              "B they are more influenced by fear than humans",
              "C their mental growth resembles that of humans",
              "D their brains work more slowly than those of humans",
            ],
          },
        ],
      },
    },
    answers: ["TRUE", "FALSE", "FALSE", "TRUE", "TRUE", "A", "B", "B", "C"],
  },
  {
    id: 2,
    title: "IELTS Reading Test 2",
    passages: {
      passage1: {
        title: "Socotra Island",
        content:
          "Situated in the Arabian Sea off the Arabian Peninsula is the Socotra archipelago, a remnant of an ancient landmass that became separated from Africa and Arabia 18 million years ago. When scientists began the first substantial exploration of the islands 30 years ago, they found a fascinating collection of unusual plants and animals - a unique combination of 'relict' populations (organisms that have become extinct elsewhere) and species that have evolved to cope with the island's harsh conditions.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Scientists found species on the islands that had died out in other countries.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "The development of television and its introduction in Britain",
        content:
          "The possibility of seeing events without being present at them was a dream of humanity for countless centuries. When the telephone emerged as a practical device in the late 1870s, the idea of also 'seeing by electricity' caught the public imagination.",
        questions: [
          {
            questionNumber: 2,
            questionText: "The telephone was invented in the 1870s.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "The hazards of multitasking",
        content:
          "Doing more than one thing at once - is it always a good idea? You arrive at the office, review your to-do list and start to feel a headache coming on.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Multitasking can cause physical symptoms.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  // Continue with tests 3-10 with similar structure...
  {
    id: 3,
    title: "IELTS Reading Test 3",
    passages: {
      passage1: {
        title: "The last man who knew everything",
        content:
         `
  In the 21st century, it would be quite impossible for even the most learned man to know everything. However, as recently as the 18th century, there were those whose knowledge encompassed most of the information available at that time. This is a review of a biography of one such man.

  Thomas Young (1773–1829) contributed 63 articles to the great British encyclopaedia, Encyclopaedia Britannica, including 46 biographical entries (mostly on scientists and classical scholars), and substantial essays on 'Bridge' (a card game), 'Egypt', 'Languages' and 'Tides'. Was someone who could write authoritatively about so many subjects a genius, or a dilettante?* In an ambitious biography, Andrew Robinson argues that Young is a good contender to be described as 'the last man who knew everything'. Young has competition, however: the phrase which Robinson uses as the title of his biography of Young also serves as the subtitle of two other recent biographies: Leonard Warren's 1998 life of palaeontologist Joseph Leidy (1823–1891) and Paula Findlen's 2004 book on Athanasius Kircher (1602–1680).

  Young, of course, did more than write encyclopaedia entries. He presented his first paper, on the human eye, to the prestigious academic institution, the Royal Society of London** at the age of 20 and was elected a Fellow of the Society shortly afterwards. In the paper, which seeks to explain how the eye focuses on objects at varying distances, Young hypothesised that this was achieved by changes in the shape of the lens. He also theorised that light travels in waves, and believed that, to be able to see in colour, there must be three receptors in the eye corresponding to the three 'principal colours' (red, green and violet) to which the retina could respond. All these hypotheses were subsequently proved to be correct. Later in his life, when he was in his forties, Young was instrumental in cracking the code that unlocked the unknown script on the Rosetta Stone, a tablet found in Egypt by the Napoleonic army in 1799. The stone has text in three alphabets: Greek, Egyptian hieroglyphs, and something originally unrecognisable. The unrecognisable script is now known as 'demotic' and, as Young deduced, is related directly to Egyptian hieroglyphs. His initial work on this appeared in the Britannica entry 'Egypt'. In another entry, Young coined the term 'Indo-European' to describe the family of languages spoken throughout most of Europe and northern India. These works are the landmark achievements of a man who was a child prodigy but who, unlike many remarkable children, did not fade into obscurity as an adult.

  Born in 1773 in Somerset in England, Young lived with his maternal grandfather from an early age. He devoured books from the age of two and excelled at Latin, Greek, mathematics and natural philosophy (the 18th-century term for science). After leaving school, he was greatly encouraged by Richard Brocklesby, a physician and Fellow of the Royal Society. Following Brocklesby's lead, Young decided to pursue a career in medicine. He studied in London and then moved on to more formal education in Edinburgh, Göttingen and Cambridge. After completing his medical training at the University of Cambridge in 1808, Young set up practice as a physician in London and a few years later was appointed physician at St. George's Hospital.

  Young's skill as a physician, however, did not equal his talent as a scholar of natural philosophy or linguistics. In 1801, he had been appointed to a professorship of natural philosophy at the Royal Institution, where he delivered as many as 60 lectures a year. His opinions were requested by civic and national authorities on matters such as the introduction of gas lighting to London streets and methods of ship construction. From 1819, he was superintendent of the Nautical Almanac and secretary to the Board of Longitude. Between 1816 and 1825, he contributed many entries to the Encyclopaedia Britannica, and throughout his career he authored numerous other essays, papers and books.

  Young is a perfect subject for a biography — perfect, but daunting. Few men contributed so much to so many technical fields. Robinson's aim is to introduce non-scientists to Young's work and life. He succeeds, providing clear expositions of the technical material (especially that on optics and Egyptian hieroglyphs). Some readers of this book will, like Robinson, find Young's accomplishments impressive; others will see him as some historians have — as a dilettante. Yet despite the rich material presented in this book, readers will not end up knowing Young personally. We catch glimpses of a playful Young, doodling Greek and Latin phrases in his notes on medical lectures and translating the verses that a young lady had written on the walls of a summerhouse into Greek elegiacs. Young was introduced into elite society, attended the theatre and learned to dance and play the flute. In addition, he was an accomplished horseman. However, his personal life looks pale next to his vibrant career and studies.

  Young married Eliza Maxwell in 1804, and according to Robinson, 'their marriage was happy and she appreciated his work'. Almost all we know about her is that she sustained her husband through some rancorous disputes about optics and that she worried about money when his medical career was slow to take off. Little evidence survives concerning the complexities of Young's relationships with his mother and father. Robinson does not credit them with shaping Young's extraordinary mind. Despite the lack of details concerning Young's relationships, however, anyone interested in what it means to be a genius should read this book.`,
        questions: [
          {
            questionNumber: 1,
            questionText: "Other people have been referred to as 'the last man who knew everything'.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "The fashion industry",
        content:
          `
A The fashion industry is a multibillion-dollar global enterprise devoted to the business of making and selling clothes. It encompasses all types of garments, from designer fashions to ordinary everyday clothing. Because data on the industry are typically reported for national economies, and expressed in terms of its many separate sectors, total figures for world production of textiles* and clothing are difficult to obtain. However, by any measure, the industry accounts for a significant share of world economic output.

B The fashion industry is a product of the modern age. Prior to the mid-19th century, virtually all clothing was handmade for individuals, either as home production or on order from dressmakers and tailors. By the beginning of the 20th century, with the development of new technologies such as the sewing machine, the development of the factory system of production, and the growth of department stores and other retail outlets, clothing had increasingly come to be mass-produced in standard sizes, and sold at fixed prices. Although the fashion industry developed first in Europe, today it is highly globalised, with garments often designed in one country, manufactured in another, and sold in a third. For example, an American fashion company might source fabric in China and have the clothes manufactured in Vietnam, finished in Italy, and shipped to a warehouse in the United States for distribution to retail outlets internationally.

C One of the first accomplishments of the Industrial Revolution in the 18th century was the partial automation of the spinning and weaving of wool, cotton, silk and other natural fibres. Today, these processes are highly automated and carried out by computer-controlled, high-speed machinery, and fabrics made from both natural fibres and synthetic fibres (such as nylon, acrylic, and polyester) are produced. A growing interest in sustainable fashion (or 'eco-fashion') has led to greater use of environmentally friendly fibres, such as hemp. In addition, high-tech synthetic fabrics offer such properties as moisture absorption, stain resistance, retention or dissipation of body heat, and protection against fire, weapons, cold, ultraviolet radiation, and other hazards. Fabrics are also produced with a wide range of visual effects through dyeing, weaving, printing, and other processes. Together with fashion forecasters, fabric manufacturers work well in advance of the clothing production cycle, to create fabrics with colours, textures, and other qualities that anticipate consumer demand.

D Historically, very few fashion designers have become famous brands such as Coco Chanel or Calvin Klein, who have been responsible for prestigious high-fashion collections. These designers are influential in the fashion world, but, contrary to popular belief, they do not dictate new fashions; rather, they endeavour to design clothes that will meet consumer demand. The vast majority of designers work in anonymity for manufacturers, as part of design teams, adapting designs into marketable garments for average consumers. They draw inspiration from a wide range of sources, including film and television costumes, street clothing, and active sportswear.

The fashion industry's traditional design methods, such as paper sketches and the draping of fabric on mannequins, have been supplemented or replaced by computer-assisted design techniques. These allow designers to rapidly make changes to a proposed design, and instantaneously share the proposed changes with colleagues – whether they are in the next room or on another continent.

E An important stage in garment production is the translation of the clothing design into templates, in a range of sizes, for cutting the cloth. Because the proportions of the human body change with increases or decreases in weight, templates cannot simply be scaled up or down. Template making was traditionally a highly skilled profession. Today, despite innovations in computer programming, designs in larger sizes are difficult to adjust for every body shape. Whatever the size, the template – whether drawn on paper or programmed as a set of computer instructions – determines how fabric is cut into the pieces that will be joined to make a garment. For all but the most expensive clothing, fabric cutting is accomplished by computer-guided knives or high-intensity lasers that can cut many layers of fabric at once.

F The next stage of production is the assembly process. Some companies use their own production facilities for some or all of the manufacturing process, but the majority rely on separately owned manufacturing firms or contractors to produce garments to their specifications. In the field of women's clothing, manufacturers typically produce several product lines a year, which they deliver to retailers on predetermined dates. Technological innovation, including the development of computer-guided machinery, has resulted in the automation of some stages of assembly. Nevertheless, the fundamental process of sewing remains labour-intensive. In the late 20th century, China emerged as the world's largest producer of clothing because of its low labour costs and highly disciplined workforce.

Assembled items then go through various processes collectively known as 'finishing'. These include the addition of decorative elements, fasteners, brand-name labels, and other labels (often legally required) specifying fibre content, laundry instructions, and country of manufacture. Finished items are then pressed and packed for shipment.

G For much of the period following World War II, trade in textiles and garments was strictly regulated by purchasing countries, which imposed quotas and tariffs. Since the 1980s, these protectionist measures, which were intended (ultimately without success) to prevent textile and clothing production from moving from high-wage to low-wage countries, have gradually been abandoned. They have been replaced by a free-trade approach, under the regulatory control of global organisations. The advent of metal shipping containers and relatively inexpensive air freight have also made it possible for production to be closely tied to market conditions, even across globe-spanning distances.`,
        questions: [
          {
            questionNumber: 2,
            questionText: "The fashion industry only deals with expensive clothing.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "How a prehistoric predator took to the skies",
        content:
          `
 Is that a bird in the sky? A plane? No, it's a pterosaur. Kate Thomas meets Professor Matthew Wilkinson, who built a life-size model to find out how this prehistoric predator ever got off the ground.

 Pterosaurs existed from the Triassic period, 220 million years ago, to the end of the Cretaceous period, 65 million years ago, when South America pulled away from Africa and the South Atlantic was formed. They are among the least understood of all the extinct reptiles that once spent their lives in the skies while the dinosaurs dominated the land. Pterosaurs had no feathers, but at least part of their bodies was covered in hair, not unlike bats. Some believe this is an indication they were warm-blooded. Researchers also debate whether pterosaurs travelled on the ground by walking on their hind legs, like birds, or by using all fours, relying on their three-toed front feet as well as their four-toed rear feet.

 Pterosaurs were vertebrates, meaning they were the first species possessing backbones to become airborne, but scientists have never quite understood their flight technique. How, they wondered, did such a heavy creature ever manage to take off? How could a wing that appears to have been supported by fine, hollow bones have carried one into the sky? Then came the discovery of a site in Brazil's Araripe basin. Here, not only were hundreds of fossils of amphibians* and other reptiles found, but archaeologists unearthed a number of very well-preserved pterosaurs. The anhanguera – a fish-eating sub-species of pterosaur that ruled the skies in the Cretaceous period – was among them. With a wingspan of up to 12 metres, they would have made an amazing sight in the sky – had any human been there to witness it. 'I've been studying pterosaurs for about eight years now,' says Dr Matthew Wilkinson, a professor of zoology at Cambridge University. With an anhanguera fossil as his model, Wilkinson began gradually reconstructing its skeletal structure in his Cambridge studio. The probability of finding three-dimensional pterosaur fossils anywhere is slim. 'That was quite a find,' he says. 'Their bones are usually crushed to dust.' Once the structure was complete, it inspired him to make a robot version as a way to understand the animal's locomotion. With a team of model-makers, he has built a remote-controlled pterosaur in his studio. 'Fossils show just how large these creatures were. I've always been interested in how they managed to launch themselves, so I thought the real test would be to actually build one and fly it.'

 Wilkinson hasn't been alone in his desire to recreate a prehistoric beast. Swiss scientists recently announced they had built an amphibious robot that could walk on land and swim in water using the sort of backbone movements that must have been employed by the first creatures to crawl from the sea. But Wilkinson had the added complication of working out his beast's flight technique. Unlike those of bats or flying squirrels, pterosaur wings – soft, stretchy membranes of skin tissue – are thought to have reached from the chest right to the ankle, reinforced by fibres that stiffened the wing and prevented tearing. Smaller subspecies flapped their wings during takeoff. That may have explained the creatures' flexibility, but it did not answer the most pressing question: how did such heavy animals manage to launch themselves into the sky? Working with researchers in London and Berlin, Wilkinson began to piece together the puzzle.

 It emerged that the anhanguera had an elongated limb called the pteroid. It had previously been thought the pteroid pointed towards the shoulder of the creature and supported a soft forewing in front of the arm. But if that were the case, the forewing would have been too small and ineffectual for flight. However, to the surprise of many scientists, fossils from the Araripe basin showed the pteroid possibly faced the opposite way, creating a much greater forewing that would have caught the air, working in the same way as the flaps on the wings of an aeroplane. So, with both feet on the ground, the anhanguera might have simply faced into the wind, spread its wings and risen up into the sky. Initial trials in wind tunnels proved the point – models of pterosaurs with forward-facing pteroids were not only adept at gliding, but were agile flyers in spite of their size. 'This high-lift capability would have significantly reduced the minimum flight speed, allowing even the largest forms to take off without difficulty,' Wilkinson says. 'It would have enabled them to glide very slowly and may have been instrumental in the evolution of large size by the pterosaurs.'

 Resting in the grass at the test site near Cambridge, the robot-model's wings ripple in the wind. In flight, the flexible membrane, while much stiffer than the real thing, allows for a smooth takeoff and landing. But the model has been troubled by other mechanical problems. 'Unlike an aircraft, which is stabilised by the tail wing at the back, the model is stabilised by its head, which means it can start spinning around. That's the most problematic bit as far as we're concerned,' Wilkinson says. 'We've had to take it flying without the head so far.' When it flies with its head attached, Wilkinson will finally have proved his point.

 So what's next for the zoologist – perhaps a full-size Tyrannosaurus rex? 'No,' he tells me. 'We're desperate to build really big pterosaurs. I'm talking creatures with even greater wingspans, weighing a quarter of a ton. But,' he adds, just as one begins to fear for the safety and stress levels of pilots landing nearby at Cambridge City Airport, 'it's more likely we'll start off with one of the smaller, flapping pterosaurs.' This is certainly more reassuring. Let's hope he is content to leave it at that.`,
        questions: [
          {
            questionNumber: 3,
            questionText: "Pterosaurs lived for millions of years.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "FALSE", "TRUE"],
  },
  {
    id: 4,
    title: "IELTS Reading Test 4",
    passages: {
      passage1: {
        title: "Museums and family visitors in Australia",
        content:
          "Museums in Australia have recognised the need to become more responsive to their audiences, especially families who visit museums in large numbers. Research has consistently found that positive early family visits to museums have a significant impact on later visiting habits.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Family visits to museums affect future museum attendance.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "The power of music",
        content:
          "Music is becoming ever more popular electronically. To meet our craving for music, internet sites are using increasingly sophisticated ways of putting us in touch with artists we may not even know we like.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Internet sites help people discover new music.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "Thinking for themselves",
        content:
          "In 1977 Irene Pepperberg brought Alex, a one-year-old African gray parrot, into her lab at Harvard University to teach him to reproduce the sounds of English.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Alex was a young parrot when the research began.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 5,
    title: "IELTS Reading Test 5",
    passages: {
      passage1: {
        title: "Steam across the water",
        content:
          "During the 1600s, very early in the development of steam engines, inventive spirits like the Frenchman Denis Papin dreamed of - and experimented with - boats driven by steam, rather than by the wind or human effort.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Steam-powered boats were first conceived in the 17th century.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "The economic effect of climate",
        content:
          "Dr William Masters was reading a book about mosquitoes when an idea struck him. There was this anecdote about the yellow fever epidemic that hit Philadelphia in 1793.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Dr Masters got his research idea from reading about insects.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "What makes a musical expert?",
        content:
          "Does that class of people acknowledged to be musical experts just have more of the same basic skills we are all endowed with, or do they have a set of abilities - or neural structures - that are totally different from those of the rest of us?",
        questions: [
          {
            questionNumber: 3,
            questionText: "Musical experts may have different brain structures.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 6,
    title: "IELTS Reading Test 6",
    passages: {
      passage1: {
        title: "Katherine Mansfield",
        content:
          "Katherine Mansfield Beauchamp Murry was born in 1888, into a prominent family in Wellington, New Zealand. She became one of New Zealand's best-known writers, using the pen name of Katherine Mansfield.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Katherine Mansfield was born in New Zealand.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "Creative Problem-Solving",
        content:
          "Puzzle-solving is an ancient, universal practice, scholars say, and it depends on creative insight, or a primitive spark. Now, modern neuroscientists are beginning to tap its source.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Scientists are studying how people solve puzzles.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "Some views on the use of headphones",
        content:
          "Whether wearing headphones at work, or in other areas of everyday life, is a good thing or a bad thing has generated a lot of research and opinion.",
        questions: [
          {
            questionNumber: 3,
            questionText: "There is disagreement about headphone use.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 7,
    title: "IELTS Reading Test 7",
    passages: {
      passage1: {
        title: "The Development of Exploration and Scientific Research in Antarctica",
        content:
          "The modern scientific age in Antarctica really began with the introduction of aircraft in the 1920s. Aircraft transformed the possibilities of exploring the frozen continent around the South Pole.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Aircraft revolutionized Antarctic exploration.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "Effects of changes in world population",
        content:
          "Human fertility rates around the world are dropping for a variety of complex reasons. While the population itself continues to increase, the rate of increase is slowing.",
        questions: [
          {
            questionNumber: 2,
            questionText: "World population growth is slowing down.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "The lost animals of Australia",
        content:
          "The history of Australia's animals over the past 50,000 years has been largely one of extinction. The time has been too short for new species of large animals to evolve.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Many Australian animals have become extinct.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 8,
    title: "IELTS Reading Test 8",
    passages: {
      passage1: {
        title: "Clarence Birdseye and the Development of Frozen Food",
        content:
          "Born in 1886 in New York, the American naturalist Clarence Birdseye had an instinctive curiosity, a love of food, and a strong entrepreneurial streak.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Clarence Birdseye was born in the 19th century.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "How to be Happy",
        content:
          "Psychiatrist Tony Fernando was walking down the street when he saw a group of young homeless men sitting on the footpath. As Fernando handed out gifts of food, he tried to video the men's reactions in his mind.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Tony Fernando helped homeless people.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "Asian space: return of an Asian invention",
        content:
          "Planet Earth is today circled by scores of satellites, orbiting like tiny moons after being sent aloft by rockets to perform a variety of useful tasks.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Satellites orbit the Earth.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 9,
    title: "IELTS Reading Test 9",
    passages: {
      passage1: {
        title: "Chocolate for the masses",
        content:
          "For almost three thousand years, chocolate was a drink of the elite and the wealthy, originally in South America and later on in Europe. In the early 19th century, however, chocolate became far more widely available.",
        questions: [
          {
            questionNumber: 1,
            questionText: "Chocolate was once only for rich people.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "The impact of invasive species",
        content:
          "Invasive species are among the leading threats to the native wildlife of most countries, with approximately 42 percent of endangered species at risk from them.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Invasive species threaten native wildlife.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "Mapping the Mind",
        content:
          "The often used phrase 'I'll believe it when I see it' betrays a very intimate fact of human nature. We are visual creatures and we rely on sight to serve as a judge of what is real and what is not.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Humans rely heavily on vision.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
  {
    id: 10,
    title: "IELTS Reading Test 10",
    passages: {
      passage1: {
        title: "Feeding the World",
        content:
          "The world's population continues to climb and, despite the rise of high-tech agriculture, 800 million people don't get enough to eat. Admittedly, this is often due to lack of money since the world actually produces enough for everyone.",
        questions: [
          {
            questionNumber: 1,
            questionText: "The world produces enough food for everyone.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage2: {
        title: "Insect decision-making",
        content:
          "It has long been held that decisions made collectively by large groups of people are more likely to turn out to be accurate than decisions made by individuals.",
        questions: [
          {
            questionNumber: 2,
            questionText: "Group decisions are often better than individual decisions.",
            questionType: "true-false-not-given",
          },
        ],
      },
      passage3: {
        title: "Conformity",
        content:
          "During your childhood, there will have been some kind of craze which affected all the people in your school. It may have been to do with a particular toy or possibly a must-have item of clothing.",
        questions: [
          {
            questionNumber: 3,
            questionText: "Childhood crazes are common in schools.",
            questionType: "true-false-not-given",
          },
        ],
      },
    },
    answers: ["TRUE", "TRUE", "TRUE"],
  },
]

// Helper function to get test by ID
export const getListeningTestById = (id: number): ListeningTest | undefined => {
  return allListeningTests.find((test) => test.id === id)
}

export const getReadingTestById = (id: number): ReadingTest | undefined => {
  return allReadingTests.find((test) => test.id === id)
}