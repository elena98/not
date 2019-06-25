import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonSegment)segment;



  categorias: string[]=["business","entertainment","general","health","science","sports","technology"];

  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(){
    this.segment.value=this.categorias[0];
  }
  onChange(event){
    let category=event.detail.value;
    this.noticiasService.getNoticiasByCategory(category).subscribe(noticias =>{
      console.log(noticias);
    })
  }

}
