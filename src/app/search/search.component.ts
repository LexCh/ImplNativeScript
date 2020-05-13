import { ItemService } from './../item/item.service';
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    //selector: "Search",
    templateUrl: "./search.component.html",
    selector: "ns-items",
    moduleId: module.id,
    //templateUrl: "./items.component.html",
    providers: [ItemService]
})
export class SearchComponent implements OnInit {
    items: any = "";

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getItems().subscribe(
            response =>{
                this.items = response;
            },
            error => console.log(error)
            );
    }
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}

