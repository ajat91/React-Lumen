<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$data=Menu::all();
        $data=DB::table('menus')
        ->join('kategoris','kategoris.id_kategori','=','menus.id_kategori')
        ->select('menus.*','kategoris.*')
        ->orderBy('menus.menu','asc')
        ->get();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request )
    {
        $this->validate($request,[
            'id_kategori'=>'required ',
            'menu'=>'required ',
            'harga'=>'required ',
            'gambar'=>'required'
        ]);
        
        $gambar=$request->file('gambar')->getClientOriginalName();
        $request->file('gambar')->move('upload',$gambar);
        $data=[
            'id_kategori'=>$request->input('id_kategori'),
            'menu'=>$request->input('menu'),
            'harga'=>$request->input('harga'),
            'gambar'=>url('upload/'.$gambar)
        ];
       $menu= Menu::create($data);

       if($menu){
            return response()->json([
                    'pesan'=>'Data Berhasil Ditambahkan'
                ]);
        }
       // if ($menu) {
       //     $result=[
       //          'status'=>200,
       //          'pesan'=>'Data Berhasil Ditambahkan',
       //          'data'=>$data
       //     ];
       // } else {
       //  $result=[
       //      'status'=>400,
       //      'pesan'=>'Data Gagal Ditambahkan',
       //      'data'=>'400'
       // ];
       // }
       
        //return response()->json($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        // $data=Menu::where('id_menu',$id)->get();
        $data=DB::table('menus')
        ->join('kategoris','kategoris.id_kategori','=','menus.id_kategori')
        ->select('menus.*','kategoris.*')
        ->where('id_menu','=',$id)
        ->get();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request,[
            'id_kategori'=>'required ',
            'menu'=>'required ',
            'harga'=>'required '
        ]);

        if ($request->hasFile('gambar')) {
            $gambar=$request->file('gambar')->getClientOriginalName();
            $request->file('gambar')->move('upload',$gambar);
            $data=[
            'id_kategori'=>$request->input('id_kategori'),
            'menu'=>$request->input('menu'),
            'harga'=>$request->input('harga'),
            'gambar'=>url('upload/'.$gambar)
            ];
        } else {
            $data=[
            'id_kategori'=>$request->input('id_kategori'),
            'menu'=>$request->input('menu'),
            'harga'=>$request->input('harga')
            ];
        }
        
        
        $menu=Menu::where('id_menu',$id)->update($data);
        if($menu){
            return response()->json([
                    'pesan'=>'Data Berhasil Diubah'
                ]);
        }
        //return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $menu=Menu::where('id_menu',$id)->delete();
        if($menu){
            return response()->json([
                'pesan'=>'Data Berhasil Dihapus',
                'data'=>$menu
                ]);
        }
    }
}
