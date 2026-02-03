type Player = {
  id: number;
  name: string;
  points: number;
  rulesApplied: string[];
  eliminated?: boolean;
  juryMember?: boolean;
  finalRank: number;
  immunity?: boolean;
};

const players: Player[] = [
  {
    id: 1,
    name: "Jenna Lewis-Dougherty",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 2,
    name: "Colby Donaldson",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 3,
    name: "Stephenie LaGrossa Kendrick",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 4, name: "Cirie Fields", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 5, name: "Ozzy Lusth", points: 0, rulesApplied: [], finalRank: 24 },
  {
    id: 6,
    name: 'Benjamin "Coach" Wade',
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 7, name: "Aubry Bracco", points: 0, rulesApplied: [], finalRank: 24 },
  {
    id: 8,
    name: "Chrissy Hofbeck",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 9,
    name: "Christian Hubicki",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 10,
    name: "Angelina Keeley",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 11, name: "Mike White", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 12, name: "Rick Devens", points: 0, rulesApplied: [], finalRank: 24 },
  {
    id: 13,
    name: "Jonathan Young",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 14,
    name: "Dee Valladares",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 15, name: "Emily Flippen", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 16, name: "Q Burdette", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 17, name: "Tiffany Ervin", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 18, name: "Charlie Davis", points: 0, rulesApplied: [], finalRank: 24 },
  {
    id: 19,
    name: "Genevieve Mushaluk",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  {
    id: 20,
    name: "Kamilla Karthigesu",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 21, name: "Kyle Fraser", points: 0, rulesApplied: [], finalRank: 24 },
  { id: 22, name: "Joe Hunter", points: 0, rulesApplied: [], finalRank: 24 },
  {
    id: 23,
    name: "Savannah Louie",
    points: 0,
    rulesApplied: [],
    finalRank: 24,
  },
  { id: 24, name: "Rizo Velovic", points: 0, rulesApplied: [], finalRank: 24 },
];

export { type Player, players };
