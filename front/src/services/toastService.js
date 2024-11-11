export function showToast({
  title,
  description,
  status,
  duration,
  isClosable,
  toast,
}) {
  toast({
    title,
    description,
    status,
    duration,
    isClosable,
  });
}
