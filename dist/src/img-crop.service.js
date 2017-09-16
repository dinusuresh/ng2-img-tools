var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Ng2ImgMaxService } from 'ng2-img-max';
var ImgCropService = /** @class */ (function () {
    function ImgCropService(ng2ImgMaxService) {
        this.ng2ImgMaxService = ng2ImgMaxService;
    }
    ImgCropService.prototype.cropImage = function (file, toWidth, toHeight, startX, startY) {
        var _this = this;
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        var croppedImageSubject = new Subject();
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            // END OF CROPPING
            setTimeout(function () {
                croppedImageSubject.error({ croppedFile: file, reason: "File provided is neither of type jpg nor of type png.", error: "INVALID_EXTENSION" });
            }, 0);
            return croppedImageSubject.asObservable();
        }
        var cvs = document.createElement('canvas');
        var ctx = cvs.getContext('2d');
        var img = new Image();
        img.onload = function () {
            _this.ng2ImgMaxService.getEXIFOrientedImage(img).then(function (orientedImg) {
                window.URL.revokeObjectURL(img.src);
                cvs.width = toWidth;
                cvs.height = toHeight;
                ctx.drawImage(orientedImg, startX, startY, toWidth, toHeight, 0, 0, toWidth, toHeight);
                var imageData = ctx.getImageData(0, 0, orientedImg.width, orientedImg.height);
                var useAlpha = true;
                if (file.type === "image/jpeg" || (file.type === "image/png" && !_this.isImgUsingAlpha(imageData))) {
                    //image without alpha
                    useAlpha = false;
                    ctx = cvs.getContext('2d', { 'alpha': false });
                    ctx.drawImage(orientedImg, startX, startY, toWidth, toHeight, 0, 0, toWidth, toHeight);
                }
                cvs.toBlob(function (blob) {
                    var newFile = _this.generateResultFile(blob, file.name, file.type, new Date().getTime());
                    // END OF CROPPING
                    croppedImageSubject.next(newFile);
                }, useAlpha ? "image/png" : "image/jpeg");
            });
        };
        img.src = window.URL.createObjectURL(file);
        return croppedImageSubject.asObservable();
    };
    ImgCropService.prototype.isImgUsingAlpha = function (imageData) {
        for (var i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] !== 255) {
                return true;
            }
        }
        return false;
    };
    ImgCropService.prototype.generateResultFile = function (blob, name, type, lastModified) {
        var resultFile = new Blob([blob], { type: type });
        return this.blobToFile(resultFile, name, lastModified);
    };
    ImgCropService.prototype.blobToFile = function (blob, name, lastModified) {
        var file = blob;
        file.name = name;
        file.lastModified = lastModified;
        //Cast to a File() type
        return file;
    };
    ImgCropService = __decorate([
        Injectable(),
        __param(0, Inject(forwardRef(function () { return Ng2ImgMaxService; })))
    ], ImgCropService);
    return ImgCropService;
}());
export { ImgCropService };
//# sourceMappingURL=img-crop.service.js.map