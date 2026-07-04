const courseTitles = [
  "Use of English / Communication Skills I",
  "Computer Fundamentals",
  "History and Philosophy of Science",
  "Elements of Management I",
  "Introduction to Sociology",
  "Business Communication",
  "Principles of Economics I",
  "Introduction to Psychology",
  "Basic Mathematics",
  "African Literature",
  "Public Administration",
  "Political Theory",
  "Nigerian Legal System",
  "Introduction to Accounting",
  "Marketing Principles",
  "Research Methods",
  "Statistics for Social Sciences",
  "International Relations",
  "Development Economics",
  "Environmental Science",
];

const courseCodes = [
  "GST101",
  "GST103",
  "GST105",
  "BUS105",
  "SOC201",
  "BUS201",
  "ECO101",
  "PSY101",
  "MTH101",
  "LIT201",
  "PAD201",
  "POL101",
  "LAW101",
  "ACC201",
  "MKT201",
  "RES301",
  "STA201",
  "IRL301",
  "DEV301",
  "ENV201",
];

const levels = ["100", "200", "300", "400", "PG"];
const semesters = ["1st", "2nd"];
const locations = [
  "Lagos HQ",
  "Abuja Centre",
  "Kano Centre",
  "Port Harcourt Centre",
  "Enugu Centre",
  "Ibadan Centre",
  "Benin Centre",
  "Jos Centre",
];

const generateRandomItem = (id) => {
  const index = id % courseTitles.length;
  const quantity = Math.floor(Math.random() * 400);
  const status =
    quantity <= 0 ? "Out of Stock" : quantity <= 50 ? "Low Stock" : "In Stock";
  return {
    id,
    courseTitle: courseTitles[index],
    courseCode: courseCodes[index],
    level: levels[Math.floor(Math.random() * levels.length)],
    semester: semesters[Math.floor(Math.random() * semesters.length)],
    quantity,
    location: locations[Math.floor(Math.random() * locations.length)],
    status,
  };
};

export const generateDummyData = (count = 20) => {
  return Array.from({ length: count }, (_, i) => generateRandomItem(i + 1));
};
