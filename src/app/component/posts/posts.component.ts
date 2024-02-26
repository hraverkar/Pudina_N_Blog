import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  post: string;
  href: string;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    let articleName = this.route.snapshot.paramMap.get('article');
    this.href = window.location.href;
    this.post = '../../../assets/Post/' + articleName + '.md';
  }
}
