import { Component } from '@angular/core';

import { ConfiguracaoPage } from '../configuracao/configuracao';
import { AjudaPage } from '../ajuda/ajuda';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConfiguracaoPage;
  tab3Root = AjudaPage;

  constructor() {

  }
}
