export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Morning";
  }

  if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  }

  return "Evening";
};
