import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';
const printButton = document.querySelector(".button");
const elementToPrint = document.querySelector(".container");

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