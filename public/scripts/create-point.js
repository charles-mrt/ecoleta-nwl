
// Consumes IBGE api data to obtain states
	 function PopulateUfs() {
		let ufSelect = document.querySelector( "select[name=uf]" );
		
		 fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" )
		.then ( res => res.json() )
		 .then ( states => {
			for ( state of states ) {
				ufSelect.innerHTML+=  `<option value="${state.id}">${state.nome}</option>`
			}
			
		});
	}
	 PopulateUfs();
 	 
// Consumes IBGE api data to obtain Cities
	 function GetCities( event ) {
		const citySelect = document.querySelector( "select[name=city]" );
		const stateInput = document.querySelector( "input[name=state]" );
		const ufValue = event.target.value;

		const indexOfselectedState = event.target.selectedIndex;
		stateInput.value = event.target.options[indexOfselectedState].text;

		const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
		
		citySelect.innerHTML = "<option>Selecione uma cidade</option>";
		citySelect.disabled = true;	

		fetch ( url )
		.then ( res => res.json() )
		.then ( cities => {
			for ( city of cities ) {
				citySelect.innerHTML+=`<option value="${city.nome}">${city.nome}</option>`
			}
			
			citySelect.disabled = false;						
		});
	}

	 document.querySelector( "select[name=uf]" )
	 .addEventListener( "change" , GetCities );


/*
 * collection items
 */

 const itemsToCollect = document.querySelectorAll( ".items-grid li" );

for ( item of itemsToCollect ) {
	item.addEventListener( "click" , handleSelectorItem );
}


const collectedItems = document.querySelector( "input[name=items]");
let selectedItems = [];

 function handleSelectorItem ( event ) {
 	const itemLi = event.target;

 	itemLi.classList.toggle( "selected" );
 	
 	const itemId = itemLi.dataset.id; 	 		

   //verify if item selected exist  
 	const alreadySelected =  selectedItems.findIndex( item => item == itemId );

 	// remove item if is already selected
 	if ( alreadySelected >= 0 ) { 	 	
 		const filteredItems = selectedItems.filter( item => {
 			const itemIsDifferent = item != itemId;
 			return itemIsDifferent;
 		});
 		selectedItems = filteredItems;
 	} else {
 		selectedItems.push( itemId );
 	}

 	//update hidden field with selected items
  	collectedItems.value = selectedItems;
 }



