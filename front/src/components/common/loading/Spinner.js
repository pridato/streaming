import { Spinner, Stack } from "@chakra-ui/react";

const SpinnerComponent = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Spinner size="xl" />
    </Stack>
  );
};

export default SpinnerComponent;
