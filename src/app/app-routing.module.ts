import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CharactersComponent } from './components/characters/characters.component';

const routes: Routes = [
  {path: "", component: CharactersComponent},
  {path: "search",component:CharacterComponent},
  {path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
