import { Routes } from '@angular/router';
import { BlogComponent } from './component/blog/blog.component';
import { ResumeComponent } from './component/resume/resume.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [

    {
        path: 'blog', component: BlogComponent
    },
    {
        path: 'resume', component: ResumeComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: '', component: HomeComponent
    }
    // {
    //     path: '**', component: NotFoundComponent
    // }
];
