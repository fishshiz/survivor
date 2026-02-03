import { scoringRules, type Rule } from "./rules";
import { players as masterPlayers, type Player } from "./player";

type Average = {
  points: number;
  survivorRank: number;
  pointsRank: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
  fithPlace: number;
};

const getActivePlayers = (players: Player[]) =>
  players.filter((player) => !player.eliminated);

const runSimulations: (times: number) => Promise<Average[]> = (times = 1) => {
  return new Promise((resolve, _reject) => {
    const averages: Record<number, Average> = {};
    for (let time = 0; time < times; time++) {
      // These are sorted by point rank already
      const playerSimulation = [...runSimulation()];
      playerSimulation.forEach((player: Player, idx) => {
        if (!averages[idx + 1]) {
          averages[idx + 1] = {
            points: player.points,
            survivorRank: player.finalRank,
            pointsRank: idx + 1,
            firstPlace: player.finalRank === 1 ? 1 : 0,
            secondPlace: player.finalRank === 2 ? 1 : 0,
            thirdPlace: player.finalRank === 3 ? 1 : 0,
            fourthPlace: player.finalRank === 4 ? 1 : 0,
            fithPlace: player.finalRank === 5 ? 1 : 0,
          };
        } else {
          averages[idx + 1].points += player.points;
          averages[idx + 1].survivorRank += player.finalRank;
          averages[idx + 1].firstPlace += player.finalRank === 1 ? 1 : 0;
          averages[idx + 1].secondPlace += player.finalRank === 2 ? 1 : 0;
          averages[idx + 1].thirdPlace += player.finalRank === 3 ? 1 : 0;
          averages[idx + 1].fourthPlace += player.finalRank === 4 ? 1 : 0;
          averages[idx + 1].fithPlace += player.finalRank === 5 ? 1 : 0;
        }
      });
    }
    const output = Object.values(averages).map((val) => ({
      ...val,
      points: val.points / times,
      survivorRank: val.survivorRank / times,
      firstPlace: val.firstPlace / times,
      secondPlace: val.secondPlace / times,
      thirdPlace: val.thirdPlace / times,
      fourthPlace: val.fourthPlace / times,
      fithPlace: val.fithPlace / times,
    }));

    return resolve(output);
  });
};

const runSimulation: () => Player[] = () => {
  const players = masterPlayers.map((player) => ({
    ...player,
    points: 0,
    rulesApplied: [],
    eliminated: false,
    immunity: false,
    finalRank: masterPlayers.length,
  }));
  const initialPlayerCount = players.length;
  let playerCount = initialPlayerCount;
  while (playerCount > 0) {
    const activePlayers = [...getActivePlayers(players)];
    let applicableRules = [...scoringRules.all];
    if (activePlayers.length === initialPlayerCount) {
      applicableRules.push(...scoringRules.first);
    } else if (activePlayers.length === 4) {
      applicableRules.push(...scoringRules.fire);
    } else if (activePlayers.length < 4) {
      switch (activePlayers.length) {
        case 1:
          applicableRules.push(...scoringRules.final);
          break;
        case 2:
          applicableRules.push(...scoringRules.second);
          break;
        case 3:
          applicableRules.push(...scoringRules.third);
          break;
      }
    } else if (activePlayers.length === initialPlayerCount / 2) {
      applicableRules.push(...scoringRules.merge);
    } else if (activePlayers.length < initialPlayerCount / 2) {
      applicableRules.push(...scoringRules.postMerge);
    } else {
      applicableRules.push(...scoringRules.preMerge);
    }
    for (const rule of applicableRules) {
      applyRule(activePlayers, rule);
    }
    if (!applicableRules.some((rule) => rule.eliminated)) {
      eliminateRandomPlayer(activePlayers);
    }
    playerCount -= 1;
  }
  return players.sort((a, b) => b.points - a.points);
};

const applyRule = (players: Player[], rule: Rule) => {
  const chance = Math.random();
  const ruleApplies = chance < rule.likelihood;
  if (!ruleApplies || !players.length) {
    return;
  }
  if (rule.appliesTo === "individual") {
    const player = players[Math.floor(Math.random() * players.length)];
    if (ruleApplies) {
      player.points += rule.points;
      player.rulesApplied.push(rule.name);
    }
    if (rule.immunity) {
      player.immunity = true;
    }
    if (rule.eliminated) {
      eliminatePlayer(player, players);
    }
  } else if (rule.appliesTo === "team") {
    // assume we have 3 teams
    const affectedPlayers = players.filter((_p) => Math.random() < 0.33);
    if (ruleApplies) {
      affectedPlayers.forEach((p) => {
        p.points += rule.points;
        p.rulesApplied.push(rule.name);
        if (rule.immunity) {
          p.immunity = true;
        }
      });
    }
  } else {
    if (ruleApplies) {
      players.forEach((p) => {
        p.points += rule.points;
        p.rulesApplied.push(rule.name);
        if (rule.immunity) {
          p.immunity = true;
        }
      });
    }
  }
  if (rule.repeatable) {
    applyRule(players, rule);
  }
};

const eliminateRandomPlayer = (players: Player[]) => {
  const playersWithoutImmunity = players.filter((p) => !p.immunity);
  if (playersWithoutImmunity.length === 0) {
    // If all players have immunity, skip elimination
    return;
  }
  const playerToEliminate =
    playersWithoutImmunity[
      Math.floor(Math.random() * playersWithoutImmunity.length)
    ];
  eliminatePlayer(playerToEliminate, players);
  // Reset immunity for next round
  players.forEach((p) => {
    p.immunity = false;
  });
};

const eliminatePlayer = (player: Player, players: Player[]) => {
  player.finalRank = getActivePlayers(players).length;
  player.eliminated = true;
};

export { runSimulations, runSimulation, type Average };
