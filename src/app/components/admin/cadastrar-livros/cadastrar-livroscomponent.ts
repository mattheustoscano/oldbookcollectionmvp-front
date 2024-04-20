import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CadastrarLivrosRequest } from 'src/app/models/cadastrar-livros.request.model';
import { LivrosService } from 'src/app/services/livros.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastrar-livros',
  templateUrl: './cadastrar-livros.component.html',
  styleUrls: ['./cadastrar-livros.component.css']
})
export class CadastrarLivrosComponent {

  mensagem: string = '';

  constructor(
    private LivrosService: LivrosService,
    private spinner: NgxSpinnerService
  ) {
  }

  formCadastro = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    writer: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(150)])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {

    this.spinner.show();

    const request: CadastrarLivrosRequest = {
      title: this.formCadastro.value.title as string,
      writer: this.formCadastro.value.writer as string
    };

    this.LivrosService.post(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Livro cadastrado com sucesso.`;
          this.formCadastro.reset();
        },
        error: (e) => {
          this.mensagem = "Falha ao cadastrar o livro.";
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })

  }
}
