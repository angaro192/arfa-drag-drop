import { ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { HelpersService } from './services/helpersService.service';
import * as i0 from "@angular/core";
export declare class ArfaDragDropComponent implements OnInit {
    private cd;
    private helpersService;
    attachments: any[];
    name: string;
    messageDragDrop: string;
    nameTypeFile: string;
    multiple: boolean;
    limit: number;
    newItemEvent: EventEmitter<any[]>;
    constructor(cd: ChangeDetectorRef, helpersService: HelpersService);
    ngOnInit(): void;
    addNewItem(value: any): void;
    onFileDropped($event: any, arrayFiles: any[], limit?: number): void;
    fileBrowseHandler(files: any, arrayFiles: any[], limit?: number): void;
    deleteFile(index: number, arrayFiles: any[]): void;
    prepareFilesList(files: any, arrayFiles: any[], limit?: number): void;
    onSelectFile(e: any, arrayFiles: any[], limit?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ArfaDragDropComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ArfaDragDropComponent, "lib-arfa-drag-drop", never, { "attachments": "attachments"; "name": "name"; "messageDragDrop": "messageDragDrop"; "nameTypeFile": "nameTypeFile"; "multiple": "multiple"; "limit": "limit"; }, { "newItemEvent": "newItemEvent"; }, never, never>;
}
