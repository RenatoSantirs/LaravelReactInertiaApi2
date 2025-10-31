import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: ['user'], // por defecto
        status: 1,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Usuarios', href: '/users' },
        { title: 'Crear', href: '/users/create' },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Usuario" />

            <div className="mx-auto max-w-xl p-6">
                <h1 className="mb-4 text-2xl font-bold">Crear Usuario</h1>

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
                        <label className="block">Contraseña</label>
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
                        Crear
                    </button>
                    <Link href="/users" className="ml-2 text-gray-300">
                        Cancelar
                    </Link>
                </form>
            </div>
        </AppLayout>
    );
}

// import { useForm, Link, usePage } from '@inertiajs/react';

// type Role = { id: number; name: string };

// export default function Create() {
//   const { roles } = usePage().props as { roles: Role[] };
//   const { data, setData, post, errors } = useForm({
//     name: '',
//     email: '',
//     password: '',
//     roles: [] as string[],
//   });

//   const submit = (e: React.FormEvent) => {
//     e.preventDefault();
//     post('/users');
//   };

//   return (
//     <form onSubmit={submit} className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Crear Usuario</h1>

//       <input type="text" placeholder="Nombre" value={data.name}
//         onChange={(e) => setData('name', e.target.value)} className="border p-2 w-full mb-2" />
//       {errors.name && <div className="text-red-500">{errors.name}</div>}

//       <input type="email" placeholder="Email" value={data.email}
//         onChange={(e) => setData('email', e.target.value)} className="border p-2 w-full mb-2" />
//       {errors.email && <div className="text-red-500">{errors.email}</div>}

//       <input type="password" placeholder="Password" value={data.password}
//         onChange={(e) => setData('password', e.target.value)} className="border p-2 w-full mb-2" />
//       {errors.password && <div className="text-red-500">{errors.password}</div>}

//       <label className="block mb-2">Roles:</label>
//       {roles.map(r => (
//         <label key={r.id} className="block">
//           <input type="checkbox"
//             value={r.name}
//             checked={data.roles.includes(r.name)}
//             onChange={(e) =>
//               setData('roles',
//                 e.target.checked
//                   ? [...data.roles, r.name]
//                   : data.roles.filter(role => role !== r.name)
//               )
//             }
//           />
//           {r.name}
//         </label>
//       ))}

//       <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
//       <Link href="/users" className="ml-4">Cancelar</Link>
//     </form>
//   );
// }
