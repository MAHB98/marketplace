// "use client";
import { viweProduct } from "../action/viweProduct";
import ProductRender from "../(component)/ProductRender";

const FirstPage = async () => {
 const limit = "10";
 //  const [product, setProduct] = useState<z.infer<typeof ProductSchema>[] | null>(
 //   null
 //  );
 //  useEffect(() => {
 //   res();
 //  }, []);
 const product = await viweProduct({ limit });
 return (
  <div>
   {product && product.map((ar, i) => <ProductRender key={i} product={ar} />)}
  </div>
 );
};
export default FirstPage;
