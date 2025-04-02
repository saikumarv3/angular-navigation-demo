import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PAGES } from '../page.data';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  title = '';
  currentPage = 0;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      const pageIndex = PAGES.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        this.currentPage = pageIndex;
        this.title = PAGES[pageIndex].title;
      } else {
        this.title = 'Not Found';
      }
    });
  }
  hasNext() { return this.currentPage < PAGES.length - 1; }
  next() { 
    if (this.currentPage === PAGES.length - 1) {
      this.router.navigate(['/success']);
    } else {
      const nextPage = PAGES[this.currentPage + 1];
      this.router.navigate(['/page', nextPage.id]);
    }
  }
}
