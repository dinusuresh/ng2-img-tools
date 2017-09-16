var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { Ng2ImgMaxModule, Ng2ImgMaxService } from 'ng2-img-max';
import { ImgCropService } from './img-crop.service';
import { ImgResizeExactService } from './img-resize-exact.service';
import { Ng2ImgToolsService } from './ng2-img-tools.service';
var Ng2ImgToolsModule = /** @class */ (function () {
    function Ng2ImgToolsModule() {
    }
    Ng2ImgToolsModule = __decorate([
        NgModule({
            imports: [
                Ng2ImgMaxModule
            ],
            providers: [
                { provide: ImgResizeExactService, useClass: ImgResizeExactService },
                { provide: ImgCropService, useClass: ImgCropService },
                { provide: Ng2ImgToolsService, useClass: Ng2ImgToolsService },
                { provide: Ng2ImgMaxService, useClass: Ng2ImgMaxService }
            ]
        })
    ], Ng2ImgToolsModule);
    return Ng2ImgToolsModule;
}());
export { Ng2ImgToolsModule };
//# sourceMappingURL=ng2-img-tools.module.js.map