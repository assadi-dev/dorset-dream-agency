export const paginateMetadata = ({ page, count, limit }: { page: number; count: number; limit: number }) => {
    const offset = obtainOffset(page, limit);
    const totalPages = Math.ceil(count / limit);
    const prevPage = page - 1 < 1 ? 1 : page - 1;
    const nextPage = page + 1 > totalPages ? totalPages : page + 1;
    return {
        offset,
        currentPage: page,
        prevPage,
        nextPage,
        lastPage: totalPages,
        total: count,
        totalPages,
    };
};

export const obtainOffset = (page: number, limit: number) => {
    const diff = page - 1;
    if (diff < 1) return 0;
    return diff * limit;
};
