import axios from "axios";
import { createContext, useState,useEffect } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  console.log(cartItems)

  const url =  "http://localhost:4000"

  const [token, setToken] =  useState("")
  const [food_list, setFoodList] =  useState([])


  const addToCart = async (itemId) => {
    //number of food list  slaad  aapko kitna plate chaliye

    if (!cartItems[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAMount = 0;
    for (const item in cartItems) {

      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        // console.log(itemInfo)

        totalAMount = totalAMount + itemInfo.price * cartItems[item];
      }


      // console.log(item,"items");
      // console.log(cartItems[item],"deklo");

    }

    return totalAMount
  };


  const fetchFoodList =  async ()=>{
    const response = await axios.get(`${url}/api/food/list`)

    setFoodList(response.data.data)

  }

  const cartData = async (token)=>{
    const response =  await axios.post(url+"/api/cart/get",{},{headers:{token}})

    setCartItem(response.data.cartData)




  }

  useEffect(() => {



    async function loadData(){
      await fetchFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await cartData(localStorage.getItem("token"))
      }
    }

    loadData()


  

  }, [])



  

  const contextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };



  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
