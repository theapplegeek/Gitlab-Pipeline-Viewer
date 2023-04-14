import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {AvatarModule} from "primeng/avatar";
import {OverlayPanelModule} from "primeng/overlaypanel";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        OverlayPanelModule,
        AvatarModule,
        DividerModule,
    ],
    exports: [
        ButtonModule,
        CardModule,
        OverlayPanelModule,
        AvatarModule,
        DividerModule,
    ]
})
export class PrimeNgModule {
}
