import moment from 'moment';

export const dateTime = (date) => {
  const milliseconds = date.seconds * 1000 + date.nanoseconds / 1e6;
  const createdDate = moment(milliseconds);

  const formattedDateTime = createdDate.format('DD MMMM YYYY, hh:mm:ss A');
  return formattedDateTime;
};