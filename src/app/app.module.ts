import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { CartComponent } from './cart/cart.component';
import { TransportComponent } from './transport/transport.component';
import { PayComponent } from './pay/pay.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DessertinfoComponent } from './dessertinfo/dessertinfo.component';
import { DesserthomeComponent } from './desserthome/desserthome.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    DessertComponent,
    LoginComponent,
    BottombarComponent,
    CartComponent,
    TransportComponent,
    PayComponent,
    ReceiptComponent,
    CheckoutComponent,
    DessertinfoComponent,
    DesserthomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
