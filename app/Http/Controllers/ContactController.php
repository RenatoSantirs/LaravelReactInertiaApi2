<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function __construct()
    {
        // ✅ Solo usuarios autenticados y verificados pueden entrar
        $this->middleware(['auth', 'verified']);
    }

    // 📄 Listar contactos
    public function index(Request $request)
    {
        $query = Contact::query();

        // 👑 Si NO es admin, solo ve sus propios contactos
        if (!Auth::user()->hasRole('admin')) {
            $query->where('user_id', Auth::id());
        }

        // 🔎 Buscador (opcional)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $contacts = $query->latest()->paginate(10);

        return Inertia::render('Contacts/Index', [
            'contacts' => $contacts,
            'filters'  => $request->only('search'),
        ]);
    }

    // 📝 Mostrar formulario para crear contacto
    public function create()
    {
        // // ✅ Usa Policy → ContactPolicy@create
        // $this->authorize('create', Contact::class);

        return Inertia::render('Contacts/Create');
    }

    // 💾 Guardar nuevo contacto
    public function store(Request $request)
    {
        // ✅ Protegido por Policy
        // $this->authorize('create', Contact::class);

        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:contacts',
            'phone' => 'nullable|string|max:20',
        ]);

        // ✅ Guarda contacto asignando automáticamente el user_id del usuario logueado
        Auth::user()->contacts()->create($data);

        return redirect()->route('contacts.index')
            ->with('success', 'Contacto creado correctamente');
    }

    // ✏️ Mostrar formulario de edición
    public function edit(Contact $contact)
    {
        // ✅ Protegido por Policy (solo admin o dueño)
        $this->authorize('update', $contact);

        return Inertia::render('Contacts/Edit', [
            'contact' => $contact,
        ]);
    }

    // 🔄 Actualizar contacto
    public function update(Request $request, Contact $contact)
    {
        // ✅ Protegido por Policy
        $this->authorize('update', $contact);

        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:contacts,email,' . $contact->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $contact->update($data);

        return redirect()->route('contacts.index')
            ->with('success', 'Contacto actualizado correctamente');
    }

    // ❌ Eliminar contacto
    public function destroy(Contact $contact)
    {
        // ✅ Protegido por Policy
        $this->authorize('delete', $contact);

        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contacto eliminado correctamente');
    }
}
