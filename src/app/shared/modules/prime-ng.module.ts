import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {AvatarModule} from "primeng/avatar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {AccordionModule} from "primeng/accordion";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        OverlayPanelModule,
        AvatarModule,
        DividerModule,
        InputTextModule,
        DropdownModule,
        AccordionModule,
    ],
    exports: [
        ButtonModule,
        CardModule,
        OverlayPanelModule,
        AvatarModule,
        DividerModule,
        InputTextModule,
        DropdownModule,
        AccordionModule,
    ]
})
export class PrimeNgModule {
}
