const loadPhone = async (searchText , isShowAll) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
   const data = await res.json();
   const phones = data.data;

   displayPhones(phones ,isShowAll)
}


const displayPhones = (phones , isShowAll) => {
   // console.log(phones);
   // 1 get element 
   const phoneContainer = document.getElementById('phone-container')

   // clear phone container befre appand more data 
   phoneContainer.textContent = '';

   const showAllContainer = document.getElementById('show-all-container')
   if(phones.length > 11 && !isShowAll){
      showAllContainer.classList.remove('hidden')
   }
   else{
      showAllContainer.classList.add('hidden')
   }

   console.log('is show all ' , isShowAll);

   // if i want to show first 12 phone but not show alll 

   if(!isShowAll){
      phones = phones.slice(0, 12)
   }

   


   phones.forEach(phone => {
      console.log(phone);
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
          <button class="btn btn-primary">Buy Now</button>
      </div>
  </div>
      `;
      // 4 append child 

      phoneContainer.appendChild(phoneCard)

   });
   // hide loading spinner 
   toggleLoadingSpinner(false)
}


// Handle search

const handleScarch =(isShowAll) =>{
   toggleLoadingSpinner(true)
   const searchfild = document.getElementById('search-fild')
   const searchText = searchfild.value;
   console.log(searchText);
   loadPhone(searchText , isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
   const loadingSpinner = document.getElementById('loding-spinner');
   if(isLoading){
      loadingSpinner.classList.remove('hidden')
   }
   else{
      loadingSpinner.classList.add('hidden')
   }
} 

// show all handle 
  const handleShowAll = ()=>{
   handleScarch(true );
  }

loadPhone();