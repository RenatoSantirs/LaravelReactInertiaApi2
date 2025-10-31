import { useForm, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

type Contact = { id: number; name: string; email: string; phone: string };

export default function Edit() {
    const { contact } = usePage<{ contact: Contact }>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contactos', href: '/contacts' },
        { title: 'Editar', href: `/contacts/${contact.id}/edit` },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();// 🔴 Evita que el navegador recargue la página
        put(`/contacts/${contact.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Contacto" />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Editar Contacto</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block">Nombre</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border px-2 py-1"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border px-2 py-1"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block">Teléfono</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full border px-2 py-1"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Actualizar
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
