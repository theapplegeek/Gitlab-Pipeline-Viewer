import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    public navbarVisibility = signal<boolean>(true);

    constructor() {
    }
}