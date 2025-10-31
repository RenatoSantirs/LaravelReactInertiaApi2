import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contactos', href: '/contacts' },
        { title: 'Nuevo', href: '/contacts/create' },
    ];

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contacts');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Contacto" />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-bold">Nuevo Contacto</h1>
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
                        className="rounded bg-green-500 px-4 py-2 text-white"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
