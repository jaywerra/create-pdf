import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import domtoimage from 'dom-to-image';
const printButton = document.querySelector(".button");
const elementToPrint = document.querySelector(".container");

function downloadMap () {
    domtoimage.toPng(elementToPrint, {
        style: {
            backgroundColor: "#00ffff",
            margin: 0,
        },
    }).then(dataUrl => {
      let htmlImage = new Image();
      let pdf = new jsPDF('l', 'px', [500, 400]);

      htmlImage.src = dataUrl;
      pdf.addImage(htmlImage, 0, 0, 500, 400);
      pdf.save("map.pdf");

    }).catch(error => {
        console.error('Error: ', error);
    });
}

printButton.addEventListener("click", downloadMap);