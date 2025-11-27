import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";

export default function Create()
{
    const {data,setData,errors,post}=useForm({
        nombre: ''
    })
    const submit = (e:React.FormEvent)=> {
        e.preventDefault();
        post('/streams');
    }

    return(
        <AppLayout>
            <Head title="Crear Stream"/>
            <div>
                <h1>Stream</h1>
                <form onSubmit={submit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={data.nombre} onChange={(e)=>setData('nombre',e.target.value)}/>
                        {errors.nombre && <p>{errors.nombre}</p>}
                    </div>
                    <button>Guardar</button>
                </form>
            </div>        
        </AppLayout>
    )
}