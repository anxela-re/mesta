import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { DashedBoxComponent } from './components/dashed-box/dashed-box.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    BreadcrumbComponent,
    FeedbackComponent,
    DashedBoxComponent,
    ModalComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    BreadcrumbComponent,
    FeedbackComponent,
    DashedBoxComponent,
    ModalComponent,
    LoadingComponent
  ],
})
export class SharedModule {}
