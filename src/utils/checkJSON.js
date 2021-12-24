export default function checkJSON(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}
