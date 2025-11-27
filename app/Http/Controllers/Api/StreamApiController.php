<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stream;
use Illuminate\Http\Request;

class StreamApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Stream::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'=>'required|string|max:100'
        ]);
        $stream = Stream::create($data);
        return response()->json($stream,201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $stream = Stream::find($id);
        if (!$stream) {
            return response()->json(['message'=>'No se encuentra']);
        }
        return response()->json($stream);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $stream = Stream::find($id);
        if (!$stream) {
            return response()->json(['message'=>'No se encuentra']);
        }
        $data = $request->validate([
            'nombre'=>'required|string|max:100'
        ]);
        $stream->update($data);
        return response()->json($stream);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $stream = Stream::find($id);
        if (!$stream) {
            return response()->json(['message'=>'No se encontro']);
        }
        $stream->delete();
         return response()->json(['message'=>'Eliminado']);
    }
}
