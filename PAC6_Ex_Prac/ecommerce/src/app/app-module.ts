import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { ArticleItem } from './articles/article-item/article-item';
import { ArticleList } from './articles/article-list/article-list';
import { ArticleNewReactive } from './articles/article-new-reactive/article-new-reactive';
import { Navbar } from './articles/navbar/navbar';
import { ImagePipe } from './shared/image-pipe';

@NgModule({
  declarations: [
    App,
    ArticleList,
    ArticleItem,
    ArticleNewReactive,
    ImagePipe,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App]
})
export class AppModule {}
