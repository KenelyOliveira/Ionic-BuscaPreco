import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html'
})
export class AjudaPage {

  shownGroup = null;
  diseases = [
    { title: "Instalação do equipamento", description: "Bla Bla Bla" },
    { title: "Posição do Leitor", description: "Bla Bla Bla" },
    { title: "Login", description: "Bla Bla Bla" },
    { title: "Configuração do Banco de Dados", description: "Bla Bla Bla" },
  ];
  constructor(public navCtrl: NavController) {

  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  

}
