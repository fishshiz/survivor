import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  List,
  Collapsible,
  Stack,
  Slider,
  HStack,
  NumberInput,
  Field,
  Text,
  Box,
} from "@chakra-ui/react";
import { scoringRules, type Rule } from "@/rules";
import { LuChevronRight } from "react-icons/lu";
import { useState } from "react";
const rules = scoringRules;

const RulesDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="lg">
          Edit scoring rules
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <List.Root gap={2}>
                {Object.values(rules).map((rules) => {
                  return rules.map((rule) => {
                    return <Rule rule={rule} />;
                  });
                })}
              </List.Root>
            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

const Rule = ({ rule }: { rule: Rule }) => {
  const [likelihood, setLikelihood] = useState([rule.likelihood * 100]);
  const [points, setPoints] = useState(JSON.stringify(rule.points));

  const handlePointsUpdate = (val: string) => {
    rule.points = parseInt(val);
    setPoints(val);
  };

  const handleLikelihoodUpdate = (val: number[]) => {
    console.log(val);
    rule.likelihood = val[0] / 100;
    setLikelihood(val);
  };

  const marks = [
    { value: 0, label: "0%" },
    { value: 50, label: "50%" },
    { value: 100, label: "100%" },
  ];
  return (
    <Collapsible.Root>
      <Collapsible.Trigger
        paddingY="3"
        display="flex"
        gap="2"
        alignItems="center"
        w="100%"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Collapsible.Indicator
            transition="transform 0.2s"
            _open={{ transform: "rotate(90deg)" }}
          >
            <LuChevronRight />
          </Collapsible.Indicator>
          <Text title={rule.name}>
            {rule.name.slice(0, 12) + (rule.name.length >= 12 ? "..." : "")}
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Text mr={3}>{points} Points</Text>
          <Text>{likelihood}%</Text>
        </Box>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack padding="4" borderWidth="1px">
          <Text>{rule.name}</Text>
          <Field.Root>
            <Field.Label>Points value</Field.Label>
            <NumberInput.Root
              maxW="200px"
              value={points}
              onValueChange={(e) => handlePointsUpdate(e.value)}
            >
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>

          <Slider.Root
            maxW="sm"
            size="sm"
            defaultValue={likelihood}
            onValueChangeEnd={(e) => handleLikelihoodUpdate(e.value)}
          >
            <HStack justify="space-between">
              <Slider.Label>Likelihood</Slider.Label>
              <Slider.ValueText />
            </HStack>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
              <Slider.Marks marks={marks} />
            </Slider.Control>
          </Slider.Root>
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export { RulesDrawer, rules };
