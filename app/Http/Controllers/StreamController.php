<?php

namespace App\Http\Controllers;

use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StreamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stream= Stream::latest()->get();
        return Inertia::render('Streams/Index',[
            'stream'=>$stream
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Streams/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $validated = $request -> validate([
            'nombre'=>'required|string|max:100'
        ]);
        Stream::create($validated);
        return redirect()->route('streams.index')->with('success','Stream guardado');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Stream $stream)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stream $stream)
    {
        return Inertia::render('Streams/Edit',[
            'stream'=>$stream
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stream $stream)
    {
        $validated = $request -> validate([
            'nombre'=>'required|string|max:100'
        ]);
        $stream ->update($validated);
        return redirect()->route('streams.index')->with('success','Stream actualizado');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stream $stream)
    {
        $stream -> delete();
        
        return redirect()->route('streams.index')->with('success','Stream eliminado');
    }
}
