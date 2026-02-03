import { useState } from "react";
import jeffLogo from "./assets/jeff.png";
import { runSimulations, runSimulation, type Average } from "./simulation";
import { type Player } from "./player";
import { NumberInput, Flex, Button } from "@chakra-ui/react";
import { RulesDrawer } from "./components/ui/rules-drawer";

import "./App.css";
import { PlayerTable } from "./components/ui/table";
import { AverageTable } from "./components/ui/average-table";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [average, setAverage] = useState<Average[]>([]);
  const [averageLoading, setAverageLoading] = useState(false);
  const [simulations, setSimulations] = useState<number>(10);
  const handleSimulationsClick = async () => {
    setAverageLoading(true);
    await runSimulations(simulations).then((res) => setAverage(res));
    setAverageLoading(false);
  };

  return (
    <>
      <a href="https://react.dev" target="_blank">
        <img src={jeffLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Survivor simulator</h1>
      <RulesDrawer />
      <div className="card">
        <p>Run a single simulation</p>
        <button onClick={() => setPlayers(() => runSimulation())}>Run</button>
        {players.length ? (
          <>
            <PlayerTable players={players} />
          </>
        ) : null}
        <p>Or</p>
        <p>Run multiple simulations to see an overall average</p>
        <Flex>
          <NumberInput.Root
            size="md"
            marginEnd="auto"
            defaultValue={simulations.toString()}
            onValueChange={(val) => setSimulations(parseInt(val.value))}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Button
            variant="solid"
            backgroundColor="#fad003"
            loading={averageLoading}
            onClick={handleSimulationsClick}
          >
            Run
          </Button>
        </Flex>
      </div>
      {average.length ? (
        <>
          <AverageTable players={average} />
        </>
      ) : null}
    </>
  );
}

export default App;
