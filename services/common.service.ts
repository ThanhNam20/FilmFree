const formatLayoutData = (data: any, numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const convertTimestamp = (timestamp: any) => {
  let date = timestamp.toDate();
  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();
  date = mm + '/' + dd + '/' + yyyy;
  return date;
}

export const CommonService = { formatLayoutData, convertTimestamp };