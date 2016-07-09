import { Component, OnInit } from '@angular/core';
import {BusinessService} from './services/business.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Business} from './interfaces/business';
import {Catgory} from './interfaces/catgory';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [BusinessService]
})

export class AppComponent implements OnInit {
  title = 'app works!';
  businesses: Business[];
  categories: Catgory[];
  appState: string;
  activeKey: string;

  activeCompany: string;
  activeCategory: string;
  activeYearsInBusiness: string;
  activeDescription: string;
  activePhone: string;
  activeEmail: string;
  activeStreetAddress: string;
  activeCity: string;
  activeState: string;
  activeZipcode: string;

  constructor(private _businessService: BusinessService) {

  }

  ngOnInit() {
    this.appState = 'default';
    this._businessService.getBusiness().subscribe(business => this.businesses = business);
    this._businessService.getCategories().subscribe(categories => { this.categories = categories; console.log(this.categories); });
  }

  changeState(state, key = null) {
    console.log("App State", state)
    if (key) {
      console.log("App State", key)
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCatagory(category: string) {
    this._businessService.getBusiness(category).subscribe(business => this.businesses = business);
  }

  addBusiness(
    company: string,
    category: string,
    years_in_business: number,
    description: string,
    phone: string,
    email: string,
    street_address: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    var created_at = new Date().toString();
    var newBusiness = {
      company: company,
      category: category,
      years_in_business: years_in_business,
      description: description,
      phone: phone,
      email: email,
      street_address: street_address,
      city: city,
      state: state,
      zipcode: zipcode,
      created_at: created_at
    }

    console.log(newBusiness);

    this._businessService.addBusiness(newBusiness);
    this.changeState('default');
  }

  showEdit(business) {
    this.changeState('edit', business.$key);
    this.activeCompany = business.company;
    this.activeCategory = business.category;
    this.activeYearsInBusiness = business.years_in_business;
    this.activeDescription = business.description;
    this.activePhone = business.phone;
    this.activeEmail = business.email;
    this.activeStreetAddress = business.street_address;
    this.activeCity = business.city;
    this.activeState = business.state;
    this.activeZipcode = business.zipcode;
  }

  updateBusiness() {
    var updBusiness:Business = {
      company: this.activeCompany,
      category: this.activeCategory,
      years_in_business: parseInt(this.activeYearsInBusiness),
      description: this.activeDescription,
      phone: this.activePhone,
      email: this.activeEmail,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      state: this.activeState,
      zipcode: this.activeZipcode
    }

    this._businessService.updateBusiness(this.activeKey, updBusiness);
    this.changeState('default');
  }

  deleteBusiness(key) {
    this._businessService.deleteBusiness(key);
    this.changeState('default');
  }
}
