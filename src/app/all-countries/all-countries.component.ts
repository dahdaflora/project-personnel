import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CountryInterface } from '../country.interface';
import { orderBy } from 'lodash-es';
@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.scss'],
  providers: [Location]
})
export class AllCountriesComponent implements OnInit {
  public currrentregion;
  public allCountries: CountryInterface[];
  public temp;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: CountriesService,
    private location: Location,
    
  ) {
    this.currrentregion = this.route.snapshot.paramMap.get('region');
    // console.log(this.currrentregion);
  }

  ngOnInit() {
    // get allcoutries
    // this.http.getAllCountries(this.currrentregion).subscribe(
    //   data => {
    //     this.allCountries = data;
    //     this.temp = data;
    //     // console.log(this.allCountries);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // this.route.params.subscribe(routeParams => {
    //   console.log(routeParams);
    //   this.http.getAllCountries(routeParams.region).subscribe(
    //     data => {
    //       this.allCountries = data;
    //       console.log(this.allCountries);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // });
    // get query params
    this.route.queryParams.subscribe(queryParams => {
      // console.log(queryParams);
      if (queryParams.currency) {
        this.http
          .getCountriesByCurrency(queryParams.currency)
          .subscribe(data => {
            // console.log(data);
            this.allCountries = data;
            this.temp = data;
            
          });
      } else if (queryParams.language) {
        this.http
          .getCountriesByLanguage(queryParams.language)
          .subscribe(data => {
            // console.log(data);
            this.allCountries = data;
            this.temp = data;
            
          });
      } else {
        this.http.getAllCountries(this.currrentregion).subscribe(
          data => {
            this.allCountries = data;
            this.temp = data;
            // console.log(this.allCountries);
          },
          error => {
            console.log(error);
          }
        );
        console.log('error in params or No Parameter', { queryParams });
      }
    });
  }
  public goBackToPreviousPage() {
    this.location.back();
  }
  search(value: string) {
    // console.log({value});
    if (value.length > 4) {
      this.http.getCountriesByName(value).subscribe(
        data => {
          this.allCountries = data;
          
        },
        error => {
          console.log(error);
          console.log(error.error.message);
          
        }
      );
    } else {
      
      this.allCountries = this.temp;
    }
  }
  public sort(event): void {
    const val = event.target.value;
    if (val === 'languages') {
      this.temp = orderBy(
        this.allCountries,
        ['languages[0].name', 'languages[1].name'],
        ['asc']
      );
      // console.log(this.temp);
      this.allCountries = this.temp;
      
    } else {
      this.temp = orderBy(this.allCountries, [val], ['asc']);
      // console.log(this.temp);
      this.allCountries = this.temp;
       
    }
  }
}
