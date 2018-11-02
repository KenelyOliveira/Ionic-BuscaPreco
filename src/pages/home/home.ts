import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LeitorProdutoPage } from '../leitor/leitor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  leitor = LeitorProdutoPage;

  constructor(public navCtrl: NavController) {

  }

}
