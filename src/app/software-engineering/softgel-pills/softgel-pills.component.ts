import { Component } from '@angular/core';

@Component({
  selector: 'app-softgel-pills',
  templateUrl: './softgel-pills.component.html',
  styleUrls: ['./softgel-pills.component.css']
})
export class SoftgelPillsComponent {
  instructionsLoc = "assets/pills/instructions/SoftGelPills-Part";
  umlLoc = "assets/pills/uml/SoftGelPills-Part";
  currPage = "";

  pillParts = ["Introduction", "Pill Production and Variations", 
    "Singletons and Proxies and Visitors, Oh My!"];
}
