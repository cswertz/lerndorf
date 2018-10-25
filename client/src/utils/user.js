const hasCapability = (available, needed) => {
  for (let i = 0; i < available.length; i += 1) {
    const current = available[i];
    if (needed.indexOf(current) > -1) {
      return true;
    }
  }
  return false;
};

export { hasCapability };
