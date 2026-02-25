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

    win.onafterprint = () => iframe.remove();
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
        <title>форма героя</title>
        ${styles}
        <style>
          @page {
            size: auto;
            margin: 3mm;
          }

          @media print {

            html, body {
              margin: 0;
              padding: 0;
              height: auto !important;
              overflow: visible !important;
              background: white !important;
              color: black !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            #root {
              overflow: visible !important;
              height: auto !important;
              min-height: auto !important;
              width: 100% !important;
              padding-top: 15px !important;
              zoom: 0.5;
              position: absolute;
              top: 0;
              left: 0;
            }

            .css-16r8mjx-MuiContainer-root,
            .character-form {
              background: #fff !important;
            }


            /* --- MUI TABLE FIX --- */

            .MuiTable-root {
              border-collapse: collapse !important;
            }

            /* чтобы контейнеры не обрезали таблицу */
            .MuiTableContainer-root,
            .MuiPaper-root {
              width: 100% !important;
              max-width: none !important;
              overflow: visible !important;
              height: auto !important;
            }

            /* textarea*/
            .text-field-controller-wrapper.multiline .MuiInputBase-root {
                display: none;
            }

            .text-field-controller-wrapper.multiline {
                position: relative;
            }

            .text-field-controller-wrapper.multiline::after {
                content: attr(data-value);
                white-space: pre-wrap;
                width: 100%;
                min-height: 60px;
                padding: 8px;
                display: block;
                font: inherit;
                line-height: 1.4;
                box-sizing: border-box;
            }
            .text-field-controller-wrapper.multiline.print-fillable::after {
              min-height: 300px;
            }

            .no-breake {
                page-break-inside: avoid;
            }

            /* Talents */
            .print-talents {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
            }

            /* скрываем UI элементы */
            .no-print,
            button,
            .MuiSpeedDial-root {
              display: none !important;
            }

            /* сбрасываем ограничения размеров */
            * {
              max-height: none !important;
            }

          }
        </style>
      </head>
      <body>
        ${document.querySelector("#root")?.outerHTML || ""}
      </body>
    </html>
  `;
}
