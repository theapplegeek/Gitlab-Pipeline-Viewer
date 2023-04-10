import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PrimeNgModule} from "./modules/prime-ng.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        PrimeNgModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        PrimeNgModule
    ]
})
export class SharedModule {
}
