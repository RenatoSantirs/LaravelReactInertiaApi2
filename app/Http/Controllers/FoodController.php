<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $food=Food::latest()->get();
        return Inertia::render('Foods/Index',[
            'food'=>$food
        ]);
    }
    
    public function create()
    {
        return Inertia::render('Foods/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'=>'required|string|max:200',
            'cantidad'=>'required|integer|min:0'
        ]);
        Food::create($validated);
        return redirect()->route('foods.index')->with('success','Guardado');
    }

    public function edit(Food $food):Response{
        return Inertia::render('Foods/Edit',[
            'food'=>$food
        ]);
    }

    public function update(Food $food){
        $validated = request()->validate([
            'nombre'=>'required|string|max:200',
            'cantidad'=>'required|integer|min:0'
        ]);
        $food ->update($validated);
        return redirect()->route('foods.index')->with('s1ccess','Actualizar');
    }
    public function destroy(Food $food){
        $food->delete();

        return redirect()->route('foods.index')->with('success','eliminar');
    }
}
