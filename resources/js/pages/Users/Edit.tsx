import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
    roles: { name: string }[];
    status: number;
};

interface EditProps {
    user: User;
}

export default function Edit() {
    const { user } = usePage<{ user: User }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles?.map((r) => r.name) || ['user'], // 👈 array de roles
        status: user.status ? 1 : 0, //estado activo
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Usuarios', href: '/users' },
        { title: 'Editar', href: `/users/${user.id}/edit` },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Usuario: ${user.name}`} />

            <div className="mx-auto max-w-xl p-6">
                <h1 className="mb-4 text-2xl font-bold">Editar Usuario</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block">Nombre</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.email && <div className="text-red-600">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block">Nueva Contraseña (opcional)</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.password && <div className="text-red-600">{errors.password}</div>}
                    </div>

                    <div>
                        <label className="block">Rol</label>
                        <select
                            value={data.roles[0] || ''} // primer rol
                            onChange={(e) => setData('roles', [e.target.value])}
                            className="w-full rounded border p-2"
                        >
                            <option value="user" className='text-black'>User</option>
                            <option value="admin" className='text-black'>Admin</option>
                        </select>
                        {errors.roles && <div className="text-red-600">{errors.roles}</div>}
                    </div>

                    <div>
                        <label className="block">Estado</label>
                        <select value={data.status} onChange={(e) => setData('status', Number(e.target.value))} className="w-full rounded border p-2">
                            <option value={1} className='text-black'>Activo</option>
                            <option value={0} className='text-black'>Inactivo</option>
                        </select>
                        {errors.status && <div className="text-red-600">{errors.status}</div>}
                    </div>

                    <button type="submit" disabled={processing} className="rounded bg-blue-500 px-4 py-2 text-white">
                        Guardar
                    </button>
                    <Link href="/users" className="ml-2 text-gray-300">
                        Cancelar
                    </Link>
                </form>
            </div>
        </AppLayout>
    );
}

// import { Link, useForm, usePage } from '@inertiajs/react';

// type Role = { id: number; name: string };
// type User = {
//     id: number;
//     name: string;
//     email: string;
//     roles: { id: number; name: string }[];
// };

// export default function Edit() {
//     const { user, roles } = usePage().props as { user: User; roles: Role[] };

//     const { data, setData, put, errors } = useForm({
//         name: user.name || '',
//         email: user.email || '',
//         password: '',
//         roles: user.roles ? user.roles.map((r) => r.name) : [], // 👈 evita undefined
//     });

//     const submit = (e: React.FormEvent) => {
//         e.preventDefault();
//         put(`/users/${user.id}`);
//     };

//     return (
//         <form onSubmit={submit} className="p-6">
//             <h1 className="mb-4 text-2xl font-bold">Editar Usuario</h1>

//             <input
//                 type="text"
//                 placeholder="Nombre"
//                 value={data.name}
//                 onChange={(e) => setData('name', e.target.value)}
//                 className="mb-2 w-full border p-2"
//             />
//             {errors.name && <div className="text-red-500">{errors.name}</div>}

//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={data.email}
//                 onChange={(e) => setData('email', e.target.value)}
//                 className="mb-2 w-full border p-2"
//             />
//             {errors.email && <div className="text-red-500">{errors.email}</div>}

//             <input
//                 type="password"
//                 placeholder="Password (opcional)"
//                 value={data.password}
//                 onChange={(e) => setData('password', e.target.value)}
//                 className="mb-2 w-full border p-2"
//             />
//             {errors.password && <div className="text-red-500">{errors.password}</div>}

//             <label className="mb-2 block">Roles:</label>
//             {roles.map((r) => (
//                 <label key={r.id} className="block">
//                     <input
//                         type="checkbox"
//                         value={r.name}
//                         checked={data.roles.includes(r.name)}
//                         onChange={(e) => setData('roles', e.target.checked ? [...data.roles, r.name] : data.roles.filter((role) => role !== r.name))}
//                     />
//                     {r.name}
//                 </label>
//             ))}

//             <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
//                 Actualizar
//             </button>
//             <Link href="/users" className="ml-4">
//                 Cancelar
//             </Link>
//         </form>
//     );
// }
