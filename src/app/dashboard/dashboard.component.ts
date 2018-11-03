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
  singleItem: any = "";
  latestBlock: any = "";
  transaction: any;
  singleBlockUrl = 'https://blockchain.info/rawblock/0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103?cors=true';
  latestBlockUrl = 'https://blockchain.info/latestblock?cors=true';
  singleTransactionUrl = 'https://blockchain.info/rawtx/';

  constructor(private http: HttpClient, private modalService: BsModalService) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.getBlockchainData();
}
getBlockchainData(): void {
  this.get(this.singleBlockUrl)
    .subscribe(
      singleItem => {
        this.singleItem = singleItem;
      }
    ),
    this.get(this.latestBlockUrl)
    .subscribe(
      latestBlock => {
        this.latestBlock = latestBlock;
      }
    )
}
getTransactionData(transactionIndex): void {
  this.get(this.singleTransactionUrl + transactionIndex + "?cors=true")
    .subscribe(
      transaction => {
        this.transaction = transaction;
      }
    )
}
get(url: string)
{
  return this.http
  .get<any[]>(url)
  .pipe(map(data => data));
};

}