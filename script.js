
let createRegionlist = []

fetch('https://restcountries.com/v2/all')
    .then((response) => {
        return response.json()
    })
    .then((actualApiResponse) => {
        console.log(actualApiResponse)



        if (Array.isArray(actualApiResponse)) {
            onCountryApiSucess(actualApiResponse)


        }

    });


function onCountryApiSucess(countries = []) {
    createRegionlist = countries;

            
    const regions = countries.map((apiresponse) => apiresponse.region);
    // console.log("regions", regions)
    const uniqueOne = [...new Set(regions)]
    console.log("countries", uniqueOne);

    uniqueOne.forEach((mainResponse) => {
        CreateRegionLink(mainResponse);
    });

    createCountriesCards(countries);




    const createCountriesSelectOption = document.querySelector("#selectCountry");
    createCountriesSelectOption.addEventListener('change',() => {
        document.querySelector('.list-countries').innerHTML= '';
      const value = createCountriesSelectOption.value;



      if(value){
        const findedCountry = countries.find((country)=>  country.name === value);
        // console.log("on change the countries", value, findedCountry)
        CreateCountryCards(findedCountry);
  

      }
      else{
        createCountriesCards(countries);

      }
     
    //   

    });
    // const findedCountry = countries.find((country)=>  country.name === value);
    //   console.log("on change the countries", value, findedCountry)
    //   CreateCountryCards(findedCountry);


   const inputElement = document.querySelector("#searchCountry")
    inputElement .addEventListener('keyup',() => {
        const searchValue = inputElement .value;
        document.querySelector('.list-countries').innerHTML= '';
        if (searchValue){
            const searchCountries = countries.filter((country) =>  
            country.name.includes(searchValue )
            
            );
            createCountriesCards(searchCountries);
        }
        else{
            createCountriesCards(countries);
        }
        // const searchCountries = countries.filter(country =>  country.name.includes(searchValue ));
        // createCountriesCards(searchCountries)
    })
}



function CreateRegionLink(region) {
    const a = document.createElement('a');
    a.setAttribute('href', '#')
    a.setAttribute('class', 'list-group-item list-group-item-action active bg-success bg-info form-label')
    a.setAttribute('id', 'region')
    a.innerText = region;
    document.querySelector('.list-group ').appendChild(a);

    a.addEventListener('click', () => {

        document.querySelector('.list-countries').innerHTML='';
        const regionNameclick = createRegionlist.filter(
        (country) => country.region === region
        );
        createCountriesCards(regionNameclick);
    })

}


function createCountriesCards(listOfCountries = []) {
    console.log("countrycard", listOfCountries);



    for (let i = 0; i < listOfCountries.length; i++) {
        const loopedItemCountry = listOfCountries[i];
        const countryName = loopedItemCountry.name;


        creatSelectOption(countryName);
        CreateCountryCards(loopedItemCountry);


        // const selectOption = document.createElement('option')
        // selectOption.innerText = countryName;
        // selectOption.value = countryName;
        // document.querySelector('select').appendChild(selectOption);

    }


}


function creatSelectOption(countryName) {


    const selectOption = document.createElement('option')
    selectOption.innerText = countryName;
    selectOption.value = countryName;
    document.querySelector('#selectCountry').appendChild(selectOption);



}


function CreateCountryCards(country = {}) {
    // console.log("CreateCountryCards",country)


    const createColumDiv = document.createElement('div')
    createColumDiv.setAttribute("class", "col-md-4 mb-4");




    const cardTemplate = `<div class="card h-100">
     


           
            
        <img src="${country.flag}" alt="" class="card-img-top"/>



            <div class="card-body">
                <h2 class="card-title"> ${country.name}</h2>

                <table class="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Regions</th> 
                            <td>${country.region}</td>
                                            
                        </tr>
                        <tr>
                            <th>Capital</th>
                            <td>${country.capital}</td>

                                                
                        </tr>





                    </tbody>





                </table>



            </div>


    </div>`

    createColumDiv.innerHTML = cardTemplate;
    document.querySelector('.list-countries').appendChild(createColumDiv);

}