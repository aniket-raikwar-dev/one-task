export const formatProfileName = (userDetails) => {
  return `${userDetails?.firstName[0] || ""}${userDetails?.lastName[0] || ""}`;
};
