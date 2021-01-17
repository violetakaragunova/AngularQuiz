import { Component, OnDestroy, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JSONPlaceholderService } from 'src/app/services/jsonplaceholder.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  albumID: number;
  title: String;
  url: String;
  thumbnailUrl: String;
  item: any;
  subscribe: Subscription;
  pageSubscribe: Subscription;
  page: number;
  constructor(private JSONPlaceholder: JSONPlaceholderService, private route: ActivatedRoute, private router: Router) {
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
  ngOnInit() {
    this.pageSubscribe = this.route.queryParams.subscribe(params => {
      let paramPage = params.page;
      if (paramPage) {
        this.page = paramPage;
      }
    });
  }

  add() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
      this.subscribe = null;
    }
    this.subscribe = this.JSONPlaceholder.addData(this.albumID, this.title, this.url, this.thumbnailUrl).subscribe((x) => {
      this.goBack();
    });
  }
  goBack() {
    this.router.navigate([''], { relativeTo: this.route, queryParams: { page: this.page } });
  }
}
