import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { TemaService } from '../service/tema.service';
import { PostagemService } from './../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  user: User = new User()

  postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findByIdUser(environment.id)

    let idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(idPostagem)
  }

  findByIdUser(id: number) {

    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
      console.log(JSON.stringify(this.user))
    })

  }

  findByIdPostagem(id: number) {

    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }



  sair(){
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }
}
