import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type Contact = { id: number; name: string; email: string; phone: string };

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedContacts {
    data: Contact[];
    links: PaginationLink[];
}

interface ContactsProps {
    contacts: PaginatedContacts;
    filters: { search?: string };
}

export default function Index() {
    //Para que solo vea el admin colocando isAdmin
    // const { contacts, filters, auth } = usePage<ContactsProps & { auth: any }>().props;
    // const isAdmin = auth?.user?.roles?.includes('admin');

    const { contacts, filters } = usePage<ContactsProps>().props;

    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contactos', href: '/contacts' },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        get('/contacts', { preserveState: true }); // mantiene la paginación y filtros
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contactos" />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Contactos</h1>

                {/* 🔎 Buscador + botón nuevo */}
                <div className="mb-4 flex items-center justify-between">
                    <form onSubmit={submit} className="flex gap-2">
                        <input
                            type="text"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            placeholder="Buscar contacto..."
                            className="rounded border p-2"
                        />
                        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                            Buscar
                        </button>
                    </form>

                    <Link href="/contacts/create" className="rounded bg-green-500 px-4 py-2 text-white">
                        Nuevo
                    </Link>
                </div>

                {/* 📋 Tabla */}
                <table className="mt-4 w-full border">
                    <thead>
                        <tr>
                            <th className="border p-2">Nombre</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Teléfono</th>
                            <th className="border p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.data.length > 0 ? (
                            contacts.data.map((c) => (
                                <tr key={c.id}>
                                    <td className="border p-2">{c.name}</td>
                                    <td className="border p-2">{c.email}</td>
                                    <td className="border p-2">{c.phone}</td>
                                    <td className="flex gap-2 border p-2">
                                        <Link href={`/contacts/${c.id}/edit`} className="cursor-pointer rounded bg-orange-300 px-3 py-1 text-black transition hover:bg-red-600">
                                            Editar
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/contacts/${c.id}`}
                                            onClick={(e) => {
                                                if (!confirm('¿Deseas eliminar este contacto?')) {
                                                    e.preventDefault(); // ❌ Cancela si el usuario elige "Cancelar"
                                                }
                                            }}
                                            className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                                        >
                                            Eliminar
                                        </Link>
                                    </td>

                                    {/* Para que solo vea el admin
                                    <td className="flex gap-2 border p-2">
                                        {isAdmin && (
                                            <>
                                                <Link href={`/contacts/${c.id}/edit`} className="text-blue-600">
                                                    Editar
                                                </Link>
                                                <Link as="button" method="delete" href={`/contacts/${c.id}`} className="text-red-600">
                                                    Eliminar
                                                </Link>
                                            </>
                                        )}
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="border p-4 text-center text-gray-500">
                                    No se encontraron contactos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 🔗 Paginación */}
                <div className="mt-4 flex gap-2">
                    {contacts.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`rounded border px-3 py-1 ${
                                link.active ? 'bg-gray-300 font-bold' : ''
                            } ${!link.url ? 'cursor-not-allowed text-gray-400' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
