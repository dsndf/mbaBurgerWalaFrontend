import React, { useCallback, useState } from "react";
import { data } from "../data.js";
import MenuCard2 from "./MenuCard2";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md";
import "../styles/Items.scss";
import { motion } from "framer-motion";
import Loading from "./Loading.jsx";
const Items = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);
  const [pno, setPno] = useState(1);
  const [arr, setArr] = useState([...data].slice(0, 6));
  const [marr, setMarr] = useState(data.length);
  const [loading, setLoading] = useState(false);
  const addToCartHandler = (name, price, qty, img) => {
    if (cart.find((v) => v.name === name)) {
      toast.info("Already in cart!");
    } else {
      dispatch(setCart({ name, price, qty, img }));
      toast.success("Added to cart!");
    }
  };

  let pagearr = [];

  for (let i = 0; i < marr / 6; i++) {
    pagearr.push(i);
  }
  const setPage = (page) => {
    setArr(data.slice((page - 1) * 6, page * 6));
    setPno(page);
  };
  console.log(arr);

  const betterFunction = useCallback(() => {
    let tid;

    return (name) => {
      if (tid) {
        clearTimeout(tid);
      }

      setLoading(true);
      tid = setTimeout(() => {
        if (!name) {
          setArr([...data].slice(0, 4));
          setMarr(data.length);
          setLoading(false);
          return;
        }

        let t = data.filter((v) => {
          console.log(v.name);
          let re = new RegExp(name, "gi");
          return re.test(v.name) ? v : null;
        });
        setArr(t);
        setMarr(t.length);
        setPno(1);
        setLoading(false);
      }, 2000);
    };
  }, []);
  const searchItem = betterFunction();

  return (
    
    <>
      <motion.div
        className="search"
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        animate={{
          x: "0%",
          opacity: 1,
          
        }}
        transition={{
          duration:"0.5"
        }}

      >
        <MdSearch />
        <input
          type="text"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Your Food Item..."
        />
        {/* <button className="btn" style={{backgroundColor:"black" , border:"none"}}>Search</button> */}
      </motion.div>
      {loading ? (
        <Loading />
      ) : (
        arr.length?<>
          <motion.div
            className="allMenuItems"
            initial={{
              x: "100%",
              opacity: 0,
            }}
            animate={{
              x: "0%",
              opacity: 1,
              
            }}
            transition={{
              duration:"0.5"
            }}
          >
            {arr
              ? arr.map((v, ind) => {
                  return (
                    <MenuCard2
                      key={ind}
                      de={0.1 + ind}
                      name={v.name}
                      item={ind}
                      image={v.img}
                      price={v.price}
                      handler={addToCartHandler}
                    />
                  );
                })
              : null}
          </motion.div>
          <div className="pagination-cont">
            {" "}
            {pagearr &&
              pagearr.map((v, i) => {
                return (
                  <button
                    className={i + 1 === pno ? "active" : "unactive"}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                );
              })}
          </div>
        </>:<div className="not-found">
        <h2>
          No Items Are Available!

        </h2>
        </div>
    
      )}
    </>
  );
};

export default Items;
