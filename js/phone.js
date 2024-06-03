const loadPhone = async (searchText = "10 ", isShowAll) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
   const data = await res.json();
   const phones = data.data;

   displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
   // console.log(phones);
   // 1 get element 
   const phoneContainer = document.getElementById('phone-container')

   // clear phone container befre appand more data 
   phoneContainer.textContent = '';

   const showAllContainer = document.getElementById('show-all-container')
   if (phones.length > 11 && !isShowAll) {
      showAllContainer.classList.remove('hidden')
   }
   else {
      showAllContainer.classList.add('hidden')
   }

   // console.log('is show all ', isShowAll);

   // if i want to show first 12 phone but not show alll 

   if (!isShowAll) {
      phones = phones.slice(0, 12)
   }




   phones.forEach(phone => {
      // console.log(phone);
      // 2 creat a div 
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card  p-4 bg-base-100 shadow-xl`
      // 3 creet inner html
      phoneCard.innerHTML = `
      <figure class="px-10 pt-10">
      <img src="${phone.image}" alt="Shoes"
          class="rounded-xl" />
       </figure>
       <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn text-white bg-[#0D6EFD] rounded-xl  btn-primary">Show Details</button>
      </div>
  </div>
      `;
      // 4 append child 

      phoneContainer.appendChild(phoneCard)

   });
   // hide loading spinner 
   toggleLoadingSpinner(false)
}


const handleShowDetails = async (id) => {
   // console.log('show details has clicked', id);

   // load details dynamic ways 
   const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json();
   console.log(data);
   const phone = data.data;
   showPhoneDetails(phone);
}
 
// show details section 
const showPhoneDetails = (phone) => {

   const phoneName = document.getElementById('show-details-phone-name');
   phoneName.innerText = phone.name;

  

   const showDetailsContainer = document.getElementById('show-details-container')

   showDetailsContainer.innerHTML= `
     <div class="flex justify-center"> <img src="${phone.image}" alt = "" /></div>
     <br>
      <div>
      <p><span>Storage: </span>${phone?.mainFeatures?.storage} </p>
      <p><span>displaySize: </span>${phone?.mainFeatures?.displaySize} </p>
      <p><span>chipSet: </span>${phone?.mainFeatures?.chipSet} </p>
      <p><span>memory: </span>${phone?.mainFeatures?.memory} </p>
      <p><span>sensors: </span>${phone?.mainFeatures?.sensors} </p>
      <p><span> WLAN: </span>${phone?.others?.WLAN} </p>
      <p><span> Bluetooth: </span>${phone?.others?.Bluetooth} </p>
      <p><span> GPS: </span>${phone?.others?.GPS} </p>
      <p><span> USB: </span>${phone?.others?.USB} </p>
      <p><span> releaseDate: </span>${phone?.releaseDate} </p>
      </div>
       
   `

   show_details_modal.showModal()
}

// Handle search

const handleScarch = (isShowAll) => {
   toggleLoadingSpinner(true)
   const searchfild = document.getElementById('search-fild')
   const searchText = searchfild.value;
   console.log(searchText);
   loadPhone(searchText, isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
   const loadingSpinner = document.getElementById('loding-spinner');
   if (isLoading) {
      loadingSpinner.classList.remove('hidden')
   }
   else {
      loadingSpinner.classList.add('hidden')
   }
}

// show all handle 
const handleShowAll = () => {
   handleScarch(true);
}

loadPhone();









