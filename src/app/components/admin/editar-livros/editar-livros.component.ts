import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LivrosService } from 'src/app/services/livros.service';
import { EditarLivrosRequest } from 'src/app/models/editar-livros.request.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editar-livros',
  templateUrl: './editar-livros.component.html',
  styleUrls: ['./editar-livros.component.css']
})
export class EditarLivrosComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private LivrosService: LivrosService,
    private spinner: NgxSpinnerService
  ) {
  }

  formEdicao = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    writer: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  ngOnInit(): void {

    //capturando o parâmetro :id enviado pela url
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.spinner.show();
    this.LivrosService.getById(id)
      .subscribe({
        next: (data) => {
          this.formEdicao.patchValue(data);
        },
        error: (e) => {
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

  onSubmit(): void {

    this.spinner.show();

    const request: EditarLivrosRequest = {
      id: this.formEdicao.value.id as string,
      title: this.formEdicao.value.title as string,
      writer: this.formEdicao.value.writer as string
    };

    this.LivrosService.put(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Livro ${data.title}, atualizado com sucesso.`;
        },
        error: (e) => {
          this.mensagem = "Falha ao editar o livro.";
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

}
