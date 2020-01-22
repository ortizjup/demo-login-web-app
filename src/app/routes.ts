import { MemberDetailComponent } from './home/members/member-detail/member-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListsComponent } from './home/members/member-lists/member-lists.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberDetailResolver } from './resolvers/member-detail-resolver';
import { MemberListResolver } from './resolvers/member-list-resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListsComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},  
        ]  
    },
    {path: '**', redirectTo: '',   pathMatch: 'full'},
];