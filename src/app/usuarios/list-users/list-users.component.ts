import { Component } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { UsuariosService } from '../services/usuarios.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  mercado!:User[]
  constructor(private user:UsuariosService,
    private messageService:MessageService){}
    ngOnInit(): void {
     this.obtenerUsuarios()
    }

    borrarUsuario(id:string){
      Swal.fire({
        title: '¿Quieres borrar a este usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
       this.user.borrarUsuario(id)
      .subscribe({
        next:(resp)=>{
          console.log(resp);
          console.log(this.mercado);
          
          this.mercado=this.mercado.filter(item=>item.username!=resp.username)
          this.messageService.add({
            key:'action',
            severity:'success',
            summary:'Usuario borrado con exito'
          })
        },error:(err)=>{
          console.log(err);
          
        }
      })
        }
  
      })
    
    }

    obtenerUsuarios(){
      this.user.obtenerTodosUsuarios()
      .subscribe({
        next:(resp)=>{
          this.mercado=resp
        }
      })
    }
}
