import { Component } from '@angular/core';
import { IPostInformation } from '../../interface/ipost-information';
import { BasicInfoService } from '../../services/basic-info.service';
import { Router, RouterModule } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { CommonModule } from '@angular/common';
import { GeneralPost } from '../../interface/ipost-property';
import { AboutComponent } from '../about/about.component';

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
    private router: Router
  ) {}

  public ngOnInit(): void {
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
      .subscribe((res: GeneralPost) => {
        if (res !== undefined || res !== null) {
          this.generalPost = res;
        }
      });
  }
  //#endregion
}
