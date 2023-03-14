import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const printButton = document.querySelector(".button");
const elementToPrint = document.querySelector(".container");
import { saveAs } from "file-saver";
import domtoimage from 'dom-to-image';
import domToPdf from "dom-to-pdf";

function createPDF() {
    html2canvas(elementToPrint, {
        allowTaint: true,
        backgroundColor: "#faf2e8",
        foreignObjectRendering: true,
        letterRendering: 1,
        logging: true,
        useCORS: true
    }).then(function (canvas) {
        document.body.appendChild(canvas);
        let imgdata = canvas.toDataURL("image/jpeg");
        let doc = new jsPDF();

        console.log("IMG", imgdata);
        doc.addImage(imgdata, "JPG", 0, 0, elementToPrint.offsetWidth, elementToPrint.offsetHeight);
        // doc.save("map.pdf");
    });
}



function downloadMap () {
    domtoimage.toPng(elementToPrint, {
        style: {
            backgroundColor: "#00ffff",
        },
    }).then(dataUrl => {
      let htmlImage = new Image();
      let pdf = new jsPDF('l', 'px', [725, 585]);

      htmlImage.src = dataUrl;
      pdf.addImage(htmlImage, 0, 0, 725, 585);
      pdf.save("map.pdf");

    }).catch(error => {
        console.error('Error: ', error);
    });
}

printButton.addEventListener("click", downloadMap);