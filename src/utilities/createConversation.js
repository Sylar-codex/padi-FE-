export const createConversation = (username, user) => {
  const nameByAlpha = [username, user.username].sort();
  return `${nameByAlpha[0]}__${nameByAlpha[1]}`;
};
