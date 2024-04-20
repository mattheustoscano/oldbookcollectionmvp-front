import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLivrosComponent } from './editar-livros.component';

describe('EditarLivrosComponent', () => {
  let component: EditarLivrosComponent;
  let fixture: ComponentFixture<EditarLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLivrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
