export const navKnowledgeBase = async () => {
  const navigation = await fetch(`/api/navigations/knowledge`);
  const result = await navigation.json();
  return result;
};

export const navCourses = async () => {
  const navigation = await fetch(`/api/navigations/courses`);
  const result = await navigation.json();
  return result;
};

export const navContent = async () => {
  const navigation = await fetch(`/api/navigations/content`);
  const result = await navigation.json();
  return result;
};
