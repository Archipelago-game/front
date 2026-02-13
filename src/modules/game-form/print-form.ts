export function printForm() {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  iframe.srcdoc = createHTML(document);
  document.body.appendChild(iframe);

  iframe.onload = () => {
    const win = iframe.contentWindow;
    if (!win) {
      return;
    }
    win.focus();
    win.print();

    win.onafterprint = () => {
      document.body.removeChild(iframe);
    };
  };
}

function createHTML(doc: Document) {
  const styles = Array.from(
    doc.querySelectorAll("style, link[rel='stylesheet']"),
  )
    .map((el) => el.outerHTML)
    .join("\n");

  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Character</title>
        ${styles}
        <style>

          @media print {
            @page {
              size: A4 landscape;
              margin: 5mm 0;
            }

            #root {
              overflow: visible !important;
              height: auto !important;
              min-height: auto !important;
              width: 100% !important;
            }

            .MuiTableCell-root {
              color: black !important;
              font-size: 12px !important; /* или подходящий размер */

            }
          }
        </style>
      </head>
      <body>
        ${doc.body.innerHTML}
      </body>
    </html>
  `;
}
