import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
const routes: Routes  = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'chats', component: ChatComponent },
    { path: 'chats/:user/:room', component: ChatComponent },
    { path: 'users', component: UsersComponent }
  
  ];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }