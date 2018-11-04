import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App, NavParams  } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Configuracao } from '../../model/configuracao'; 
import { Produto } from '../../model/produto'; 
import { LeitorProdutoPage } from '../leitor/leitor'

@Component({
  templateUrl: 'info.html'
})

export class InfoProdutoPage {
  public config = new Configuracao(); 
  public produto = new Produto();
  codigoBarra = "";
  tempoTimer = 5000;

  constructor(private navParams: NavParams, private app: App, private http: HttpClient) {
    this.codigoBarra = "";
    this.tempoTimer = 5000;
    this.produto = new Produto();

    this.codigoBarra = this.navParams.get('codigoBarra');
    this.exibeDados();     
  }

  exibeDados() {
    if (this.config.tipoConfiguracao == 1) {
      this.buscaPrecoArquivo();
    }
    else if (this.config.tipoConfiguracao == 2) {
      this.buscaPrecoAPI();      
    }
  }

  buscaPrecoAPI() {
    this.http.get(this.config.urlAPI + '/' + this.codigoBarra).subscribe(
      data => {
        if (data[0]) {
          this.produto.descricao = data[0].Descricao;
          this.produto.valor = data[0].Valor;    
        }
        else {
          this.tempoTimer = 3000;
          this.produto.descricao = "Produto não encontrado!";
        }

        this.timerMudaTela();
      },
      erro => { 
      }
    );
  }

  buscaPrecoArquivo() {
    let achou = false;
    let arquivo = this.lerArquivoTexto(this.config.caminhoArquivo);
    
    arquivo.split("\n").every((linha, index) => {
      let prod = this.retornaDadosLinha(linha);
      console.log(prod.codigoBarra);

      if (this.codigoBarra == prod.codigoBarra) {
        this.produto.descricao = prod.descricao;
        this.produto.valor = prod.valor;    
        achou = true;
        
        return false;
      }
      else {
        return true;
      }
    });

    if (!achou) {
      this.tempoTimer = 3000;
      this.produto.descricao = "Produto não encontrado!";
    }
    this.timerMudaTela();
  }
  timerMudaTela() {
    let timer = Observable.timer(this.tempoTimer);
    timer.subscribe(t => 
      this.app.getRootNavs()[0].setRoot(LeitorProdutoPage)
    );
  }

  retornaDadosLinha(linha) : Produto {
    let prod = new Produto();
    prod.codigoBarra = linha.split("|")[0];
    prod.descricao = linha.split("|")[1];
    prod.valor = linha.split("|")[2];

    return prod;
  }

  lerArquivoTexto(caminho) : string
  {
    let retorno = "";

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", caminho, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
              retorno = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    
    return retorno;
  }
}