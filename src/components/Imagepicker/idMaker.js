export const idMaker = (array) => {
    const updatedArray = array.map((item, index) => ({
      ...item,
      assetId: index,
    }));
    return updatedArray;
  };