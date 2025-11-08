export const isAuthenticated = (context) => {
  if (!context.user) throw new Error("UNAUTHENTICATED");
};
