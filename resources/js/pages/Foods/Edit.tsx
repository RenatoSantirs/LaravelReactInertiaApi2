import AppLayout from '@/layouts/app-layout';
import { Link, useForm, usePage } from '@inertiajs/react';

interface Foods {
  id: number;
  nombre: string;
  cantidad: number;
}

export default function Edit() {
  const { food } = usePage<{ food: Foods }>().props;
  
  const { data, setData, put, errors } = useForm({ 
    nombre: food.nombre || '', 
    cantidad: food.cantidad || '' 
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/foods/${food.id}`);
  };
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Editar Alimento</h1>
        <form onSubmit={submit} className="max-w-md space-y-4">
          <div>
            <label>Nombre</label>
            <input type="text" value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} className="w-full border p-2" />
            {errors.nombre && <p className="text-red-500">{errors.nombre}</p>}
          </div>

          <div>
            <label>Cantidad</label>
            <input type="number" value={data.cantidad} onChange={(e) => setData('cantidad', e.target.value)} className="w-full border p-2" />
            {errors.cantidad && <p className="text-red-500">{errors.cantidad}</p>}
          </div>
          
          <button className="rounded bg-blue-500 px-4 py-2 text-white">Actualizar</button>
          
          <Link href="/foods" className="ml-2 text-gray-600">
            Volver
          </Link>
        </form>
      </div>
    </AppLayout>
  );
}
