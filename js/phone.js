const loadPhone = async (searchText) => {
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
   const data = await res.json();
   const phones = data.data;

   displayPhones(phones)
}


const displayPhones = phones => {
   // console.log(phones);
   // 1 get element 
   const phoneContainer = document.getElementById('phone-container')

   // clear phone container befre appand more data 
   phoneContainer.textContent = '';

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
}


// Handle search

const handleScarch =() =>{
   const searchfild = document.getElementById('search-fild')
   const searchText = searchfild.value;
   console.log(searchText);
   loadPhone(searchText)
}



loadPhone();