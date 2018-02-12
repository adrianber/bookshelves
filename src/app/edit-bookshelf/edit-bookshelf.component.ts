import { Component, OnInit } from '@angular/core';
import { BookshelvesService } from '../bookshelves.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-bookshelf',
  templateUrl: './edit-bookshelf.component.html',
  styleUrls: ['./edit-bookshelf.component.css']
})
export class EditBookshelfComponent implements OnInit {

  model: any = {};
  bookshelfLoading = false;

  constructor(private bookshelvesService: BookshelvesService,
    private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      if(params.id){
        this.loadBookshelf(params.id);
      }
    });

  }

  ngOnInit() {

  }

  private loadBookshelf(id: number) {
    this.bookshelvesService.getById(id).subscribe(bookshelves => { this.model = bookshelves; });
  }

  updateBookshelf(id: number) {
    this.bookshelfLoading = true;
    this.bookshelvesService.update(id, { "bookshelf": { title: this.model.title } }).subscribe(
      data => {
        this.bookshelfLoading = false;
      },
      error => {
        window.alert("ERROR: Bookshelf not added:");
        this.bookshelfLoading = false;
      });
  }

}
