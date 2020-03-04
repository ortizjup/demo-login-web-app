import { NavComponent } from './layout/nav/nav.component';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { StateResolver } from './resolvers/state-resolver';
import { CountryResolver } from './resolvers/country-resolver';
import { CityResolver } from './resolvers/city-resolver';
import { MemberEditComponent } from './home/members/member-edit/member-edit.component';
import { MemberDetailComponent } from './home/members/member-detail/member-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListsComponent } from './home/members/member-lists/member-lists.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberDetailResolver } from './resolvers/member-detail-resolver';
import { MemberEditResolver } from './resolvers/member-edit-resolver';
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
            {path: 'member/edit', component: MemberEditComponent,
            resolve: {
                cities: CityResolver,
                countries: CountryResolver, 
                states: StateResolver,
                user: MemberEditResolver
               
            }, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]  
    },
    {path: '**', redirectTo: '',   pathMatch: 'full'},
];