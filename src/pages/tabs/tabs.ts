import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CurrencyPage } from '../currency/currency';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CurrencyPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
