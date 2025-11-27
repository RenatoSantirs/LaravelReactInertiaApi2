import AppLayout from "@/layouts/app-layout"
import { Head, Link } from "@inertiajs/react"

interface Stream{
    id:number,
    nombre : string
}

export default function Stream({stream}:{stream: Stream[]})
{
    return(
        <AppLayout>
            <Head title="Streams"></Head>
            <div className="p-6">
                <h1>Stream</h1>
                <Link href={`/streams/create`} className="bg-blue-700">Crear</Link>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stream.map((s)=>(
                            <tr key={s.id}>
                                <th>{s.id}</th>
                                <th>{s.nombre}</th>
                                <th>
                                    <Link href={`/streams/${s.id}/edit`} className="bg-amber-700">Editar</Link>
                                    <Link href={`/streams/${s.id}`} method="delete" className="bg-red-700">Eliminar</Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}