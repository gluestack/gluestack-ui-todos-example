import { Box, HStack, Text } from "../core";
const ProgressBar = ({ totalTasks, completedTasks }) => {
  const getProgress = () => {
    if (totalTasks === 0) {
      return 0;
    }
    return (completedTasks / totalTasks) * 100;
  };

  return (
    <HStack alignItems="center" w="100%">
      <Box flex={1} h="$1" bg="$backgroundDark700" borderRadius="$md">
        <Box
          h="100%"
          bg="$primary400"
          borderRadius="$md"
          w={`${getProgress()}%`}
        />
      </Box>
      <Text color="$textDark400" ml="$2" fontWeight="$normal" fontSize="$xs">
        {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed() : 0}%
      </Text>
    </HStack>
  );
};
export { ProgressBar };
