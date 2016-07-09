import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {Business} from '../interfaces/business';
import {Catgory} from '../interfaces/catgory';

@Injectable()
export class BusinessService {
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Catgory[]>;

  constructor(private _af: AngularFire) {

  }

  getBusiness(category: string = null) {
    console.log(category);
    if (category != null && category != '0') {
      this.businesses = this._af.database.list('business', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      }) as FirebaseListObservable<Business[]>;
    } else {
      this.businesses = this._af.database.list('business') as FirebaseListObservable<Business[]>;
    }
    return this.businesses;
  }

  getCategories() {
    this.categories = this._af.database.list('categories') as FirebaseListObservable<Catgory[]>;
    return this.categories;
  }

  addBusiness(newBusiness): Promise<any>{
    return this.businesses.push(newBusiness);
  }

  updateBusiness(key:string , updBusiness:Business): Promise<any>{
    return this.businesses.update(key , updBusiness);
  }

  deleteBusiness(key:string): Promise<any>{
     return this.businesses.remove(key);
  }
}
