<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodApiController extends Controller
{
    // ✅ (Opcional) Solo si quieres protegerlo con Sanctum
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    // GET /api/foods → listar todos
    public function index()
    {
        return response()->json(Food::all());
    }

    // GET /api/foods/{id} → ver uno
    public function show($id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json(['message' => 'Alimento no encontrado'], 404);
        }

        return response()->json($food);
    }

    // POST /api/foods → crear nuevo
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'cantidad' => 'required|numeric|min:0',
        ]);

        $food = Food::create($data);

        return response()->json($food, 201);
    }

    // PUT/PATCH /api/foods/{id} → actualizar
    public function update(Request $request, $id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json(['message' => 'Alimento no encontrado'], 404);
        }

        $data = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'cantidad' => 'sometimes|numeric|min:0',
        ]);

        $food->update($data);

        return response()->json($food);
    }

    // DELETE /api/foods/{id} → eliminar
    public function destroy($id)
    {
        $food = Food::find($id);

        if (!$food) {
            return response()->json(['message' => 'Alimento no encontrado'], 404);
        }

        $food->delete();

        return response()->json(['message' => 'Alimento eliminado correctamente']);
    }
}