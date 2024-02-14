
export const showObjectIdDateTime = (id) => {
  const timeStamp = parseInt(id.toString().substring(0, 8), 16) * 1000;
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleDateString('en-US');
  const formattedTime = date.toLocaleTimeString('en-US');
  return (`${formattedDate} ${formattedTime}`); // prints "1/30/2024 12:01:53 PM"
}

export const showTimeStampInSecondsToDateTime = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  const formattedDate = date.toLocaleDateString('en-US');
  const formattedTime = date.toLocaleTimeString('en-US');
  return (`${formattedDate} ${formattedTime}`); // prints "1/30/2024 12:01:53 PM"
}

export const getSecondsSinceTimestampInSeconds = (timestamp) => {
  const nowTimeStamp = Date.now() / 1000;
  return (nowTimeStamp - timestamp);
}