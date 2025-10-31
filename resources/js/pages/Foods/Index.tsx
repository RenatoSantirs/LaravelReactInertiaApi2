import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

interface Food {
    id: number;
    nombre: string;
    cantidad: number;
}

export default function Index({ food }: { food: Food[] }) {
    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="mb-4 text-2xl font-black">Alimento</h1>
                <Link className="mb-4 inline-block rounded bg-green-500 px-4 py-2 text-white" href="/foods/create">
                    Nuevo Alimento
                </Link>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border-2">ID</th>
                            <th className="border-2">Nombre</th>
                            <th className="border-2">Cantidad</th>
                            <th className="border-2">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {food.length > 0 ? (
                            food.map((f) => (
                                <tr key={f.id} className="text-center">
                                    <td className="border-2">{f.id}</td>
                                    <td className="border-2">{f.nombre}</td>
                                    <td className="border-2">{f.cantidad}</td>
                                    <td className="space-x-3 border p-2">
                                        <Link href={`/foods/${f.id}/edit`} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700">
                                            Editar
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/foods/${f.id}`}
                                            onClick={(e) => {
                                                if (!confirm('¿Eliminar Alimento?')) e.preventDefault();
                                            }}
                                            className="cursor-pointer rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                        >
                                            Eliminar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4">
                                    no hay alimentos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
