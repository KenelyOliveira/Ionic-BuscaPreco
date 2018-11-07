import { Component, HostListener } from '@angular/core';
import { App, NavParams } from 'ionic-angular';
import { InfoProdutoPage } from '../infoProduto/info'

@Component({
  templateUrl: 'leitor.html'
})
export class LeitorProdutoPage {
 texto = "";
 
  constructor(private app: App) {
       
 }

 @HostListener('document:keypress', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) { 
   if (event.key.toUpperCase() == "ENTER") {
    let codigoBarra = this.texto;
    this.app.getRootNavs()[0].setRoot(InfoProdutoPage, { codigoBarra: codigoBarra });
    this.texto = "";
   }
   else {
    this.texto += event.key;
   }
 }
}