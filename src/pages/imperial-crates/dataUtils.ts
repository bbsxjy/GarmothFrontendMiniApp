export const generateRandomData = () => {
  const levels = ["初级", "熟练", "专家", "匠人", "名匠", "道人"];
  const packages = ["套餐A", "套餐B", "套餐C"];
  return Array.from({ length: 10 }, () => ({
    image: "https://assets.garmoth.com/img/new_icon/03_etc/07_productmaterial/00009638.webp",
    level: levels[Math.floor(Math.random() * levels.length)],
    package: packages[Math.floor(Math.random() * packages.length)],
    quantity: Math.floor(Math.random() * 5000) + 1000,
    value: Math.floor(Math.random() * 100000) + 10000,
    profit: Math.floor(Math.random() * 500000) + 50000,
    stock: Math.floor(Math.random() * 10000) + 1000,
  }));
};

export const filterData = (cookingSkill: number, contributionPoints: number, selectedLevels: string[]) => {
  const allData = generateRandomData();
  return allData.filter(item => 
    (!selectedLevels.length || selectedLevels.includes(item.level)) &&
    item.quantity >= cookingSkill &&
    item.value >= contributionPoints
  );
};
