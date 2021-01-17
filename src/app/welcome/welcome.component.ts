import { Component, OnDestroy, OnInit } from '@angular/core';
import { JSONPlaceholderService } from 'src/app/services/jsonplaceholder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  title = 'AngularQuiz';
  data: Array<any>;
  totalRecords: Number;
  page: number = 1;
  subscribe: Subscription;
  pageSubscribe: Subscription;
  constructor(private JSONPlaceholder: JSONPlaceholderService, private router: Router,
    private route: ActivatedRoute) {
    this.data = new Array<any>();
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = null;
    }
    if (this.pageSubscribe) {
      this.pageSubscribe.unsubscribe();
      this.pageSubscribe = null;
    }
  }

  gotoDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }
  getDataAPI() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = null;
    }

    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: this.page } });

    this.subscribe = this.JSONPlaceholder.getData(this.page).subscribe((data: any) => {
      this.data = data.data;
      this.totalRecords = data.totalRecords;
    });
  }

  ngOnInit() {
    this.pageSubscribe = this.route.queryParams.subscribe(params => {
      let paramPage = params.page;
      if (paramPage) {
        this.page = paramPage;
      }
    });
    this.getDataAPI();
  }

  onChangePage(pageNumber: number) {
    // update current page of items
    this.page = pageNumber;
    this.getDataAPI();
  }

  deleteData(id: number) {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = null;
    }
    this.subscribe = this.JSONPlaceholder.deleteData(id).subscribe(() => {
    });
  }

  goToEdit(id: number) {
    this.router.navigate(['/edit/' + id], { relativeTo: this.route, queryParams: { page: this.page } });
  }

  goToAdd() {
    this.router.navigate(['/add'], { relativeTo: this.route, queryParams: { page: this.page } });
  }

  goToDetails(id: number) {
    this.router.navigate(['/details/' + id], { relativeTo: this.route, queryParams: { page: this.page } });
  }
}
