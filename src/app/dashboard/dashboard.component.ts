import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;
  restItems: any;
  restItemsUrl = 'https://blockchain.info/rawblock/0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103?cors=true';

  constructor(private http: HttpClient, private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.getRestItems();
}
getRestItems(): void {
  this.restItemsServiceGetRestItems()
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    )
}
restItemsServiceGetRestItems() {
  return this.http
    .get<any[]>(this.restItemsUrl)
    .pipe(map(data => data));
}
}