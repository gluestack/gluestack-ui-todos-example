import { HStack, Text, Progress } from "../core";
const ProgressBar = ({ totalTasks, completedTasks }) => {
  const getProgress = () => {
    if (totalTasks === 0) {
      return 0;
    }
    return (completedTasks / totalTasks) * 100;
  };

  return (
    <HStack alignItems="center" w="100%">
      <Progress flex={1} value={getProgress()} bg="$backgroundDark700" h="$1">
        <Progress.FilledTrack bg="$primary400" h="$1" />
      </Progress>
      <Text color="$textDark400" ml="$2" fontWeight="$normal" fontSize="$xs">
        {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed() : 0}%
      </Text>
    </HStack>
  );
};
export { ProgressBar };
