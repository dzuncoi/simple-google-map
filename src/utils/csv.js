import _keys from 'lodash/keys';

const convertArrayOfObjectsToCSV = (options) => {
  const {
    data,
    columnDelimiter = ',',
    lineDelimiter = '\n',
  } = options;

  if (!data || !data.length) {
    return null;
  }

  const keys = _keys(data[0]);

  let result = '';

  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  let ctr = 0;

  data.forEach((item) => {
    ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr += 1;
    });

    result += lineDelimiter;
  });
  return result;
};

export const downloadCSV = (options) => {
  const {
    arrayOfObjects,
    filename = 'export.csv',
  } = options;

  let csv = convertArrayOfObjectsToCSV({
    data: arrayOfObjects,
  });

  if (!csv) return;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  const data = encodeURI(csv);
  const link = document.createElement('a'); //eslint-disable-line
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
};

export default {
  downloadCSV,
};
