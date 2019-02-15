import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {
  loading: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    public loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() { 
    this.presentLoader();
    this.logout();
  }

  logout(): void{
    this.authService.logOut().subscribe(
      (response: any) => {
        this.cookieService.delete('sugar', '/ionicUsers');
        window.location.href='/ionicUsers';
      }
    );
  }

  async presentLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await this.loading.present();
  }

}