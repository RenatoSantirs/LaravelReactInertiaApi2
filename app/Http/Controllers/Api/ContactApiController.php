<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactApiController extends Controller
{
    public function __construct()
    {
        // Autenticación por token
        $this->middleware('auth:sanctum');
    }


    // GET /api/contacts (listar todos)
    public function index(Request $request)
    {
        if (! $request->user()->can('view contacts')) {
            return response()->json(['message' => 'No tienes permiso para ver contactos'], 403);
        }
        return response()->json(Contact::all());
    }

    // GET /api/contacts/{id} (ver uno)
    public function show($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contacto no encontrado'], 404);
        }

        return response()->json($contact);
    }

    // POST /api/contacts (crear)
    public function store(Request $request)
    {
        if (! $request->user()->can('create contacts')) {
            return response()->json(['message' => 'No tienes permiso para crear contactos'], 403);
        }

        $data = $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email|unique:contacts',
            'phone' => 'required|string',
        ]);

        $contact = Contact::create($data);

        return response()->json($contact, 201); // 201 = creado
    }

    // PUT/PATCH /api/contacts/{id} (actualizar)
    public function update(Request $request, $id)
    {
        if (! $request->user()->can('edit contacts')) {
            return response()->json(['message' => 'No tienes permiso para editar contactos'], 403);
        }

        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contacto no encontrado'], 404);
        }

        $data = $request->validate([
            'name'  => 'sometimes|string',
            'email' => 'sometimes|email|unique:contacts,email,' . $contact->id,
            'phone' => 'sometimes|string',
        ]);

        $contact->update($data);

        return response()->json($contact);
    }

    // DELETE /api/contacts/{id} (eliminar)
    public function destroy(Request $request,$id)
    {
        if (! $request->user()->can('delete contacts')) {
            return response()->json(['message' => 'No tienes permiso para eliminar contactos'], 403);
        }
        
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contacto no encontrado'], 404);
        }

        $contact->delete();

        return response()->json(['message' => 'Contacto eliminado'], 200);
    }
}
