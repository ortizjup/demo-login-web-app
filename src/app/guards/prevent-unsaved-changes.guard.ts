import { async } from '@angular/core/testing';
import { MemberEditComponent } from './../home/members/member-edit/member-edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

import Swal from 'sweetalert2'

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{

    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure?. Unsaved changes will be lost!');
        }
        return true;
    }
}