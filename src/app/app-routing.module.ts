import { CheckoutComponent } from './checkout/checkout.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PayComponent } from './pay/pay.component';
import { TransportComponent } from './transport/transport.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { DessertComponent } from './dessert/dessert.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dessert', component: DessertComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'transport', component: TransportComponent },
  { path: 'pay', component: PayComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
