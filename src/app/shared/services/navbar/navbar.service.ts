import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavbarService {
    public navbarVisibility$ = new BehaviorSubject<boolean>(true);

    constructor() {
    }

    public setNavbarVisibility(visible: boolean) {
        this.navbarVisibility$.next(visible);
    }
}