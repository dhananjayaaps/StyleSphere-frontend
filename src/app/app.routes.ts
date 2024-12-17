import { Routes } from '@angular/router';
import { ServicesComponent } from './usercomponents/services/services.component';
import { LoginComponent } from './usercomponents/login/login.component';
import { RegistrationsuccessComponent } from './usercomponents/registrationsuccess/registrationsuccess.component';
import { OrdersuccessfulComponent } from './usercomponents/ordersuccessful/ordersuccessful.component';
import { MarketplaceCheckoutComponent } from './usercomponents/marketplace-checkout/marketplace-checkout.component';
import { MarketplaceShoppingcartComponent } from './usercomponents/marketplace-shoppingcart/marketplace-shoppingcart.component';
import { MarketplaceProductDescriptionComponent } from './usercomponents/marketplace-product-description/marketplace-product-description.component';
import { UserProfileComponent } from './usercomponents/user-profile/user-profile.component';
import { UserTransactionsComponent } from './usercomponents/user-transactions/user-transactions.component';

import { SettingsComponent } from './usercomponents/settings/settings.component';
import { MarketplaceProductsComponent } from './usercomponents/marketplace-products/marketplace-products.component';

import { MarketplaceCategoriesComponent } from './usercomponents/marketplace-categories/marketplace-categories.component';

import { UploadFormComponent } from './usercomponents/upload-form/upload-form.component';
import { ForgotPasswordComponent } from './usercomponents/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './usercomponents/new-password/new-password.component';
import { BecomeCreatorComponent } from './usercomponents/become-creator/become-creator.component';
import { UploadSuccessComponent } from './usercomponents/upload-success/upload-success.component';
import { SendToModeratorComponent } from './usercomponents/send-to-moderator/send-to-moderator.component';
import { SellerRegisterComponent } from './usercomponents/seller-register/seller-register.component';
import {HomepageComponent} from "./usercomponents/homepage/homepage.component";

import { CreatorApplicationComponent } from './usercomponents/creator-application/creator-application.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent },
  { path: 'ordersuccessful', component: OrdersuccessfulComponent },
  { path: 'marketplace-categories', component: MarketplaceCategoriesComponent },
  { path: 'marketplace-products', component: MarketplaceProductsComponent },
  { path: 'marketplace-checkout', component: MarketplaceCheckoutComponent },
  { path: 'marketplace-shoppingcart', component: MarketplaceShoppingcartComponent },
  { path: 'marketplace-product-description', component: MarketplaceProductDescriptionComponent },
  { path: 'userprofile', component: UserProfileComponent },
  { path: 'usertransactions', component: UserTransactionsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'upload-form', component: UploadFormComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'become-creator', component: BecomeCreatorComponent },
  { path: 'register-seller', component: SellerRegisterComponent },
  { path: 'upload-success/:id', component: UploadSuccessComponent },
  { path: 'send-to-moderator', component: SendToModeratorComponent },
// { path: 'sent-to-moderator', component: SentToModeratorComponent },
  { path: 'sent-to-moderator', component: SendToModeratorComponent },
  // { path: 'creator-application', component: CreatorApplicationComponent },
  { path: 'email-varification', component: EmailVerificationComponent },

];
