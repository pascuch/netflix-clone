import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import {loadStripe} from '@stripe/stripe-js'

const stripePublicKey = 'pk_test_51LTMkiE4TQTWxYg4dJh8ETj2gLezIHvwnnjdqcE2DEAiN01HwBveCPZP3dpy38gEKHCj7aeLAmk02iMbpoFpAuEB00xFC4p1Rq'

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            })
        })
    }, [user.uid])

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const handleCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    
      docRef.onSnapshot(async snap => {
        const {error, sessionId} = snap.data();

        if(error) {
            alert('An error ocurred: ', error.message)
        }

        if(sessionId) {
            const stripe = await loadStripe(stripePublicKey)
            stripe.redirectToCheckout({sessionId})
        }
      })
  };

  return (
    <div className="">
      <h2 className="border-b-2 border-[#282c2d] mt-5 font-bold text-xl">{subscription ? `Plans (Current plan: ${subscription.role.toUpperCase()})` : 'Plans'}</h2>
      {subscription && (
      <h3>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</h3>
      )}
      <div className="w-full my-2">
        {Object.entries(products).map((productData) => {
            const isCurrentPlan = productData[1].name?.toLowerCase().includes(subscription?.role)

          return (
            <div
              key={productData[1].name}
              className="flex justify-between items-center lg:px-8 py-4"
            >
              <div className="">
                <h3 className="text-sm font-semibold">{productData[1].name}</h3>
                <h4 className="text-xs">{productData[1].description}</h4>
              </div>
              <button onClick={() => !isCurrentPlan && handleCheckout(productData[1].prices.priceId)} className={`py-2 px-5 text-white text-sm ${ isCurrentPlan ? 'bg-[gray]' : 'bg-[#e50914] hover:bg-[#e3222c]'} font-semibold cursor-pointer`}>
                {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Plans;
