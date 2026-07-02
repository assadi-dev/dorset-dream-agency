export const taxesData = [
    {
        id: "1",
        name: "Taxe 1",
        price: 10,
        description: "Description 1",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        name: "Taxe 2",
        price: 20,
        description: "Description 2",
        createdAt: new Date().toISOString(),
    },
    {
        id: "3",
        name: "Taxe 3",
        price: 30,
        description: "Description 3",
        createdAt: new Date().toISOString(),
    },
];

export const getTaxesCollectionsMocks = async () => {
    return {
        data: taxesData,
        totalItems: taxesData.length,
    };
};