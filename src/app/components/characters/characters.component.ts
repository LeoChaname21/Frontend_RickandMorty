import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { characterModel } from '../../model/characterModel';
import { CharacterService } from '../../services/character.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {

  listCharacter: characterModel[] = [];
  pcharacters: string[] = ["rick","morty","beth","jerry","summer","mr. meeseek","evil rick","evil morty"];


  constructor(private characterService: CharacterService) {
  }
  ngOnInit(): void {
   for(const character of this.pcharacters){
      this.search(character)
   }
  }


  search(character: string) {
    this.characterService.getCharacter(character).subscribe(resp => {
      if (resp) {
        this.listCharacter.push(...resp)
      }
    },
      (error: any) => { 
        console.log(error.error.error);
      });
  }

}
