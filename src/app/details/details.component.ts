import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { JSONPlaceholderService } from 'src/app/services/jsonplaceholder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: number;
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
    this.id = +this.route.snapshot.paramMap.get('id');
    this.subscribe = this.JSONPlaceholder.getItem(this.id).subscribe((x) => {
      this.item = x;
      this.albumID = x.albumId;
      this.title = x.title;
      this.url = x.url;
      this.thumbnailUrl = x.thumbnailUrl;
    })
  }
  goBack() {
    this.router.navigate([''], { relativeTo: this.route, queryParams: { page: this.page } });
  }

}
