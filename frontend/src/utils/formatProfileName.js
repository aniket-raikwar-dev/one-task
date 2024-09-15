export const formatProfileName = (userDetails) => {
  return `${userDetails?.firstName[0] || "O"}${userDetails?.lastName[0] || "T"}`;
};
