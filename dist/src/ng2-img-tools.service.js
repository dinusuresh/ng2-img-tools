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
import { ImgCropService } from './img-crop.service';
import { ImgResizeExactService } from './img-resize-exact.service';
var Ng2ImgToolsService = /** @class */ (function () {
    function Ng2ImgToolsService(imgResizeExactService, ng2ImgMaxService, imgCropService) {
        this.imgResizeExactService = imgResizeExactService;
        this.ng2ImgMaxService = ng2ImgMaxService;
        this.imgCropService = imgCropService;
    }
    Ng2ImgToolsService.prototype.compress = function (files, maxSizeInMB, ignoreAlpha, logExecutionTime) {
        if (ignoreAlpha === void 0) { ignoreAlpha = false; }
        if (logExecutionTime === void 0) { logExecutionTime = false; }
        return this.ng2ImgMaxService.compress(files, maxSizeInMB, ignoreAlpha, logExecutionTime);
    };
    Ng2ImgToolsService.prototype.resize = function (files, maxWidth, maxHeight, logExecutionTime) {
        if (logExecutionTime === void 0) { logExecutionTime = false; }
        return this.ng2ImgMaxService.resize(files, maxWidth, maxHeight, logExecutionTime);
    };
    Ng2ImgToolsService.prototype.crop = function (files, toWidth, toHeight, startX, startY) {
        var _this = this;
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        var croppedFileSubject = new Subject();
        files.forEach(function (file) {
            _this.cropImage(file, toWidth, toHeight, startX, startY).subscribe(function (value) {
                croppedFileSubject.next(value);
            }, function (error) {
                croppedFileSubject.error(error);
            });
        });
        return croppedFileSubject.asObservable();
    };
    Ng2ImgToolsService.prototype.resizeExactCrop = function (files, toWidth, toHeight) {
        var _this = this;
        var resizedFileSubject = new Subject();
        files.forEach(function (file) {
            _this.resizeExactCropImage(file, toWidth, toHeight).subscribe(function (value) {
                resizedFileSubject.next(value);
            }, function (error) {
                resizedFileSubject.error(error);
            });
        });
        return resizedFileSubject.asObservable();
    };
    Ng2ImgToolsService.prototype.resizeExactFill = function (files, toWidth, toHeight, fillColor) {
        var _this = this;
        var resizedFileSubject = new Subject();
        files.forEach(function (file) {
            _this.resizeExactFillImage(file, toWidth, toHeight, fillColor).subscribe(function (value) {
                resizedFileSubject.next(value);
            }, function (error) {
                resizedFileSubject.error(error);
            });
        });
        return resizedFileSubject.asObservable();
    };
    Ng2ImgToolsService.prototype.resizeExactFillImage = function (file, toWidth, toHeight, fillColor) {
        return this.imgResizeExactService.resizeExactFill(file, toWidth, toHeight, fillColor);
    };
    Ng2ImgToolsService.prototype.resizeExactCropImage = function (file, toWidth, toHeight) {
        return this.imgResizeExactService.resizeExactCrop(file, toWidth, toHeight);
    };
    Ng2ImgToolsService.prototype.cropImage = function (file, toWidth, toHeight, startX, startY) {
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        return this.imgCropService.cropImage(file, toWidth, toHeight, startX, startY);
    };
    Ng2ImgToolsService.prototype.compressImage = function (file, maxSizeInMB, ignoreAlpha, logExecutionTime) {
        if (ignoreAlpha === void 0) { ignoreAlpha = false; }
        if (logExecutionTime === void 0) { logExecutionTime = false; }
        return this.ng2ImgMaxService.compressImage(file, maxSizeInMB, ignoreAlpha, logExecutionTime);
    };
    Ng2ImgToolsService.prototype.resizeImage = function (file, maxWidth, maxHeight, logExecutionTime) {
        if (logExecutionTime === void 0) { logExecutionTime = false; }
        return this.ng2ImgMaxService.resizeImage(file, maxWidth, maxHeight, logExecutionTime);
    };
    Ng2ImgToolsService.prototype.getEXIFOrientedImage = function (image) {
        return this.ng2ImgMaxService.getEXIFOrientedImage(image);
    };
    Ng2ImgToolsService = __decorate([
        Injectable(),
        __param(0, Inject(forwardRef(function () { return ImgResizeExactService; }))),
        __param(1, Inject(forwardRef(function () { return Ng2ImgMaxService; }))),
        __param(2, Inject(forwardRef(function () { return ImgCropService; })))
    ], Ng2ImgToolsService);
    return Ng2ImgToolsService;
}());
export { Ng2ImgToolsService };
//# sourceMappingURL=ng2-img-tools.service.js.map