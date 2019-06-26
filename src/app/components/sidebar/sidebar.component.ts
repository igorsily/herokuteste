import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  //{ path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'perfil', title: 'Perfil', icon: 'person', class: '' },
  /*{ path: 'table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: 'typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: 'notifications', title: 'Notifications', icon: 'notifications', class: '' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    this.auth.logout();
  }

}
