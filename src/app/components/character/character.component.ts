import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { characterModel } from '../../model/characterModel';
import { CharacterService } from '../../services/character.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {

  listCharacter: characterModel[] = [];
  message: String= "";
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  @ViewChild('name', { static: false }) name!: ElementRef;


  constructor(private characterService: CharacterService) {
  }
  ngOnInit(): void {
    this.search("rick");
  }


  search(character: string) {
    this.characterService.getCharacter(character).subscribe(resp => {
      if (resp) {
        this.listCharacter = resp;
        this.message = "";
      }
    },
      (error: any) => { 
        console.log(error.error.error);
        this.message = error.error.error;
      });
  }


  generatePDF() {
    const element = this.pdfContent?.nativeElement;
    const name = this.name?.nativeElement.textContent;

    if (!element) {
      console.error("Elemento no encontrado");
      return;
    }

    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProp = pdf.getImageProperties(imgData);
      console.log(imgProp);
      const pdfWidth = 180;
      const pdfHeight = (imgProp.height * pdfWidth) / imgProp.width;

      pdf.addImage(imgData, 'PNG', 15, 0, pdfWidth, pdfHeight);
      pdf.save(`${name}.pdf`);
    });
  }

}
