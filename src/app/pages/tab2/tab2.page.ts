import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment)segment;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  articulos: Article[] = [];
  data: any;
  contador = 0;
  List = [];
  Lista = 0;

  categorias: string[]=["business","entertainment","general","health","science","sports","technology"];

  constructor(private noticiasService:NoticiasService) {
  
  }

  ngOnInit(){
    this.segment.value=this.categorias[0];

    let category= this.segment.value;
    this.noticiasService.getNoticiasByCategory(category).subscribe(noticias =>{
      console.log(noticias);  
      this.articulos.splice(this.segment.value);
      this.List.push(...noticias.articles);
      for(let i = 0; i < 4; i++){
        this.articulos.push(this.List[this.Lista]);
        this.Lista++;
      }
      
    })
  }
  onChange(event){
    if(this.contador == 1){
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
      this.contador = 0;
    }
    window.scrollTo(0 , 0);
    this.Lista = 0;
    this.List= [];
    let category=event.detail.value;
    this.noticiasService.getNoticiasByCategory(category).subscribe(noticias =>{ 
      this.articulos.splice(this.segment.value);
      this.List.push(...noticias.articles);
      console.log(noticias);
      for(let i = 0; i < 4; i++){
        this.articulos.push(this.List[this.Lista]);
        this.Lista++;
        console.log(this.Lista);
        console.log(this.List);
      }

    })
  }

  Datos(event){
    setTimeout(() => {
      let category= this.segment.value;
      console.log(event);
      
      this.noticiasService.getNoticiasByCategory(category)
      .subscribe(noticias => {
        for (let i = 0; i < 4; i++) {
          this.articulos.push(this.List[this.Lista]);
          this.Lista++;
        }
      })
      event.target.complete();
      if (this.Lista == 10){
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
        this.contador = 1;
      }
    }, 3000);

  }



    
  

}
