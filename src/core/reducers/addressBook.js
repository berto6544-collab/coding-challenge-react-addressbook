const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */

      //when we find id in addresses then we return state. 
      let i =  state.addresses.findIndex((e)=>e.id === action.payload.id);
      if(i !== -1)return state;

      //if we dont find id ind addresses then its a new address.
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */
       

        //find the index of the address book.
        let index =  state.addresses.findIndex((e)=>e.id === action.payload)

          //if we find the index then remove address.
        if(index !== -1)state.addresses.splice(index,1);
        
        
        //return updated state
        return { ...state, addresses: [...state.addresses] };


    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
