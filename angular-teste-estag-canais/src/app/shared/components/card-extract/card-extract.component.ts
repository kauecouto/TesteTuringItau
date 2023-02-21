import { Component, Input } from '@angular/core';

import { ExtractTransfers } from './../../../models/user';

@Component({
  selector: 'app-card-extract',
  templateUrl: './card-extract.component.html',
  styleUrls: ['./card-extract.component.scss']
})
export class CardExtractComponent {
  @Input() extract!: ExtractTransfers
}
