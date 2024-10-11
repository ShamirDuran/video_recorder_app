/**
 * Converts seconds into a time format (default is "HH:mm:ss").
 * @param totalSeconds - The total number of seconds to convert.
 * @param format - The desired format string (default is "HH:mm:ss").
 * @returns A string representing the formatted time.
 */
export const formatTime = (
  totalSeconds: number,
  format: string = 'HH:mm:ss',
): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format components to always show two digits
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Replace placeholders in the format string
  return format
    .replace('HH', formattedHours)
    .replace('mm', formattedMinutes)
    .replace('ss', formattedSeconds);
};
