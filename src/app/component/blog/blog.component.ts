import { Component } from '@angular/core';
import { IPostInformation } from '../../interface/ipost-information';
import { BasicInfoService } from '../../services/basic-info.service';
import { Router, RouterModule } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, PostsComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  public postBasicInformation: IPostInformation;
  public constructor(private basicInfoService: BasicInfoService, private router: Router) { }
  public ngOnInit(): void {
    this.getPostBasicDetails();
  }
  public getPostBasicDetails() {
    this.basicInfoService.postBasicInformation().subscribe((res: IPostInformation) => {
      if (res !== undefined || res !== null) {
        this.postBasicInformation = res;
      }
    })
  }

  public onPostClick(){
    this.router.navigate(['/posts/post/chocklaterecipe']);
  }

}
