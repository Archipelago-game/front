export function downloadJSON(obj: unknown, filename: string) {
  const data = JSON.stringify(obj);
  const blob = new Blob([data], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
