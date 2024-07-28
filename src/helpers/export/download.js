export default function download(dataUrl, filename) {
  if ('undefined' === typeof document) return;
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}