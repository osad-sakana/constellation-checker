import {
  Box,
  Flex,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
  Button,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bgColor={useColorModeValue("blue.100", "blue.900")} px={4}>
      <Container maxW="container.lg">
        <Flex as="header" py="4" justifyContent="space-between" alignItems="center">
          <Heading as="h1" fontSize="2xl" color={useColorModeValue("gray.600", "white")}>
            星座を見上げて
          </Heading>
          <Stack direction='row' spacing={4} align='center'>
            <Tooltip label='ライト&ダークテーマを切り替え' fontSize='md'><Button size="md" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button></Tooltip>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};