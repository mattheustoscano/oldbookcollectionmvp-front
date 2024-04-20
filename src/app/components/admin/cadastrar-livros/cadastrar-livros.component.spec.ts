import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarLivrosComponent } from './cadastrar-livroscomponent';

describe('CadastrarLivrosComponent', () => {
  let component: CadastrarLivrosComponent;
  let fixture: ComponentFixture<CadastrarLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarLivrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
