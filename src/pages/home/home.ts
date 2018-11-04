import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { LeitorProdutoPage } from '../leitor/leitor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  leitor = LeitorProdutoPage;

  constructor(public navCtrl: NavController, private app: App) {

  }

  abrirLeitor() {
      
    //this.navCtrl.push(LeitorProdutoPage);
    this.app.getRootNav().push(LeitorProdutoPage);
  }
}
