import { Routes } from '@angular/router';
import { BlogComponent } from './component/blog/blog.component';
import { ResumeComponent } from './component/resume/resume.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { PostsComponent } from './component/posts/posts.component';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [

    {
        path: 'blog', component: BlogComponent, title: 'Pudina N Blog'
    },
    {
        path: 'resume', component: ResumeComponent, title: 'Pudina N Resume'
    },
    {
        path: 'home', component: HomeComponent, title: 'Pudina N Home'
    },
    {
        path: '', component: HomeComponent, title: 'Pudina N Home'
    },
    {
        path: 'project', component: ProjectComponent, title: 'Pudina N Projects'
    },
    {
        path: 'posts/:article', component: PostsComponent
    },
];
