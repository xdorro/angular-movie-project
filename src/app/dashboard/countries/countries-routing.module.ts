import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryIndexComponent} from './country-index/country-index.component';
import {CountryCreateComponent} from './country-create/country-create.component';
import {CountryEditComponent} from './country-edit/country-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CountryIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: CountryCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':countryId/edit',
        component: CountryEditComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {
}
