import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule  } from '@angular/common/http';
import { ConfiguracaoPage, ModalContentPage } from '../pages/configuracao/configuracao';
import { AjudaPage } from '../pages/ajuda/ajuda';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LeitorProdutoPage } from '../pages/leitor/leitor';
import { InfoProdutoPage } from '../pages/infoProduto/info';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileChooser } from '@ionic-native/file-chooser';

@NgModule({
  declarations: [
    MyApp,
    ConfiguracaoPage,
    ModalContentPage,
    AjudaPage,
    HomePage,
    TabsPage,
    LeitorProdutoPage,
    InfoProdutoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfiguracaoPage,
    ModalContentPage,
    AjudaPage,
    HomePage,
    TabsPage,
    LeitorProdutoPage,
    InfoProdutoPage
  ],
  providers: [
    FileChooser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
