import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { Observable, take, catchError, throwError } from 'rxjs';

class HelpersService {
    constructor() { }
    compress(file, MAX_WIDTH = 200, MAX_HEIGHT = 200) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return Observable.create((observer) => {
            reader.onload = (ev) => {
                const img = new Image();
                img.src = ev.target.result;
                (img.onload = () => {
                    const elem = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    }
                    else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    elem.width = width;
                    elem.height = height;
                    const ctx = elem.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob((blob) => {
                        observer.next(new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        }));
                    }, file.type, 1);
                }),
                    (reader.onerror = (error) => observer.error(error));
            };
        });
    }
}
HelpersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
HelpersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: HelpersService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class ArfaDragDropComponent {
    constructor(cd, helpersService) {
        this.cd = cd;
        this.helpersService = helpersService;
        this.attachments = [];
        this.multiple = false;
        this.limit = 999;
        this.newItemEvent = new EventEmitter();
    }
    ngOnInit() { }
    addNewItem(value) {
        this.newItemEvent.emit(value);
    }
    onFileDropped($event, arrayFiles, limit = null) {
        this.prepareFilesList($event, arrayFiles, limit);
    }
    fileBrowseHandler(files, arrayFiles, limit = null) {
        this.prepareFilesList(files, arrayFiles, limit);
    }
    deleteFile(index, arrayFiles) {
        arrayFiles.splice(index, 1);
        this.cd.detectChanges();
    }
    prepareFilesList(files, arrayFiles, limit = null) {
        this.onSelectFile(files, arrayFiles, limit);
    }
    onSelectFile(e, arrayFiles, limit = null) {
        Array.prototype.forEach.call(e.target.files, (file) => {
            const pattern = /image-*/;
            if (!file || !file.type.match(pattern)) {
                return;
            }
            const maxAvatarImage = 8;
            if (Math.round(file.size / 1024) >= maxAvatarImage * 1000) {
                return;
            }
            this.helpersService
                .compress(file, 425, 96)
                .pipe(take(1), catchError((event) => {
                return throwError(event);
            }))
                .subscribe((response) => {
                const reader = new FileReader();
                reader.readAsDataURL(response);
                reader.onload = () => {
                    const fileObject = {
                        nameTypeFile: this.nameTypeFile,
                        fileName: file.name,
                        file: reader.result,
                    };
                    if (limit != null) {
                        if (arrayFiles.length < limit) {
                            arrayFiles.push(fileObject);
                            this.addNewItem(fileObject);
                        }
                    }
                    else {
                        arrayFiles.push(fileObject);
                    }
                    this.cd.detectChanges();
                };
            });
        });
    }
}
ArfaDragDropComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: HelpersService }], target: i0.ɵɵFactoryTarget.Component });
ArfaDragDropComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: ArfaDragDropComponent, selector: "lib-arfa-drag-drop", inputs: { attachments: "attachments", name: "name", messageDragDrop: "messageDragDrop", nameTypeFile: "nameTypeFile", multiple: "multiple", limit: "limit" }, outputs: { newItemEvent: "newItemEvent" }, ngImport: i0, template: "<label class=\"label-dragdrop\">{{name}}</label>\n<div id=\"fileUploadFoto\">\n  <div class=\"ds-drod-container border\" appDnd (fileDropped)=\"onFileDropped($event, attachments, limit)\">\n    <input placeholder=\"...\" type=\"file\" #newItem [multiple]=\"multiple\" (change)=\"fileBrowseHandler($event, attachments,limit)\" />\n    <i class=\"fas fa-cloud-upload-alt fa-3x\" class=\"ds-colorSpan\"></i> <br />\n    <span *ngIf=\"messageDragDrop\" class=\"ds-colorSpan\">{{messageDragDrop}}</span>\n  </div>\n  <div class=\"files-list\">\n    <div class=\"single-file m-0\" *ngFor=\"let attachment of attachments; let i = index\">\n      <i class=\"fas fa-file\" class=\"ds-colorSpan\"></i>\n      <div class=\"info\">\n        <h4 class=\"name mx-2\">\n          {{ attachment?.fileName }}\n        </h4>\n      </div>\n      <i class=\"fas fa-trash delete\" (click)=\"deleteFile(i, attachments)\"></i>\n    </div>\n  </div>\n</div>\n", styles: ["input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-webkit-appearance:textfield}.ds-colorSpan{color:#c6c6c6}.mat-stepper-horizontal{margin-top:8px}.mat-form-field{margin-top:16px}.label-dragdrop{color:#958e8e;margin-bottom:.5rem;margin-top:.5rem}::ng-deep .mat-step-header .mat-step-icon-selected{background-color:#c4c4c4}::ng-deep .mat-step-header .mat-step-icon-state-edit{background-color:#0aa71a}::ng-deep .mat-step-icon{height:34px!important;width:34px!important}::ng-deep .mat-step-label.mat-step-label{text-overflow:inherit!important;white-space:normal!important}.files input{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;padding:120px 0 85px 35%;text-align:center!important;margin:0;width:100%!important}.files input:focus{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;border:1px solid #92b0b3}.files{position:relative}.files:after{pointer-events:none;position:absolute;top:60px;left:0;width:50px;right:0;height:56px;content:\"\";display:block;margin:0 auto;background-size:100%;background-repeat:no-repeat}.color input{background-color:#f1f1f1}.files:before{position:absolute;bottom:10px;left:0;pointer-events:none;width:100%;right:0;height:57px;content:\" [Arraste ou clique para anexar]. \";display:block;margin:0 auto;color:#c6c6c6;font-weight:600;text-transform:capitalize;text-align:center}.file-drop-area{position:relative;display:flex;align-items:center;width:450px;max-width:100%;padding:25px;border:1px dashed rgba(233,23,23,.4);border-radius:3px;transition:.2s}.choose-file-button{flex-shrink:0;background-color:#ffffff0a;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:8px 15px;margin-right:10px;font-size:12px;text-transform:uppercase}.file-message{font-size:small;font-weight:300;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-input{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.mt-100{margin-top:100px}.ds-drod-container{padding:3rem;text-align:center;position:relative;margin:0 auto}.ds-drod-container input{opacity:0;position:absolute;z-index:2;width:100%;height:100%;top:0;left:0;cursor:pointer}.ds-drod-container label{color:#fff;width:183px;height:44px;border-radius:21.5px;background-color:#db202f;padding:8px 16px}.ds-drod-container h3{font-size:20px;font-weight:600;color:#38424c}.fileover{animation:shake 1s;animation-iteration-count:infinite}.files-list{margin-top:.5rem}.files-list .single-file{padding:.5rem;justify-content:space-between;align-items:center;margin-bottom:1rem;display:flex;flex-grow:1}.files-list .single-file img.delete{margin-left:.5rem;cursor:pointer;align-self:flex-end}.files-list .single-file i.delete{margin-left:.5rem;cursor:pointer;color:red}.files-list .single-file .name{font-size:14px;font-weight:500;color:#353f4a;margin:0}.files-list .single-file .size{font-size:12px;font-weight:500;color:#a4a4a4;margin:0;margin-bottom:.25rem}.files-list .single-file .info{width:100%}.ds-message-file{position:absolute;bottom:0;right:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-arfa-drag-drop', template: "<label class=\"label-dragdrop\">{{name}}</label>\n<div id=\"fileUploadFoto\">\n  <div class=\"ds-drod-container border\" appDnd (fileDropped)=\"onFileDropped($event, attachments, limit)\">\n    <input placeholder=\"...\" type=\"file\" #newItem [multiple]=\"multiple\" (change)=\"fileBrowseHandler($event, attachments,limit)\" />\n    <i class=\"fas fa-cloud-upload-alt fa-3x\" class=\"ds-colorSpan\"></i> <br />\n    <span *ngIf=\"messageDragDrop\" class=\"ds-colorSpan\">{{messageDragDrop}}</span>\n  </div>\n  <div class=\"files-list\">\n    <div class=\"single-file m-0\" *ngFor=\"let attachment of attachments; let i = index\">\n      <i class=\"fas fa-file\" class=\"ds-colorSpan\"></i>\n      <div class=\"info\">\n        <h4 class=\"name mx-2\">\n          {{ attachment?.fileName }}\n        </h4>\n      </div>\n      <i class=\"fas fa-trash delete\" (click)=\"deleteFile(i, attachments)\"></i>\n    </div>\n  </div>\n</div>\n", styles: ["input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-webkit-appearance:textfield}.ds-colorSpan{color:#c6c6c6}.mat-stepper-horizontal{margin-top:8px}.mat-form-field{margin-top:16px}.label-dragdrop{color:#958e8e;margin-bottom:.5rem;margin-top:.5rem}::ng-deep .mat-step-header .mat-step-icon-selected{background-color:#c4c4c4}::ng-deep .mat-step-header .mat-step-icon-state-edit{background-color:#0aa71a}::ng-deep .mat-step-icon{height:34px!important;width:34px!important}::ng-deep .mat-step-label.mat-step-label{text-overflow:inherit!important;white-space:normal!important}.files input{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;padding:120px 0 85px 35%;text-align:center!important;margin:0;width:100%!important}.files input:focus{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;border:1px solid #92b0b3}.files{position:relative}.files:after{pointer-events:none;position:absolute;top:60px;left:0;width:50px;right:0;height:56px;content:\"\";display:block;margin:0 auto;background-size:100%;background-repeat:no-repeat}.color input{background-color:#f1f1f1}.files:before{position:absolute;bottom:10px;left:0;pointer-events:none;width:100%;right:0;height:57px;content:\" [Arraste ou clique para anexar]. \";display:block;margin:0 auto;color:#c6c6c6;font-weight:600;text-transform:capitalize;text-align:center}.file-drop-area{position:relative;display:flex;align-items:center;width:450px;max-width:100%;padding:25px;border:1px dashed rgba(233,23,23,.4);border-radius:3px;transition:.2s}.choose-file-button{flex-shrink:0;background-color:#ffffff0a;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:8px 15px;margin-right:10px;font-size:12px;text-transform:uppercase}.file-message{font-size:small;font-weight:300;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-input{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.mt-100{margin-top:100px}.ds-drod-container{padding:3rem;text-align:center;position:relative;margin:0 auto}.ds-drod-container input{opacity:0;position:absolute;z-index:2;width:100%;height:100%;top:0;left:0;cursor:pointer}.ds-drod-container label{color:#fff;width:183px;height:44px;border-radius:21.5px;background-color:#db202f;padding:8px 16px}.ds-drod-container h3{font-size:20px;font-weight:600;color:#38424c}.fileover{animation:shake 1s;animation-iteration-count:infinite}.files-list{margin-top:.5rem}.files-list .single-file{padding:.5rem;justify-content:space-between;align-items:center;margin-bottom:1rem;display:flex;flex-grow:1}.files-list .single-file img.delete{margin-left:.5rem;cursor:pointer;align-self:flex-end}.files-list .single-file i.delete{margin-left:.5rem;cursor:pointer;color:red}.files-list .single-file .name{font-size:14px;font-weight:500;color:#353f4a;margin:0}.files-list .single-file .size{font-size:12px;font-weight:500;color:#a4a4a4;margin:0;margin-bottom:.25rem}.files-list .single-file .info{width:100%}.ds-message-file{position:absolute;bottom:0;right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: HelpersService }]; }, propDecorators: { attachments: [{
                type: Input
            }], name: [{
                type: Input
            }], messageDragDrop: [{
                type: Input
            }], nameTypeFile: [{
                type: Input
            }], multiple: [{
                type: Input
            }], limit: [{
                type: Input
            }], newItemEvent: [{
                type: Output
            }] } });

class ArfaDragDropModule {
}
ArfaDragDropModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ArfaDragDropModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropModule, declarations: [ArfaDragDropComponent], exports: [ArfaDragDropComponent] });
ArfaDragDropModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropModule, imports: [[]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ArfaDragDropComponent
                    ],
                    imports: [],
                    exports: [
                        ArfaDragDropComponent
                    ]
                }]
        }] });

class ArfaDragDropService {
    constructor() { }
}
ArfaDragDropService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ArfaDragDropService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

/*
 * Public API Surface of arfa-drag-drop
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ArfaDragDropComponent, ArfaDragDropModule, ArfaDragDropService };
//# sourceMappingURL=arfa-drag-drop.mjs.map
