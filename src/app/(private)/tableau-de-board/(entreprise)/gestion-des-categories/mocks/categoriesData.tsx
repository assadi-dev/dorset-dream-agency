export const categoriesData = [
    {
        id: "1",
        name: "Category 1",
        count: 10,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Category 2",
        count: 20,
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Category 3",
        count: 30,
        createdAt: new Date().toISOString(),
    },
];

export const getCategoriesCollectionsMocks = async () => {
    return {
        data: categoriesData,
        totalItems: categoriesData.length,
    };
};