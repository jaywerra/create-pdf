import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';

const printButton = document.querySelector(".button");
const elementToPrint = document.querySelector(".container");

function printPDF () {
    html2canvas(elementToPrint, { onclone: (document) => {
        printButton.style.display = "none"
    }})
    .then(canvas => {
        const img = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            backgroundColor: "#faf2e8",
        });
        let imgData = new Image();

        let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();

        pdf.addImage(img, 0, 0, width, height);
        pdf.save('map.pdf')
    })
}

function downloadMap () {
    domtoimage.toPng(elementToPrint, {
        style: {
            backgroundColor: "#faf2e8",
            margin: 0,
        },
        width: elementToPrint.offsetWidth,
        height: elementToPrint.offsetHeight,
    }).then(dataUrl => {
      let htmlImage = new Image();
      let pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
      });
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();

      htmlImage.src = dataUrl;
      pdf.addImage(htmlImage, 0, 0, width, height);
      pdf.save("map.pdf");

    }).catch(error => {
        console.error('Error: ', error);
    });
}

printButton.addEventListener("click", downloadMap);