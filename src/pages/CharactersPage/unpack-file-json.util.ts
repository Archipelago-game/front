export async function UnpackFileToJSON(file: File) {
  const text = await file.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(e);
  }
}
