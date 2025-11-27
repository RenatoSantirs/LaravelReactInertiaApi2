import AppLayout from "@/layouts/app-layout";
import { Head, useForm, usePage } from "@inertiajs/react"

interface Stream{
    id:number,
    nombre:string
}

export default function Edit()
{
    const { stream } = usePage<{ stream: Stream }>().props;
    
    const {data,setData,errors,put}=useForm({
        nombre : stream.nombre||'',
    });

    const submit = (e:React.FormEvent)=>{
        e.preventDefault();
        put(`/streams/${stream.id}`)
    }

    return(
        <AppLayout>
            <Head title="Editar Stream"/>
            <div>
                <h1>Editar Stream</h1>
                <form onSubmit={submit}>
                    <label>Nombre</label>
                    <input type="text" value={data.nombre} onChange={(e)=>setData('nombre',e.target.value)}/>
                    {errors.nombre && <p>{errors.nombre}</p>}
                    <button className="">Editar</button>
                </form>

            </div>
        </AppLayout>
    )
}