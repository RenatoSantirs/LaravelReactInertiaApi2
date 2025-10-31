import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, PageProps, usePage } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
    roles: { name: string }[];
    status: number; // 👈
};

interface UsersProps extends PageProps {
    users: User[];
}

export default function Index() {
    const { users } = usePage<UsersProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Usuarios', href: '/users' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Usuarios</h1>
                <Link href="/users/create" className="rounded bg-blue-500 px-4 py-2 text-white">
                    Nuevo
                </Link>

                <table className="mt-4 w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Roles</th>
                            <th className="border p-2">Estado</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="border p-2">{u.name}</td>
                                <td className="border p-2">{u.email}</td>
                                <td className="border p-2">{u.roles.map((r) => r.name).join(', ')}</td>
                                <td className="border p-2">
                                    {u.status ? (
                                        <span className="font-bold text-green-600">Activo</span>
                                    ) : (
                                        <span className="font-bold text-red-600">Inactivo</span>
                                    )}
                                </td>
                                <td className="flex gap-2 border p-2">
                                    <Link href={`/users/${u.id}/edit`} className="text-blue-600">
                                        Editar
                                    </Link>
                                    <Link as="button" method="delete" href={`/users/${u.id}`} className="text-red-600">
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

// import { Link, usePage } from '@inertiajs/react';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   roles: { id: number; name: string }[];
// };

// export default function Index() {
//   const { users } = usePage().props as { users: User[] };

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Usuarios</h1>
//       <Link href="/users/create" className="rounded bg-blue-500 px-4 py-2 text-white">
//         Nuevo Usuario
//       </Link>
//       <table className="mt-4 w-full border">
//         <thead>
//           <tr>
//             <th className="border p-2">Nombre</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Roles</th>
//             <th className="border p-2">Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td className="border p-2">{u.name}</td>
//               <td className="border p-2">{u.email}</td>
//               <td className="border p-2">{u.roles.map(r => r.name).join(', ')}</td>
//               <td className="flex gap-2 border p-2">
//                 <Link href={`/users/${u.id}/edit`} className="text-blue-600">Editar</Link>
//                 <Link as="button" method="delete" href={`/users/${u.id}`} className="text-red-600">Eliminar</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
