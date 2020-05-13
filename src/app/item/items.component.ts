import { Component, OnInit } from "@angular/core";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    providers: [ItemService]
})
export class ItemsComponent implements OnInit {
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
}
