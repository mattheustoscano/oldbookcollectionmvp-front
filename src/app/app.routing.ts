import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AutenticarGuard } from "./guards/autenticar.guard";

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoverComponent } from './components/password-recover/password-recover.component';
import { CadastrarLivrosComponent } from "./components/admin/cadastrar-livros/cadastrar-livroscomponent";
import { ConsultarLivrosComponent } from "./components/admin/consultar-livros/consultar-livros.component";
import { EditarLivrosComponent } from "./components/admin/editar-livros/editar-livros.component";

//mapeamento de rotas
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'password-recover', component: PasswordRecoverComponent },
    { path: 'cadastrar-livros', component: CadastrarLivrosComponent, canActivate: [AutenticarGuard] },
    { path: 'consultar-livros', component: ConsultarLivrosComponent, canActivate: [AutenticarGuard] },
    { path: 'editar-livros/:id', component: EditarLivrosComponent, canActivate: [AutenticarGuard] }
];

//registrando as rotas
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }