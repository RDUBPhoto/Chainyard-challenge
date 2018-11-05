import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 modalRef: BsModalRef;
 singleItem: any;
 blockData: any;
 transaction: any;
 selectedBlockHash: any;
 transactionIndex: any;
 selectedTransactionIndex: any;
 singleBlockUrl = 'https://blockchain.info/rawblock/';
 latestBlockUrl = 'https://blockchain.info/latestblock?cors=true';
 singleTransactionUrl = 'https://blockchain.info/rawtx/';
 showingLatestBlock: boolean = true;

 constructor(private http: HttpClient, private modalService: BsModalService) { }
 openModal(template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(template);
 }
 ngOnInit() {
   this.getLatestBlockData();
 }
 getLatestBlockData(): void {
   this.transactionIndex = null;
   this.showingLatestBlock = true;
   this.get(this.latestBlockUrl)
     .subscribe(
     block => {
         this.blockData = block;
       }
     );
 }
 getBlockData(): void {
   this.transactionIndex = null;
   this.showingLatestBlock = false;
   this.get(this.singleBlockUrl + this.selectedBlockHash + "?cors=true")
     .subscribe(
       block => {
         this.blockData = block;
     },
     error => {
       alert(error.error);
     }
     );
 }
 getTransactionData(transactionIndex): void {
   this.selectedTransactionIndex = transactionIndex;
   this.get(this.singleTransactionUrl + transactionIndex + "?cors=true")
     .subscribe(
       transaction => {
         this.transaction = transaction;
       },
       error => {
         alert(error.error);
       }
     )
 }
 get(url: string) {
   return this.http.get(url);
 };

}