import {Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})
export class ExploreMainDrawerComponent implements OnInit {
  appThemeName: string
  appPurchaseUrl: string
  appPreviewUrl: string
  appDemos:string

  constructor() {
  }

  ngOnInit(): void {
  }
}
