import { Component, OnInit } from '@angular/core';
import { LivrosService } from 'src/app/services/livros.service';
import { ConsultarLivros } from 'src/app/models/consultar-livros.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultar-livros',
  templateUrl: './consultar-livros.component.html',
  styleUrls: ['./consultar-livros.component.css']
})
export class ConsultarLivrosComponent implements OnInit {

  //atributos
  livros: ConsultarLivros[] = [];
  livro: ConsultarLivros | null = null;
  filtro: any = { title: '' };
  pagina: number = 1;
  mensagem: string = '';

  //construtor
  constructor(
    private LivrosService: LivrosService, //injeção de dependência
    private spinner: NgxSpinnerService //injeção de dependência
  ) {
  }

  //evento executado antes do componente carregar
  ngOnInit(): void {
    this.spinner.show();
    this.LivrosService.getAll()
      .subscribe({
        next: (data) => {    
          this.livros = data;
          console.log( this.livros);
        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(() => {
        this.spinner.hide();
      })
  }


  setLivro(livro: ConsultarLivros): void {
    this.livro = livro;
  }


  onDelete(): void {
    this.spinner.show();
    this.LivrosService.delete(this.livro?.id as string)
      .subscribe({
        next: (data) => {
          this.mensagem = `Livro ${data.title}, excluído com sucesso.`;
          this.ngOnInit();
        },
        error: (e) => {
          this.mensagem = 'Falha ao excluir o livro.'
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

  pageChange(event: any): void {
    this.pagina = event;
  }
}
