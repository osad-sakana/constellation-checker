import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";

import { constellation } from "./types";

type Props = {
  constellationData: constellation,
  key: string,
};

export const OneCard: React.FC<Props> = (props) => {
  return(
    <Card variant="elevated">
      <CardHeader>
        <HStack spacing={2}>
          <img width="50px" src={props.constellationData["starIcon"]} alt={props.constellationData["name"]} />
          <Heading size="md">{props.constellationData["name"]}</Heading>
        </HStack>
        <hr />
        <Text fontSize="sm">{props.constellationData["enName"]}</Text>
      </CardHeader>

      <CardBody>
        <Stack spacing={2}>
          <Text fontSize="sm">方角: {props.constellationData["direction"]}</Text>
          <Text fontSize="sm">高度: {props.constellationData["altitude"]}</Text>
          <img src={props.constellationData["starImage"]} alt={props.constellationData["name"]} />
          <Text fontSize="sm">{props.constellationData["content"]}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};