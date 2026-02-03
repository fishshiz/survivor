type Rule = {
  id: number;
  name: string; // Name of rule
  points: number; // Points awarded for achieving this rule
  likelihood: number; // Likelihood of this event occurring in a given episode (0 to 1)
  repeatable?: boolean; // Whether the rule can be achieved multiple times in an episode
  appliesTo: "individual" | "team" | "all"; // Whether the rule applies to individuals, teams, or all players
  immunity?: boolean; // Whether the rule grants immunity
  eliminated?: boolean; // Whether this rule effectively eliminates the player
};

type ScoringRules = {
  first: Rule[];
  preMerge: Rule[];
  postMerge: Rule[];
  merge: Rule[];
  fire: Rule[];
  third: Rule[];
  second: Rule[];
  final: Rule[];
  all: Rule[];
};

const scoringRules: ScoringRules = {
  first: [
    {
      id: 24,
      name: "First out (2 pts)",
      points: 2,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
      eliminated: true,
    },
  ],
  preMerge: [
    {
      id: 13,
      name: "Team Immunity (5 pts)",
      points: 5,
      likelihood: 1,
      repeatable: false,
      appliesTo: "team",
      immunity: true,
    },
    {
      id: 18,
      name: "Team Reward (2 pts)", // I'm assuming this is just for the 1st place team winning the best reward
      points: 2,
      likelihood: 1,
      repeatable: false,
      appliesTo: "team",
    },
  ],
  merge: [
    {
      id: 12,
      name: "Make the jury (7 pts)",
      points: 7,
      likelihood: 1,
      repeatable: false,
      appliesTo: "all",
    },
  ],
  postMerge: [
    {
      id: 7,
      name: "Individual immunity win (7 pts)",
      points: 7,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
      immunity: true,
    },
    {
      id: 8,
      name: "Steal an immunity idol (10 pts)",
      points: 10,
      likelihood: 0.15,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 17,
      name: "Individual reward win (3 pts)",
      points: 3,
      likelihood: 1,
      appliesTo: "individual",
      repeatable: false,
    },
  ],
  fire: [
    {
      id: 5,
      name: "Win Fire (10 pts)",
      points: 10,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
      immunity: true,
    },
  ],
  final: [
    {
      id: 1,
      name: "Win sole survivor (50 pts)",
      points: 40,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
      eliminated: true,
    },
  ],
  second: [
    {
      id: 2,
      name: "Runner up (25 pts)",
      points: 25,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
      eliminated: true,
    },
  ],
  third: [
    {
      id: 3,
      name: "Third place (10 pts)",
      points: 10,
      likelihood: 1,
      appliesTo: "individual",
      repeatable: false,
      eliminated: true,
    },
  ],
  all: [
    {
      id: 4,
      name: "Save someone by playing an idol (Must receive majority of null votes, includes player playing it on themselves) (20 pts)",
      points: 20,
      likelihood: 0.15,
      appliesTo: "individual",
      repeatable: false,
    },
    {
      id: 6,
      name: "Successful shot in the dark (10 pts)",
      points: 10,
      likelihood: 0.1,
      appliesTo: "individual",
      repeatable: true,
      immunity: true,
    },
    {
      id: 9,
      name: "Acquire an active idol (10 pts)",
      points: 10,
      likelihood: 0.25,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 10,
      name: "Steal a vote (7 pts)",
      points: 7,
      likelihood: 0.25,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 11,
      name: "Blindside someone with an active idol (Part of faction voting for departing castaway) (10 pts)",
      points: 10,
      likelihood: 0.1,
      appliesTo: "team",
      repeatable: false,
      immunity: true,
    },
    {
      id: 14,
      name: "Acquire advantage (5 pts)",
      points: 5,
      likelihood: 0.25,
      repeatable: false,
      appliesTo: "individual",
    },
    {
      id: 15,
      name: "Use advantage successfully (5 pts)",
      points: 5,
      likelihood: 0.25,
      repeatable: false,
      appliesTo: "individual",
    },
    {
      id: 16,
      name: "Group vote on MVP of episode (Cast after every episode, can't vote for your own person) (5 pts)",
      points: 5,
      likelihood: 1,
      repeatable: false,
      appliesTo: "individual",
    },
    {
      id: 19,
      name: "Play a fake idol (2 pts)",
      points: 2,
      likelihood: 0.05,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 20,
      name: 'Your player gets a "That\'s how you do it on survivor" (2 pts)',
      points: 2,
      likelihood: 0.15,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 21,
      name: "Cry (2 pts)",
      points: 2,
      likelihood: 0.1,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 22,
      name: "Catch a Fish (2 pts)",
      points: 2,
      likelihood: 0.15,
      appliesTo: "individual",
      repeatable: true,
    },
    {
      id: 23,
      name: "Screen time Lead (for each episode) (3 pts)",
      points: 3,
      likelihood: 0.25,
      appliesTo: "individual",
      repeatable: false,
    },
  ],
};

export { scoringRules, type Rule };
