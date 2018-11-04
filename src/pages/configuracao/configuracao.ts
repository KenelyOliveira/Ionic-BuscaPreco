import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Configuracao } from '../../model/configuracao'; 

@Component({
  templateUrl: 'configuracao.html'
})
export class ConfiguracaoPage {
  public config = new Configuracao(); 

  constructor(private fileChooser: FileChooser, private http:HttpClient, private toastCtrl: ToastController, private modalCtrl: ModalController) {
  }

  selecionarArquivo() {
     this.fileChooser.open()
       .then(uri => this.config.caminhoArquivo = uri)
       .catch(e => console.log(e));
  } 

  testarArquivo() {
    if (!this.validarArquivo()) {
      return;
    }
 }

  validarArquivo() {
    if (this.config.caminhoArquivo == "") {
      this.exibirToast('É necessário selecionar o caminho do arquivo');
      return false;
    }
    return true;
  }

  testarAPI() {
    if (!this.validarAPI()) {
        return;
    }

    try {
      this.http.get(this.config.urlAPI).subscribe(
          data => {
            this.modalCtrl.create(ModalContentPage, { data: data }).present();
          },
          erro => { 
            this.exibirToast("Erro: " + erro.status + " - " + erro.statusText);    
          }
      );  
    } catch (error) {
    }
 }

  validarAPI() {
    if (this.config.urlAPI == '') {
      this.exibirToast('É necessário preencher a URL');    
      return false;
    }
    return true;
  }

  exibirToast(mensagem) {
    this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'bottom',
        cssClass: 'erro',
      }).present();
  }
}

@Component({
  templateUrl: 'modal.html'
})
export class ModalContentPage {
produtos = [];

 constructor(private params: NavParams, private viewCtrl: ViewController,  private toastCtrl: ToastController) {
    this.produtos = this.params.get('data');

    if (this.produtos.length == 0) {
      this.toastCtrl.create({
        message: "O comando não retornou nenhum registro",
        duration: 3000,
        position: 'bottom',
        cssClass: 'erro',
      }).present();

    }

    
 }

 dismiss() {
    this.viewCtrl.dismiss();
}

}