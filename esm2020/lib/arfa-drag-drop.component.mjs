import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { catchError, take, throwError } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "./services/helpersService.service";
export class ArfaDragDropComponent {
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
ArfaDragDropComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.HelpersService }], target: i0.ɵɵFactoryTarget.Component });
ArfaDragDropComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: ArfaDragDropComponent, selector: "lib-arfa-drag-drop", inputs: { attachments: "attachments", name: "name", messageDragDrop: "messageDragDrop", nameTypeFile: "nameTypeFile", multiple: "multiple", limit: "limit" }, outputs: { newItemEvent: "newItemEvent" }, ngImport: i0, template: "<label class=\"label-dragdrop\">{{name}}</label>\n<div id=\"fileUploadFoto\">\n  <div class=\"ds-drod-container border\" appDnd (fileDropped)=\"onFileDropped($event, attachments, limit)\">\n    <input placeholder=\"...\" type=\"file\" #newItem [multiple]=\"multiple\" (change)=\"fileBrowseHandler($event, attachments,limit)\" />\n    <i class=\"fas fa-cloud-upload-alt fa-3x\" class=\"ds-colorSpan\"></i> <br />\n    <span *ngIf=\"messageDragDrop\" class=\"ds-colorSpan\">{{messageDragDrop}}</span>\n  </div>\n  <div class=\"files-list\">\n    <div class=\"single-file m-0\" *ngFor=\"let attachment of attachments; let i = index\">\n      <i class=\"fas fa-file\" class=\"ds-colorSpan\"></i>\n      <div class=\"info\">\n        <h4 class=\"name mx-2\">\n          {{ attachment?.fileName }}\n        </h4>\n      </div>\n      <i class=\"fas fa-trash delete\" (click)=\"deleteFile(i, attachments)\"></i>\n    </div>\n  </div>\n</div>\n", styles: ["input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-webkit-appearance:textfield}.ds-colorSpan{color:#c6c6c6}.mat-stepper-horizontal{margin-top:8px}.mat-form-field{margin-top:16px}.label-dragdrop{color:#958e8e;margin-bottom:.5rem;margin-top:.5rem}::ng-deep .mat-step-header .mat-step-icon-selected{background-color:#c4c4c4}::ng-deep .mat-step-header .mat-step-icon-state-edit{background-color:#0aa71a}::ng-deep .mat-step-icon{height:34px!important;width:34px!important}::ng-deep .mat-step-label.mat-step-label{text-overflow:inherit!important;white-space:normal!important}.files input{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;padding:120px 0 85px 35%;text-align:center!important;margin:0;width:100%!important}.files input:focus{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;border:1px solid #92b0b3}.files{position:relative}.files:after{pointer-events:none;position:absolute;top:60px;left:0;width:50px;right:0;height:56px;content:\"\";display:block;margin:0 auto;background-size:100%;background-repeat:no-repeat}.color input{background-color:#f1f1f1}.files:before{position:absolute;bottom:10px;left:0;pointer-events:none;width:100%;right:0;height:57px;content:\" [Arraste ou clique para anexar]. \";display:block;margin:0 auto;color:#c6c6c6;font-weight:600;text-transform:capitalize;text-align:center}.file-drop-area{position:relative;display:flex;align-items:center;width:450px;max-width:100%;padding:25px;border:1px dashed rgba(233,23,23,.4);border-radius:3px;transition:.2s}.choose-file-button{flex-shrink:0;background-color:#ffffff0a;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:8px 15px;margin-right:10px;font-size:12px;text-transform:uppercase}.file-message{font-size:small;font-weight:300;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-input{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.mt-100{margin-top:100px}.ds-drod-container{padding:3rem;text-align:center;position:relative;margin:0 auto}.ds-drod-container input{opacity:0;position:absolute;z-index:2;width:100%;height:100%;top:0;left:0;cursor:pointer}.ds-drod-container label{color:#fff;width:183px;height:44px;border-radius:21.5px;background-color:#db202f;padding:8px 16px}.ds-drod-container h3{font-size:20px;font-weight:600;color:#38424c}.fileover{animation:shake 1s;animation-iteration-count:infinite}.files-list{margin-top:.5rem}.files-list .single-file{padding:.5rem;justify-content:space-between;align-items:center;margin-bottom:1rem;display:flex;flex-grow:1}.files-list .single-file img.delete{margin-left:.5rem;cursor:pointer;align-self:flex-end}.files-list .single-file i.delete{margin-left:.5rem;cursor:pointer;color:red}.files-list .single-file .name{font-size:14px;font-weight:500;color:#353f4a;margin:0}.files-list .single-file .size{font-size:12px;font-weight:500;color:#a4a4a4;margin:0;margin-bottom:.25rem}.files-list .single-file .info{width:100%}.ds-message-file{position:absolute;bottom:0;right:0}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ArfaDragDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-arfa-drag-drop', template: "<label class=\"label-dragdrop\">{{name}}</label>\n<div id=\"fileUploadFoto\">\n  <div class=\"ds-drod-container border\" appDnd (fileDropped)=\"onFileDropped($event, attachments, limit)\">\n    <input placeholder=\"...\" type=\"file\" #newItem [multiple]=\"multiple\" (change)=\"fileBrowseHandler($event, attachments,limit)\" />\n    <i class=\"fas fa-cloud-upload-alt fa-3x\" class=\"ds-colorSpan\"></i> <br />\n    <span *ngIf=\"messageDragDrop\" class=\"ds-colorSpan\">{{messageDragDrop}}</span>\n  </div>\n  <div class=\"files-list\">\n    <div class=\"single-file m-0\" *ngFor=\"let attachment of attachments; let i = index\">\n      <i class=\"fas fa-file\" class=\"ds-colorSpan\"></i>\n      <div class=\"info\">\n        <h4 class=\"name mx-2\">\n          {{ attachment?.fileName }}\n        </h4>\n      </div>\n      <i class=\"fas fa-trash delete\" (click)=\"deleteFile(i, attachments)\"></i>\n    </div>\n  </div>\n</div>\n", styles: ["input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-webkit-appearance:textfield}.ds-colorSpan{color:#c6c6c6}.mat-stepper-horizontal{margin-top:8px}.mat-form-field{margin-top:16px}.label-dragdrop{color:#958e8e;margin-bottom:.5rem;margin-top:.5rem}::ng-deep .mat-step-header .mat-step-icon-selected{background-color:#c4c4c4}::ng-deep .mat-step-header .mat-step-icon-state-edit{background-color:#0aa71a}::ng-deep .mat-step-icon{height:34px!important;width:34px!important}::ng-deep .mat-step-label.mat-step-label{text-overflow:inherit!important;white-space:normal!important}.files input{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;padding:120px 0 85px 35%;text-align:center!important;margin:0;width:100%!important}.files input:focus{outline-offset:-10px;transition:outline-offset .15s ease-in-out,background-color .15s linear;border:1px solid #92b0b3}.files{position:relative}.files:after{pointer-events:none;position:absolute;top:60px;left:0;width:50px;right:0;height:56px;content:\"\";display:block;margin:0 auto;background-size:100%;background-repeat:no-repeat}.color input{background-color:#f1f1f1}.files:before{position:absolute;bottom:10px;left:0;pointer-events:none;width:100%;right:0;height:57px;content:\" [Arraste ou clique para anexar]. \";display:block;margin:0 auto;color:#c6c6c6;font-weight:600;text-transform:capitalize;text-align:center}.file-drop-area{position:relative;display:flex;align-items:center;width:450px;max-width:100%;padding:25px;border:1px dashed rgba(233,23,23,.4);border-radius:3px;transition:.2s}.choose-file-button{flex-shrink:0;background-color:#ffffff0a;border:1px solid rgba(255,255,255,.1);border-radius:3px;padding:8px 15px;margin-right:10px;font-size:12px;text-transform:uppercase}.file-message{font-size:small;font-weight:300;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-input{position:absolute;left:0;top:0;height:100%;width:100%;cursor:pointer;opacity:0}.mt-100{margin-top:100px}.ds-drod-container{padding:3rem;text-align:center;position:relative;margin:0 auto}.ds-drod-container input{opacity:0;position:absolute;z-index:2;width:100%;height:100%;top:0;left:0;cursor:pointer}.ds-drod-container label{color:#fff;width:183px;height:44px;border-radius:21.5px;background-color:#db202f;padding:8px 16px}.ds-drod-container h3{font-size:20px;font-weight:600;color:#38424c}.fileover{animation:shake 1s;animation-iteration-count:infinite}.files-list{margin-top:.5rem}.files-list .single-file{padding:.5rem;justify-content:space-between;align-items:center;margin-bottom:1rem;display:flex;flex-grow:1}.files-list .single-file img.delete{margin-left:.5rem;cursor:pointer;align-self:flex-end}.files-list .single-file i.delete{margin-left:.5rem;cursor:pointer;color:red}.files-list .single-file .name{font-size:14px;font-weight:500;color:#353f4a;margin:0}.files-list .single-file .size{font-size:12px;font-weight:500;color:#a4a4a4;margin:0;margin-bottom:.25rem}.files-list .single-file .info{width:100%}.ds-message-file{position:absolute;bottom:0;right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.HelpersService }]; }, propDecorators: { attachments: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJmYS1kcmFnLWRyb3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYXJmYS1kcmFnLWRyb3Avc3JjL2xpYi9hcmZhLWRyYWctZHJvcC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hcmZhLWRyYWctZHJvcC9zcmMvbGliL2FyZmEtZHJhZy1kcm9wLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFRcEQsTUFBTSxPQUFPLHFCQUFxQjtJQVVoQyxZQUNVLEVBQXFCLEVBQ3JCLGNBQThCO1FBRDlCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVgvQixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUl4QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFFWCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7SUFLaEQsQ0FBQztJQUVKLFFBQVEsS0FBVSxDQUFDO0lBRW5CLFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBTSxFQUFFLFVBQWlCLEVBQUUsUUFBZ0IsSUFBSTtRQUMzRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBSyxFQUFFLFVBQWlCLEVBQUUsUUFBZ0IsSUFBSTtRQUM5RCxJQUFJ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bXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YWtlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIZWxwZXJzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaGVscGVyc1NlcnZpY2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1hcmZhLWRyYWctZHJvcCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hcmZhLWRyYWctZHJvcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FyZmEtZHJhZy1kcm9wLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEFyZmFEcmFnRHJvcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGF0dGFjaG1lbnRzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1lc3NhZ2VEcmFnRHJvcDogc3RyaW5nO1xuICBASW5wdXQoKSBuYW1lVHlwZUZpbGU6IHN0cmluZztcbiAgQElucHV0KCkgbXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbGltaXQgPSA5OTk7XG5cbiAgQE91dHB1dCgpIG5ld0l0ZW1FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBoZWxwZXJzU2VydmljZTogSGVscGVyc1NlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBhZGROZXdJdGVtKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm5ld0l0ZW1FdmVudC5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIG9uRmlsZURyb3BwZWQoJGV2ZW50LCBhcnJheUZpbGVzOiBhbnlbXSwgbGltaXQ6IG51bWJlciA9IG51bGwpIHtcbiAgICB0aGlzLnByZXBhcmVGaWxlc0xpc3QoJGV2ZW50LCBhcnJheUZpbGVzLCBsaW1pdCk7XG4gIH1cblxuICBmaWxlQnJvd3NlSGFuZGxlcihmaWxlcywgYXJyYXlGaWxlczogYW55W10sIGxpbWl0OiBudW1iZXIgPSBudWxsKSB7XG4gICAgdGhpcy5wcmVwYXJlRmlsZXNMaXN0KGZpbGVzLCBhcnJheUZpbGVzLCBsaW1pdCk7XG4gIH1cblxuICBkZWxldGVGaWxlKGluZGV4OiBudW1iZXIsIGFycmF5RmlsZXM6IGFueVtdKSB7XG4gICAgYXJyYXlGaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJlcGFyZUZpbGVzTGlzdChmaWxlczogYW55LCBhcnJheUZpbGVzOiBhbnlbXSwgbGltaXQ6IG51bWJlciA9IG51bGwpIHtcbiAgICB0aGlzLm9uU2VsZWN0RmlsZShmaWxlcywgYXJyYXlGaWxlcywgbGltaXQpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKGU6IGFueSwgYXJyYXlGaWxlczogYW55W10sIGxpbWl0OiBudW1iZXIgPSBudWxsKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlLnRhcmdldC5maWxlcywgKGZpbGUpID0+IHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSAvaW1hZ2UtKi87XG4gICAgICBpZiAoIWZpbGUgfHwgIWZpbGUudHlwZS5tYXRjaChwYXR0ZXJuKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1heEF2YXRhckltYWdlID0gODtcbiAgICAgIGlmIChNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQpID49IG1heEF2YXRhckltYWdlICogMTAwMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGVscGVyc1NlcnZpY2VcbiAgICAgICAgLmNvbXByZXNzKGZpbGUsIDQyNSwgOTYpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGV2ZW50KTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChyZXNwb25zZSk7XG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVPYmplY3QgPSB7XG4gICAgICAgICAgICAgIG5hbWVUeXBlRmlsZTogdGhpcy5uYW1lVHlwZUZpbGUsXG4gICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgIGZpbGU6IHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChsaW1pdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChhcnJheUZpbGVzLmxlbmd0aCA8IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgYXJyYXlGaWxlcy5wdXNoKGZpbGVPYmplY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3SXRlbShmaWxlT2JqZWN0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXJyYXlGaWxlcy5wdXNoKGZpbGVPYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxsYWJlbCBjbGFzcz1cImxhYmVsLWRyYWdkcm9wXCI+e3tuYW1lfX08L2xhYmVsPlxuPGRpdiBpZD1cImZpbGVVcGxvYWRGb3RvXCI+XG4gIDxkaXYgY2xhc3M9XCJkcy1kcm9kLWNvbnRhaW5lciBib3JkZXJcIiBhcHBEbmQgKGZpbGVEcm9wcGVkKT1cIm9uRmlsZURyb3BwZWQoJGV2ZW50LCBhdHRhY2htZW50cywgbGltaXQpXCI+XG4gICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiLi4uXCIgdHlwZT1cImZpbGVcIiAjbmV3SXRlbSBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiAoY2hhbmdlKT1cImZpbGVCcm93c2VIYW5kbGVyKCRldmVudCwgYXR0YWNobWVudHMsbGltaXQpXCIgLz5cbiAgICA8aSBjbGFzcz1cImZhcyBmYS1jbG91ZC11cGxvYWQtYWx0IGZhLTN4XCIgY2xhc3M9XCJkcy1jb2xvclNwYW5cIj48L2k+IDxiciAvPlxuICAgIDxzcGFuICpuZ0lmPVwibWVzc2FnZURyYWdEcm9wXCIgY2xhc3M9XCJkcy1jb2xvclNwYW5cIj57e21lc3NhZ2VEcmFnRHJvcH19PC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImZpbGVzLWxpc3RcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLWZpbGUgbS0wXCIgKm5nRm9yPVwibGV0IGF0dGFjaG1lbnQgb2YgYXR0YWNobWVudHM7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpbGVcIiBjbGFzcz1cImRzLWNvbG9yU3BhblwiPjwvaT5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgIDxoNCBjbGFzcz1cIm5hbWUgbXgtMlwiPlxuICAgICAgICAgIHt7IGF0dGFjaG1lbnQ/LmZpbGVOYW1lIH19XG4gICAgICAgIDwvaDQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoIGRlbGV0ZVwiIChjbGljayk9XCJkZWxldGVGaWxlKGksIGF0dGFjaG1lbnRzKVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==