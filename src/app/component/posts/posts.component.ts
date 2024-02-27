import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MarkdownModule, AboutComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  //#region public property
  public post: string;
  public href: string;
  //#endregion

  //#region public methods
  public constructor(private route: ActivatedRoute) {}
  public ngOnInit(): void {
    let articleName = this.route.snapshot.paramMap.get('article');
    this.href = window.location.href;
    this.post = '../../../assets/Post/' + articleName + '.md';
  }
  //#endregion
}
