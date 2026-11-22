import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

export default function Show({ product }: any) {
  const { data, setData, post } = useForm({
    product_id: product.id,
    quantity: 1,
  });

  const addToCart = () => {
    post('/cart');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">{product.nombre}</h1>
        <p className="mt-2">{product.descripcion}</p>
        <p className="text-xl font-bold mt-4">${product.precio}</p>

        <input
          type="number"
          min={1}
          max={product.stock}
          value={data.quantity}
          onChange={(e) => setData('quantity', Number(e.target.value))}
          className="mt-4 border rounded p-2 w-24"
        />

        <button
          onClick={addToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          Agregar al carrito
        </button>
      </div>
    </AppLayout>
  );
}
