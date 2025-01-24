import { Routes } from '@angular/router';
import { BlogComponent } from './component/blog/blog.component';
import { ResumeComponent } from './component/resume/resume.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { PostsComponent } from './component/posts/posts.component';
import { ProjectComponent } from './component/project/project.component';
import { UtilitiesComponent } from './component/utilities/utilities.component';
import { GuidGenerationComponent } from './component/guid-generation/guid-generation.component';
import { HashGeneratorComponent } from './component/hash-generator/hash-generator.component';
import { WordCounterComponent } from './component/word-counter/word-counter.component';
import { JsonYmlConverterComponent } from './component/json-yml-converter/json-yml-converter.component';

export const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Pudina N Blog',
  },
  {
    path: 'resume',
    component: ResumeComponent,
    title: 'Pudina N Resume',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Pudina N Home',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Pudina N Home',
  },
  {
    path: 'project',
    component: ProjectComponent,
    title: 'Pudina N Projects',
  },
  {
    path: 'posts/:article',
    component: PostsComponent,
  },
  {
    path: 'utilities',
    component: UtilitiesComponent,
  },
  {
    path: 'utilities/uuid-generator',
    component: GuidGenerationComponent,
  },
  {
    path: 'utilities/hash-generator',
    component: HashGeneratorComponent,
  },
  {
    path: 'utilities/word-counter',
    component: WordCounterComponent,
  },
  {
    path: 'utilities/json-yml-converter',
    component: JsonYmlConverterComponent,
  },
];
