import { Component } from '@angular/core';
import { IPostInformation } from '../../interface/ipost-information';
import { BasicInfoService } from '../../services/basic-info.service';
import { RouterModule } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';
import { GeneralPost, Post } from '../../interface/ipost-property';
import { AboutComponent } from '../about/about.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, PostsComponent, CommonModule, AboutComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  //#region public property
  public postBasicInformation: IPostInformation;
  public generalPost: GeneralPost;
  //#endregion

  //#region public methods
  public constructor(
    private basicInfoService: BasicInfoService,
    private spinnerService: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.spinnerService.show();
    this.getPostBasicDetails();
    this.getAllBlogPost();
  }

  //#endregion

  //#region  private method
  private getPostBasicDetails() {
    this.basicInfoService
      .postBasicInformation()
      .subscribe((res: IPostInformation) => {
        if (res !== undefined || res !== null) {
          this.postBasicInformation = res;
        }
      });
  }
  private getAllBlogPost() {
    this.basicInfoService
      .getAllBlogInformation()
      .pipe(
        map((res: GeneralPost) => {
          if (res && res.techPosts) {
            const convertAndSort = (posts: Post[]) =>
              posts
                .map((p: Post) => ({ ...p, postDate: new Date(p.postDate) }))
                .sort(
                  (a: Post, b: Post) =>
                    b.postDate.getTime() - a.postDate.getTime()
                );
            res.techPosts = convertAndSort(res.techPosts);
            res.generalPosts = convertAndSort(res.generalPosts);
            return res;
          }
          return null;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.generalPost = res;
        }
        this.spinnerService.hide();
      });
  }
  //#endregion
}
